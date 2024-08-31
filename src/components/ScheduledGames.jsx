import React from 'react';

function ScheduledGames ({ schedule, onShowFullSchedule }) {

  const btnClick = () => {
    onShowFullSchedule();
  };

  return (
    <div className="w-[90%] mx-auto mt-3">
      <div className="w-full rounded-md overflow-hidden shadow-md border border-gray-300">
        <div className="font-bold text-sm md:text-base bg-blue-500 text-white px-3 py-1 flex justify-between items-center">
          <div className="text-base md:text-lg">Games Today</div>
          <button
            className="font-medium hover:text-blue-100 py-1 rounded-md text-white text-xs md:text-sm cursor-pointer active:scale-95"
            onClick={btnClick}
          >
            See Full Schedule
          </button>
        </div>
        <div className="flex gap-3 md:gap-5 py-3 bg-gray-200 grow justify-center">
          {schedule.map((sched) => (
            <div key={sched.value} className="flex flex-col items-center">
              <div className="text-sm md:text-base flex justify-center items-center font-bold w-12 h-12 md:w-14 md:h-14 rounded-full border border-gray-500 bg-white shadow-lg">
                6/{sched.value}
              </div>
              <div className="text-xs md:text-sm text-gray-600 mt-1">{sched.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ScheduledGames;
