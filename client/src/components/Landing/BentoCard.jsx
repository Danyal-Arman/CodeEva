import MouseSpotlight from "./MouseSpotlight";

const BentoCard = ({
  className = "",
  children,
}) => {
  return (
    <MouseSpotlight
      className={`glass relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(16,185,129,0.12)] ${className}`}
    >
      {children}
    </MouseSpotlight>
  );
};

export default BentoCard;