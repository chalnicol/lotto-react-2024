import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function Circle({ val = 0, blink = false }) {
  const el = useRef(null);

  const lessTen = (n) => {
    if (n > 0) {
      return n >= 10 ? n : '0' + n;
    }
    return '-';
  };

  useEffect(() => {
    gsap.killTweensOf(el.current);
    gsap.set(el.current, { backgroundColor: '#fff' });

    if (blink) {
      gsap.fromTo(
        el.current,
        { backgroundColor: '#fff' },
        {
          backgroundColor: '#00ff00',
          ease: 'linear',
          yoyo: true,
          repeat: -1,
          duration: 0.4,
        }
      );
    }
  }, [blink]);

  return (
    <div
      ref={el}
      className="w-[10%] md:w-[11%] h-auto aspect-square bg-white flex justify-center items-center rounded-full border border-gray-500 text-base md:text-2xl font-bold shadow-xl"
    >
      {lessTen(val)}
    </div>
  );
}

export default Circle;
