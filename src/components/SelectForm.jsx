import React, { useState } from 'react';

function SelectForm({ options, isButtonDisabled, onGenerate }) {
  // Initialize the selected state
  const [selected, setSelected] = useState(42);

  // Handle the generate button click
  const handleGenerateClick = () => {
    onGenerate(selected);
  };

  return (
    <div className="flex items-center justify-center gap-2 text-sm sm:text-base mt-5 w-[90%] mx-auto">
      <div className="grow">
        <select
          value={selected}
          onChange={(e) => setSelected(parseInt(e.target.value))}
          className="py-2 px-1 w-full border border-gray-400 rounded-md"
        >
          {options.map((data, index) => (
            <option key={index} value={data.value}>
              6/{data.value} {data.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button
          className="bg-blue-500 py-2 px-4 rounded-lg text-white hover:bg-blue-400 cursor-pointer active:scale-95"
          onClick={handleGenerateClick}
          disabled={isButtonDisabled}
        >
          Generate
        </button>
      </div>
    </div>
  );
}

export default SelectForm;
