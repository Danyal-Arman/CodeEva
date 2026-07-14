import { useRef, useState } from "react";

const MouseSpotlight = ({ className = "", children }) => {
  const ref = useRef(null);

  const [position, setPosition] = useState({
    x: -300,
    y: -300,
  });

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setPosition({
      x: -300,
      y: -300,
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: position.x > -100 ? 1 : 0,
          background: `radial-gradient(
            400px circle at ${position.x}px ${position.y}px,
            oklch(0.68 0.14 165 / 0.15),
            transparent 40%
          )`,
        }}
      />

      {children}
    </div>
  );
};

export default MouseSpotlight;