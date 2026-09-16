import {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import { createPortal } from "react-dom";

export interface ImageViewerHandle {
    open: (index: number, el: HTMLElement) => void;
}

interface ImageViewerProps {
    images: string[];
    altPrefix?: string;
}

interface OriginRect {
    top: number;
    left: number;
    width: number;
    height: number;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.5;

const ImageViewer = forwardRef<ImageViewerHandle, ImageViewerProps>(
    ({ images, altPrefix = "image" }, ref) => {
        const [activeIndex, setActiveIndex] = useState<number | null>(null);
        const [origin, setOrigin] = useState<OriginRect | null>(null);
        const [phase, setPhase] = useState<"opening" | "open" | "closing">("opening");
        const [zoom, setZoom] = useState(1);
        const [pan, setPan] = useState({ x: 0, y: 0 });

        const dragState = useRef({ dragging: false, startX: 0, startY: 0, panX: 0, panY: 0 });

        const open = useCallback((index: number, el: HTMLElement) => {
            const rect = el.getBoundingClientRect();
            setOrigin({ top: rect.top, left: rect.left, width: rect.width, height: rect.height });
            setActiveIndex(index);
            setZoom(1);
            setPan({ x: 0, y: 0 });
            setPhase("opening");
            requestAnimationFrame(() => requestAnimationFrame(() => setPhase("open")));
        }, []);

        useImperativeHandle(ref, () => ({ open }), [open]);

        const close = useCallback(() => {
            setPhase("closing");
            window.setTimeout(() => {
                setActiveIndex(null);
                setOrigin(null);
                setZoom(1);
                setPan({ x: 0, y: 0 });
            }, 260);
        }, []);

        const goTo = useCallback(
            (dir: 1 | -1) => {
                if (activeIndex === null) return;
                setActiveIndex((activeIndex + dir + images.length) % images.length);
                setZoom(1);
                setPan({ x: 0, y: 0 });
            },
            [activeIndex, images.length]
        );

        const zoomIn = useCallback(
            () => setZoom((z) => Math.min(MAX_ZOOM, +(z + ZOOM_STEP).toFixed(2))),
            []
        );
        const zoomOut = useCallback(
            () =>
                setZoom((z) => {
                    const nz = Math.max(MIN_ZOOM, +(z - ZOOM_STEP).toFixed(2));
                    if (nz === MIN_ZOOM) setPan({ x: 0, y: 0 });
                    return nz;
                }),
            []
        );

        const onWheel = useCallback((e: React.WheelEvent) => {
            e.preventDefault();
            const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
            setZoom((z) => {
                const nz = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, +(z + delta).toFixed(2)));
                if (nz === MIN_ZOOM) setPan({ x: 0, y: 0 });
                return nz;
            });
        }, []);

        const onDoubleClick = useCallback(() => {
            setZoom((z) => (z > 1 ? 1 : 2.5));
            setPan({ x: 0, y: 0 });
        }, []);

        const onPointerDown = useCallback(
            (e: React.PointerEvent) => {
                if (zoom <= 1) return;
                dragState.current = { dragging: true, startX: e.clientX, startY: e.clientY, panX: pan.x, panY: pan.y };
                (e.target as HTMLElement).setPointerCapture(e.pointerId);
            },
            [zoom, pan]
        );

        const onPointerMove = useCallback((e: React.PointerEvent) => {
            if (!dragState.current.dragging) return;
            const dx = e.clientX - dragState.current.startX;
            const dy = e.clientY - dragState.current.startY;
            setPan({ x: dragState.current.panX + dx, y: dragState.current.panY + dy });
        }, []);

        const onPointerUp = useCallback(() => {
            dragState.current.dragging = false;
        }, []);

        useEffect(() => {
            if (activeIndex === null) return;
            const onKey = (e: KeyboardEvent) => {
                if (e.key === "Escape") close();
                else if (e.key === "ArrowRight" && images.length > 1) goTo(1);
                else if (e.key === "ArrowLeft" && images.length > 1) goTo(-1);
                else if (e.key === "+" || e.key === "=") zoomIn();
                else if (e.key === "-") zoomOut();
            };
            window.addEventListener("keydown", onKey);
            document.body.style.overflow = "hidden";
            return () => {
                window.removeEventListener("keydown", onKey);
                document.body.style.overflow = "";
            };
        }, [activeIndex, close, goTo, zoomIn, zoomOut, images.length]);

        if (activeIndex === null || !origin) return null;

        const activeSrc = images[activeIndex];

        const modalStyle: React.CSSProperties =
            phase === "open"
                ? {
                      top: "50%",
                      left: "50%",
                      width: "min(94vw, 1100px)",
                      height: "min(88vh, 800px)",
                      transform: "translate(-50%, -50%)",
                  }
                : {
                      top: origin.top,
                      left: origin.left,
                      width: origin.width,
                      height: origin.height,
                      transform: "translate(0, 0)",
                  };

        return createPortal(
            <div
                className={`fixed inset-0 z-[1000] bg-black/0 transition-colors duration-300 ${
                    phase === "open" ? "bg-black/90" : ""
                }`}
                onClick={close}
                role="dialog"
                aria-modal="true"
            >
                <div
                    className="fixed overflow-hidden rounded-xl bg-neutral-950 shadow-2xl transition-[top,left,width,height,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={modalStyle}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div
                        className="flex h-full w-full items-center justify-center overflow-hidden touch-none"
                        onWheel={onWheel}
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        onPointerUp={onPointerUp}
                        onPointerLeave={onPointerUp}
                        onDoubleClick={onDoubleClick}
                    >
                        <img
                            src={activeSrc}
                            alt={`${altPrefix} ${activeIndex + 1}`}
                            draggable={false}
                            className="max-h-full max-w-full select-none object-contain transition-transform duration-75"
                            style={{
                                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                                cursor: zoom > 1 ? "grab" : "zoom-in",
                            }}
                        />
                    </div>

                    <div className="absolute right-2 top-2 flex items-center gap-1.5 rounded-full bg-black/60 px-2 py-1.5 backdrop-blur-sm sm:right-3 sm:top-3">
                        <button
                            onClick={zoomOut}
                            aria-label="Zoom out"
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:h-8 sm:w-8"
                        >
                            −
                        </button>
                        <span className="w-9 text-center text-[11px] text-white sm:text-xs">
                            {Math.round(zoom * 100)}%
                        </span>
                        <button
                            onClick={zoomIn}
                            aria-label="Zoom in"
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:h-8 sm:w-8"
                        >
                            +
                        </button>
                        <button
                            onClick={close}
                            aria-label="Close"
                            className="ml-1 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:h-8 sm:w-8"
                        >
                            ✕
                        </button>
                    </div>

                    {images.length > 1 && (
                        <>
                            <button
                                onClick={() => goTo(-1)}
                                aria-label="Previous image"
                                className="absolute left-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-lg text-white hover:bg-black/75 sm:left-3 sm:h-10 sm:w-10 sm:text-2xl"
                            >
                                ‹
                            </button>
                            <button
                                onClick={() => goTo(1)}
                                aria-label="Next image"
                                className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-lg text-white hover:bg-black/75 sm:right-3 sm:h-10 sm:w-10 sm:text-2xl"
                            >
                                ›
                            </button>
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-[11px] text-white sm:bottom-3 sm:text-xs">
                                {activeIndex + 1} / {images.length}
                            </div>
                        </>
                    )}
                </div>
            </div>,
            document.body
        );
    }
);

ImageViewer.displayName = "ImageViewer";

export default ImageViewer;