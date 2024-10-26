import gsap from "gsap";
import { useEffect, useRef } from "react";
import img from "../assets/test.png";

const CircleItem = ({ number, blinker, animate = false, className = "" }) => {
  const circleRef = useRef(null);

  const formatNumber = (num) => {
    if (!num) {
      return "-";
    } else {
      return num < 10 ? "0" + num : num;
    }
  };

  useEffect(() => {
    if (animate) {
      gsap.to(circleRef.current, {
        backgroundColor: "#84CC16",
        duration: 0.7,
        transformOrigin: "50% 50%",
        repeat: -1,
        yoyo: true,
        ease: "power4.out",
      });
    }
    return () => {
      gsap.killTweensOf(circleRef.current);
      if (blinker) {
        gsap.set(circleRef.current, { backgroundColor: "#0369A1" });
      }
    };
  }, [animate, number]);

  return (
    <div ref={circleRef} className={`relative ` + className}>
      {/* <img
        src={img}
        alt="Lotto Number"
        className="absolute h-full w-full object-contain z-0"
      />

      <div className="z-10">{formatNumber(number)}</div> */}
      {formatNumber(number)}
    </div>
  );
};

export default CircleItem;
