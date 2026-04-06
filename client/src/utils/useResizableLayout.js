import { useState, useEffect } from "react";

const MIN_WIDTH = 300;
const MAX_WIDTH = 500;

const useResizableLayout = () => {
  const [leftWidth, setLeftWidth] = useState(300);
  const [rightWidth, setRightWidth] = useState(300);

  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
  const [isRightCollapsed, setIsRightCollapsed] = useState(false);

  const [activeResize, setActiveResize] = useState(null);

  const [lastLeftWidth, setLastLeftWidth] = useState(300);
  const [lastRightWidth, setLastRightWidth] = useState(300);

  // 🧠 Restore layout on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("layout"));
    if (saved) {
      setLeftWidth(saved.leftWidth ?? 300);
      setRightWidth(saved.rightWidth ?? 300);
      setIsLeftCollapsed(saved.isLeftCollapsed ?? false);
      setIsRightCollapsed(saved.isRightCollapsed ?? false);
    }
  }, []);

  // 💾 Persist layout
  useEffect(() => {
    localStorage.setItem(
      "layout",
      JSON.stringify({
        leftWidth,
        rightWidth,
        isLeftCollapsed,
        isRightCollapsed,
      })
    );
  }, [leftWidth, rightWidth, isLeftCollapsed, isRightCollapsed]);

  // 🖱️ Resize Logic
  useEffect(() => {
    function handleMouseMove(e) {
      if (!activeResize) return;

      if (activeResize === "left") {
        let newWidth = e.clientX;
        newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, newWidth));
        setLeftWidth(newWidth);
      }

      if (activeResize === "right") {
        let newWidth = window.innerWidth - e.clientX;
        newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, newWidth));
        setRightWidth(newWidth);
      }
    }

    function handleMouseUp() {
      if (activeResize === "left") {
        setLastLeftWidth(leftWidth);
      }
      if (activeResize === "right") {
        setLastRightWidth(rightWidth);
      }

      setActiveResize(null);
      document.body.style.cursor = "default";
      document.body.style.userSelect = "auto";
    }

    if (activeResize) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [activeResize, leftWidth, rightWidth]);

  // 🔽 Toggle Logic
  const toggleLeft = () => {
    if (isLeftCollapsed) {
      setLeftWidth(lastLeftWidth);
    } else {
      setLastLeftWidth(leftWidth);
      setLeftWidth(0);
    }
    setIsLeftCollapsed(!isLeftCollapsed);
  };

  const toggleRight = () => {
    if (isRightCollapsed) {
      setRightWidth(lastRightWidth);
    } else {
      setLastRightWidth(rightWidth);
      setRightWidth(0);
    }
    setIsRightCollapsed(!isRightCollapsed);
  };

  // 🧩 Start Resize
  const startResize = (side) => {
    setActiveResize(side); // "left" or "right"
  };


  return {
    // state
    leftWidth,
    rightWidth,
    isLeftCollapsed,
    isRightCollapsed,

    // actions
    toggleLeft,
    toggleRight,
    startResize,
  };
}

export default useResizableLayout;