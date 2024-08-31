import React, { useState, useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';

function ScheduleModal ({ games, show, onClose }) {

  const [isVisible, setIsVisible] = useState(show);

  const modalContentRef = useRef(null);
  
  const currentDate = new Date().getDay();

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


  const scheduledGames = useMemo(() => {

    const schedArr = Array.from({ length: 7 }, () => []);

    games.forEach(game => {
      game.schedule.forEach(day => {
        schedArr[day].push({
          name: game.name,
          value: game.value,
        });
      });
    });

    return schedArr;
    
  }, [games]);

  useEffect(() => {
    setIsVisible(show);
    if (show) {
      animateOpen();
    }
  }, [show]);

  const animateOpen = () => {
    if (modalContentRef.current) {
      gsap.fromTo(modalContentRef.current, { scale: 0 }, { scale: 1, duration: 0.8, opacity: 1, ease: 'elastic.out(1, 0.9)' });
    }
  };

  const animateClose = () => {
    if (modalContentRef.current) {
      gsap.fromTo(modalContentRef.current, { scale: 1 }, { scale: 0, duration: 0.8, opacity: 0, ease: 'elastic.in(1, 0.9)', onComplete: onClose });
    }
  };

  const closeModal = () => {
    animateClose();
  };

  const modalClass = isVisible ? 'fixed w-full h-full max-w-[550px] flex items-center justify-center top-0 visible' : 'invisible';


  return (
   
    <div className={modalClass}>
      <div className="absolute w-full h-full bg-black opacity-[0.8]" onClick={closeModal}></div>

      <div ref={modalContentRef} className="absolute w-[90%] mx-auto border px-3 pt-2 pb-3 shadow-md rounded-md select-none bg-white">
        <h1 className="font-bold mt-1 mb-4 text-xl md:text-2xl">Lotto Games Schedule</h1>

        {days.map((day, index) => (
          <div key={index} className="flex mb-2">
            <div className="w-1/3 font-bold bg-gray-200 mr-2 p-2 rounded-sm text-sm md:text-lg">{day}</div>

            <div className={`flex gap-2 md:gap-3 lg:gap-5 p-1 md:p-2 grow ${index === currentDate ? 'bg-blue-300' : ''}`}>
              {scheduledGames[index].map((sched, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="font-bold border border-gray-500 w-12 h-12 md:w-16 md:h-16 text-base md:text-xl bg-white shadow-md rounded-full mr-1 flex justify-center items-center">
                    6/{sched.value}
                  </div>
                  <div className="text-xs md:text-base md:mt-1 text-gray-500">{sched.name}</div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="border border-gray-500 shadow-md rounded-full w-6 h-6 md:w-8 md:h-8 bg-white absolute top-3 right-3 md:top-4 md:right-4 flex justify-center items-center font-bold hover:bg-gray-200 cursor-pointer select-none text-base md:text-xl" onClick={closeModal}>
          &#10006;
        </div>
      </div>
    </div>
    
  );
}

export default ScheduleModal;
