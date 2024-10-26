import { useState, useMemo, useEffect } from "react";

import ScheduleModal from "./components/ScheduleModal";
import CircleItem from "./components/CircleItem";

function App() {
  const [gameSelected, setGameSelected] = useState(42);

  const [showSchedule, setShowSchedule] = useState(false);

  const [combinations, setCombinations] = useState(null);

  const [lottoGames, setLottoGames] = useState([
    { id: 1, name: "Lotto", value: 42, schedule: [2, 4, 6] },
    { id: 2, name: "Mega Lotto", value: 45, schedule: [1, 3, 5] },
    { id: 3, name: "Super Lotto", value: 49, schedule: [0, 2, 4] },
    { id: 4, name: "Grand Lotto", value: 55, schedule: [1, 3, 6] },
    { id: 5, name: "Ultra Lotto", value: 58, schedule: [0, 2, 5] },
  ]);

  const [days, setDays] = useState([
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ]);

  const gamesToday = useMemo(() => {
    const today = new Date().getDay();

    return lottoGames
      .filter((game) => game.schedule.includes(today))
      .map((game) => ({ name: game.name, value: game.value }));
  }, [lottoGames]);

  const gamesSchedule = useMemo(() => {
    return days.map((day, index) => ({
      day: day.toUpperCase(),
      games: lottoGames
        .filter((game) => game.schedule.includes(index))
        .map((game) => ({ name: game.name, value: game.value })), // Extract only the `name` and `value`
    }));
  }, [lottoGames, days]);

  const handleModalClose = () => {
    setShowSchedule(false);
  };

  const generateCombinations = (set = 42, rows = 6) => {
    const newCombinations = [];

    for (let i = 0; i < rows; i++) {
      const numbers = [];

      while (numbers.length < 6) {
        const randomNumber = Math.floor(Math.random() * set) + 1;

        // Ensure uniqueness
        if (!numbers.includes(randomNumber)) {
          numbers.push(randomNumber);
        }
      }
      numbers.sort((a, b) => a - b);
      newCombinations.push(numbers);
    }

    // Update state with the new multidimensional array
    setCombinations(newCombinations);
  };

  const duplicatesArray = useMemo(() => {
    if (!combinations || combinations.length === 0) return Array(6).fill(null); // Return [null, null, null, null, null, null] if combinations are empty

    const columnCounts = Array(6)
      .fill(null)
      .map(() => ({})); // Array to count occurrences in each column

    // Count occurrences for each column
    for (let row of combinations) {
      for (let col = 0; col < row.length; col++) {
        const num = row[col];
        columnCounts[col][num] = (columnCounts[col][num] || 0) + 1;
      }
    }

    // Determine the most duplicated number in each column
    return columnCounts.map((column) => {
      let mostFrequentNum = null;
      let maxCount = 1;

      for (const [num, count] of Object.entries(column)) {
        if (count > maxCount) {
          maxCount = count;
          mostFrequentNum = Number(num);
        }
      }

      return mostFrequentNum;
    });
  }, [combinations]);

  const handleGenerateClick = () => {
    generateCombinations(gameSelected);
  };

  const useOrientation = () => {
    const [isLandscape, setIsLandscape] = useState(
      window.matchMedia("(orientation: landscape)").matches
    );

    useEffect(() => {
      const mediaQuery = window.matchMedia("(orientation: landscape)");

      const handleOrientationChange = (e) => {
        setIsLandscape(e.matches);
      };

      mediaQuery.addEventListener("change", handleOrientationChange);

      return () => {
        mediaQuery.removeEventListener("change", handleOrientationChange);
      };
    }, []);

    return isLandscape;
  };

  const isLandscape = useOrientation();
  const isMobile = window.innerWidth < 1024;

  const handleGameSelectChange = (e) => {
    console.log(e.target.value);
    setGameSelected(e.target.value);
  };

  return (
    <>
      <div className="w-full h-dvh flex justify-center items-center overflow-hidden bg-gray-200">
        <div className="h-full w-auto bg-white aspect-[9/16] mx-auto overflow-auto relative">
          <div className="w-full h-14 bg-sky-700 text-white text-xl flex items-center justify-center font-bold">
            Lotto Simulator (PCSO)
          </div>

          <div className="w-full">
            <div className="w-full h-20 border-b border-gray-300 flex items-center gap-x-2">
              <div className="text-xs font-bold h-full bg-sky-200 px-3 flex items-center">
                Games Today
              </div>

              <div className="flex gap-2">
                {gamesToday.map((game) => (
                  <div
                    key={game.value}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className="text-xs font-bold w-9 h-9 shadow-md rounded-full flex items-center justify-center border border-gray-500">
                      6/{game.value}
                    </div>
                    <span className="text-gray-500 text-[0.7rem]">
                      {game.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-3 border-b border-gray-300 shadow-lg bg-white py-3">
              <p className="text-xs text-gray-700 font-bold mb-1">
                Select Game
              </p>
              <select
                id="selectGame"
                className="border border-gray-400 w-full p-1 rounded text-gray-600 mb-1 outline-none focus:ring-2 focus:ring-sky-600"
                onChange={handleGameSelectChange}
              >
                {lottoGames.map((game) => (
                  <option
                    key={game.value}
                    value={game.value}
                    className="hover:bg-green-500"
                  >
                    6/{game.value} - {game.name}{" "}
                  </option>
                ))}
              </select>
              {/* <button
                className="w-full bg-sky-700 py-1 text-white rounded border active:border-green-500"
                onClick={handleGenerateClick}
              >
                Generate Combinations
              </button> */}
            </div>
          </div>

          {combinations ? (
            <>
              <div className="w-full mx-auto mt-6 px-3">
                {combinations.map((combo, index) => (
                  <div key={index} className="flex justify-around gap-x-1 mb-2">
                    {combo.map((number, numIndex) => (
                      <CircleItem
                        key={numIndex}
                        number={number}
                        blinker={true}
                        animate={number === duplicatesArray[numIndex]}
                        className="w-[12%] h-auto aspect-square rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xl xl:text-2xl shadow-lg"
                      />
                    ))}
                  </div>
                ))}

                <hr className="border border-gray-300" />

                <div className="flex justify-around gap-x-1 py-2">
                  {duplicatesArray.map((number, numIndex) => (
                    <CircleItem
                      key={numIndex}
                      number={number}
                      className="w-[12%] h-auto aspect-square rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-xl xl:text-2xl shadow-lg"
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="w-full px-3 h-56 flex items-center border border-gray-300 mt-2 bg-white">
              <p className="w-full text-sky-500 text-center p-3 my-2 font-bold">
                No combinations generated yet.
              </p>
            </div>
          )}

          <button
            className="absolute bottom-3 end-20 bg-sky-600 w-14 h-14 rounded-full text-white hover:bg-sky-700 font-medium flex items-center justify-center shadow-lg"
            onClick={() => setShowSchedule(true)}
          >
            <span className="material-symbols-outlined text-3xl">
              calendar_month
            </span>
          </button>

          <button
            className="absolute bottom-3 end-3 bg-sky-600 w-14 h-14 rounded-full text-white hover:bg-sky-700 font-medium flex items-center justify-center shadow-lg"
            onClick={handleGenerateClick}
          >
            <span className="material-symbols-outlined text-3xl">
              play_arrow
            </span>
          </button>

          <ScheduleModal
            gamesSchedule={gamesSchedule}
            show={showSchedule}
            onClose={handleModalClose}
          />

          {isLandscape && isMobile && (
            <div className="z-50 fixed start-0 top-0 w-full h-full bg-sky-700 text-white text-xl flex items-center justify-center font-bold">
              PLEASE ROTATE YOUR DEVICE
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
