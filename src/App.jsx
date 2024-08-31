import React, { useState, useMemo, useEffect } from 'react';

import Header from './components/Header'
import ScheduledGames from './components/ScheduledGames'
import ScheduleModal from './components/ScheduleModal'
import SelectForm from './components/SelectForm'
import Combinations from './components/Combinations'





function App() {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedGame, setSelectedGame] = useState(42);
  const [combinations, setCombinations] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const [lottoGames, setLottoGames] = useState([
    { name: 'Lotto', value: '42', schedule: [2, 4, 6] },
    { name: 'Mega Lotto', value: '45', schedule: [1, 3, 5] },
    { name: 'Super Lotto', value: '49', schedule: [0, 2, 4] },
    { name: 'Grand Lotto', value: '55', schedule: [1, 3, 6] },
    { name: 'Ultra Lotto', value: '58', schedule: [0, 2, 5] },
  ]);

 

  const generateCombination = (max) => {
    let arr = Array.from({ length: max }, (_, index) => index + 1);

    const shuffled = arr.sort(() => 0.5 - Math.random());

    const selected = shuffled.slice(0, 6);

    return selected.sort((a, b) => a - b);
  };

  const generateNumberOfCombinations = (n, max) => {
    let arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(generateCombination(max));
    }
    return arr;
  };

  const handleShowFullSchedule = () => {
    setIsModalVisible(true);
  };

  const handleHideFullSchedule = () => {
    setIsModalVisible(false);
  };

  const isButtonDisabled = false;

  const scheduledGamesToday = lottoGames.filter((game) => game.schedule.includes(new Date().getDay()));

  const handleGenerate = (game) => {
    console.log('Generated value:', game);

    setIsGenerating(true);
    setSelectedGame(game);
    setCombinations(generateNumberOfCombinations(6, game));

    // You can perform additional actions here with the selected value
  };

  return (
    <div className="w-full h-screen bg-gray-200 flex justify-center items-center relative">
       <div className="w-full max-w-[550px] h-full bg-white relative">
      <Header />
      <ScheduledGames schedule={scheduledGamesToday} onShowFullSchedule={handleShowFullSchedule} />

      <ScheduleModal 
        games={lottoGames} 
        show={isModalVisible} 
        onClose={handleHideFullSchedule} 
      />

      <SelectForm 
        options={lottoGames} 
        isButtonDisabled={isButtonDisabled}
        onGenerate={handleGenerate}
      />

      <Combinations combinations={combinations}/>
      </div>
    </div>

  );
    
}

export default App
