import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const [cursorText, setCursorText] = useState("");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth, reactive spring physics
  const springConfig = { stiffness: 450, damping: 32, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect if device uses a fine pointer (mouse/trackpad) vs touch screen
    const mediaQuery = window.matchMedia("(pointer: fine) and (hover: hover)");
    
    const checkPointer = () => setIsPointerDevice(mediaQuery.matches);
    checkPointer();

    if (!mediaQuery.matches) return;

    mediaQuery.addEventListener("change", checkPointer);

    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const over = (e) => {
      const target = e.target.closest("[data-hover], a, button, [data-cursor-text]");
      if (target) {
        setHover(true);
        const text = target.getAttribute("data-cursor-text");
        setCursorText(text || "");
      } else {
        setHover(false);
        setCursorText("");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      mediaQuery.removeEventListener("change", checkPointer);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  // Disable custom cursor on mobile / touchscreens entirely
  if (!isPointerDevice) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center font-mono text-[9px] tracking-widest uppercase font-medium text-center p-2 leading-none will-change-transform"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        opacity: isVisible ? 1 : 0,
      }}
      animate={{
        width: cursorText ? 80 : hover ? 48 : 10,
        height: cursorText ? 80 : hover ? 48 : 10,
        backgroundColor: cursorText ? "#e10600" : "#ffffff",
        mixBlendMode: cursorText ? "normal" : "difference",
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 28,
        mass: 0.5,
      }}
    >
      {cursorText && (
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="text-white truncate px-1 select-none"
        >
          {cursorText}
        </motion.span>
      )}
    </motion.div>
  );
}