// Section/sall-management/core/ActionMenu.tsx
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { MoreVertical } from "lucide-react";

export type ActionMenuItem = {
  label: string;
  onClick: () => void;
  danger?: boolean;
};

type Props = {
  items: ActionMenuItem[];
};

export default function ActionMenu({ items }: Props) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Button ni screen position calculate karo, dropdown ne tya j pin karva mate
  useLayoutEffect(() => {
    if (open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const menuWidth = 144; // w-36
      let left = rect.right - menuWidth;
      if (left < 8) left = 8;

      setCoords({
        top: rect.bottom + 4,
        left,
      });
    }
  }, [open]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        btnRef.current &&
        !btnRef.current.contains(e.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    function handleScrollOrResize() {
      setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-emerald-900/50 transition-colors hover:bg-emerald-900/5 hover:text-emerald-900"
      >
        <MoreVertical className="h-4 w-4" />
      </button>

      {open &&
        createPortal(
          <div
            ref={menuRef}
            style={{ position: "fixed", top: coords.top, left: coords.left }}
            className="z-999 w-36 overflow-hidden rounded-lg border border-emerald-900/10 bg-white py-1 shadow-lg"
          >
            {items.map((item, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                  item.onClick();
                }}
                className={`block w-full px-3 py-2 text-left text-sm transition-colors ${
                  item.danger
                    ? "text-red-600 hover:bg-red-50"
                    : "text-emerald-900/80 hover:bg-emerald-900/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}