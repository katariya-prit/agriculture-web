import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { IconType } from "react-icons";

export interface NavChildItem {
  label: string;
  path: string;
  icon?: IconType;
}

interface Props {
  icon: IconType;
  label: string;
  isOpen: boolean;
  isActive?: boolean;
  onClick?: () => void;
  children?: NavChildItem[];
  onChildClick?: (path: string) => void;
  activePath?: string;
}

export default function NavButton({
  icon: Icon,
  label,
  isOpen,
  isActive,
  onClick,
  children,
  onChildClick,
  activePath,
}: Props) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const hasChildren = !!children?.length;

  // Sidebar collapse thay etle expanded state reset kari do, nahi to next time
  // expand-vagar j sidebar khule tyare children achanak dekhai jay.
  useEffect(() => {
    if (!isOpen) setExpanded(false);
  }, [isOpen]);

  const handleRowClick = () => {
    // Children hoy to row khali expand/collapse toggle kare — navigate nathi karto.
    // Children na hoy to normal navigate.
    if (hasChildren) {
      setExpanded((e) => !e);
      return;
    }
    onClick?.();
  };

  return (
    <div
      className="relative w-full rounded-2xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        onClick={handleRowClick}
        whileTap={{ scale: 0.97 }}
        className={`w-full h-13 rounded-2xl flex items-center gap-3 px-3 cursor-pointer transition-colors
          ${isActive ? "text-white bg-green-500 navshadow" : "bg-green-600 text-white hover:bg-green-600"}
        `}
      >
        <Icon size={35} className={`shrink-0 ${isActive ? "bg-white text-green-800 rounded-lg inset onlytext p-1.5" : "p-1.5"}`} />

        {isOpen && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="whitespace-nowrap text-sm font-medium flex-1"
          >
            {label}
          </motion.span>
        )}

        {isOpen && hasChildren && (
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            className={`text-xs ${isActive ? "text-white/70" : "text-green-700/60"}`}
          >
            ▾
          </motion.span>
        )}
      </motion.div>

      {/* ---- Expanded sidebar: children NAVBAR NI ANDAR j push-down thai ne khule (absolute nathi) ---- */}
      {isOpen && hasChildren && (
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative z-10 overflow-hidden"
            >
              <div className="mt-1 ml-5 flex flex-col gap-1 border-l-2 border-green-600/30 py-1 pl-3">
                {children!.map((child) => {
                  const ChildIcon = child.icon;
                  const childActive = activePath === child.path;
                  return (
                    <div
                      key={child.path}
                      onClick={() => onChildClick?.(child.path)}
                      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm cursor-pointer transition-colors
                        ${childActive ? "bg-green-600 text-white font-medium" : "text-green-900/70 hover:bg-green-100"}
                      `}
                    >
                      {ChildIcon && <ChildIcon size={16} className="shrink-0" />}
                      <span className="truncate">{child.label}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* ---- Collapsed sidebar: hover par floating flyout — juno j, badalyu nathi ---- */}
      <AnimatePresence>
        {!isOpen && hovered && (
          <motion.div
            initial={{ opacity: 0, x: -8, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-full top-0 ml-2 z-50 min-w-[180px] rounded-xl border border-green-900/15 bg-white shadow-lg shadow-green-900/10 py-1.5 px-1.5"
          >
            {!hasChildren ? (
              <div className="px-3 py-2 text-sm font-medium text-green-900 whitespace-nowrap">
                {label}
              </div>
            ) : (
              <div className="flex flex-col">
                <div className="px-3 pt-1.5 pb-1 text-[11px] font-semibold uppercase tracking-wide text-green-700/70 whitespace-nowrap">
                  {label}
                </div>
                {children!.map((child) => {
                  const ChildIcon = child.icon;
                  const childActive = activePath === child.path;
                  return (
                    <div
                      key={child.path}
                      onClick={() => onChildClick?.(child.path)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer whitespace-nowrap transition-colors
                        ${childActive ? "bg-green-700 text-white" : "text-green-900 hover:bg-green-50"}
                      `}
                    >
                      {ChildIcon && <ChildIcon size={16} className="shrink-0" />}
                      {child.label}
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}