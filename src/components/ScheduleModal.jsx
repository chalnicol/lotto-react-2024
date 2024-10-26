import gsap from "gsap";
import { useEffect, useRef } from "react";

const ScheduleModal = ({ gamesSchedule, onClose, show = false }) => {
  const today = new Date().getDay();
  const containerRef = useRef(null);

  const animateOpen = () => {
    gsap.fromTo(
      containerRef.current,
      { yPercent: -200 },
      { yPercent: 0, duration: 0.7, ease: "elastic.out(1,0.8)" }
    );
  };
  const animateClose = () => {
    gsap.fromTo(
      containerRef.current,
      { yPercent: 0 },
      {
        yPercent: -200,
        duration: 0.7,
        ease: "elastic.in(1,0.8)",
        onComplete: () => onClose(),
      }
    );
  };

  useEffect(() => {
    if (show) {
      animateOpen();
    }
  }, [show]);

  return (
    <>
      {show && (
        <div className="absolute h-full w-full start-0 top-0 z-10 flex items-center justify-center text-white overflow-hidden">
          <div className="absolute h-full w-full bg-gray-900 opacity-80"></div>
          <div
            ref={containerRef}
            className="absolute w-[95%] h-auto rounded-lg"
          >
            <div className="bg-sky-800 rounded-t-lg px-3 py-2 font-bold">
              Games Schedule
            </div>
            <div className="w-full rounded-b-lg h-full bg-gray-100 grid grid-cols-7 gap-x-0.5 select-none overflow-hidden">
              {gamesSchedule.map((sched, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center text-sm text-black pb-3 ${
                    today === index ? "bg-sky-200" : "bg-gray-200"
                  }`}
                >
                  <div className="mb-3 py-3 bg-sky-600 w-full text-sm text-center text-white font-semibold">
                    {sched.day}
                  </div>

                  {sched.games.map((game, i) => (
                    <div
                      key={sched.day + "_" + i}
                      className="w-full min-h-[80px] px-1 mb-2"
                    >
                      <div className="w-full h-auto aspect-square border border-gray-500 rounded-full bg-white flex items-center justify-center shadow-lg font-semibold mb-1">
                        6/{game.value}
                      </div>
                      <div className="text-[0.7rem] leading-snug text-gray-700 text-center w-full">
                        {game.name}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div
              className="absolute w-7 h-7 text-center text-2xl rounded-full bg-white font-bold text-black -end-2 -top-3 cursor-pointer select-none hover:bg-sky-200 leading-[25px]"
              onClick={animateClose}
            >
              &times;
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ScheduleModal;
