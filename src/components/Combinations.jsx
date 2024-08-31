import React, { useMemo } from 'react';
import Circle from './Circle'; // Import the Circle component

function Combinations ({ combinations }) {
  // Function to generate CSS class names
  const generateClass = (row, col) => {
    return `circle circle_${row}_${col}`;
  };

  // useMemo for finCombination equivalent
  const finCombination = useMemo(() => {
    let mostIdenticalNumbers = [];

    if ( combinations.length > 0 ) {
        for (let col = 0; col < combinations[0].length; col++) {
        let numberCount = {};
        let maxCount = 0;
        let maxNumber = '';

        for (let row = 0; row < combinations.length; row++) {
            let number = combinations[row][col];
            numberCount[number] = (numberCount[number] || 0) + 1;

            if (numberCount[number] > maxCount) {
            maxCount = numberCount[number];
            maxNumber = number;
            }
        }

        // Only consider maxNumber if it appears more than once
        mostIdenticalNumbers[col] = maxCount > 1 ? maxNumber : 0;
        }
    }

    return mostIdenticalNumbers;
  }, [combinations]);

  // Function to get identical occurrences
  const getIdenticalOccurrences = (matrix) => {
    const numRows = matrix.length;
    const numCols = matrix[0].length;
    const result = [];

    for (let col = 0; col < numCols; col++) {
      const frequency = {};

      for (let row = 0; row < numRows; row++) {
        const element = matrix[row][col];
        if (!frequency[element]) {
          frequency[element] = { count: 0, indexes: [] };
        }
        frequency[element].count += 1;
        frequency[element].indexes.push([row, col]);
      }

      let maxFrequency = 0;
      let mostFrequentElement = null;

      for (const element in frequency) {
        if (frequency[element].count > maxFrequency) {
          maxFrequency = frequency[element].count;
          mostFrequentElement = element;
        }
      }

      if (maxFrequency > 1) {
        for (let i in frequency[mostFrequentElement].indexes) {
          result.push(frequency[mostFrequentElement].indexes[i]);
        }
      }
    }

    return result;
  };

  // useMemo for blink equivalent
  const blink = useMemo(() => {
    let fin = Array(6)
      .fill(null)
      .map(() => Array(6).fill(false));

    if (combinations.length > 0) {
      let posts = getIdenticalOccurrences(combinations);

      for (let i in posts) {
        let [row, col] = posts[i];
        fin[row][col] = true;
      }
    }

    return fin;
  }, [combinations]);

  return (
    <div>
      {combinations.length > 0 ? (
        <>
          <div className="mt-5 md:mt-12">
            {combinations.map((combination, i) => (
              <div
                key={i}
                className="flex items-center justify-center gap-5 md:gap-6 mb-3 md:mb-6 select-none w-full"
              >
                {combination.map((el, j) => (
                  <Circle key={j} val={el} blink={blink[i][j]} />
                ))}
              </div>
            ))}
          </div>
          <hr />
          <div className="flex items-center justify-center gap-5 md:gap-6 mb-3 md:mb-6 select-none w-full">
            {finCombination.map((fin, k) => (
              <Circle key={k} val={fin} />
            ))}
          </div>
        </>
      ) : (
        <div className="w-[90%] text-center mx-auto border border-gray-300 my-5 px-3 py-4 bg-gray-200 rounded-md shadow-lg">
          <p className="text-sm md:text-base font-medium">
            Select desired game and hit
            <span className="px-2 mx-1 py-0.5 bg-blue-500 text-white rounded">
              Generate
            </span>
            to start.
          </p>
        </div>
      )}
    </div>
  );
}

export default Combinations;
