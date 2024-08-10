import React, { useState, useEffect } from 'react';
import BotCard from './components/BotCard';
import BotSpecs from './components/BotSpecs';
import SortBar from './components/SortBar';
import Filter from './components/Filter';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [bots, setBots] = useState([]);
  const [yourArmy, setYourArmy] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);
  const [sortKey, setSortKey] = useState('');
  const [filters, setFilters] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:8001/bots')
      .then((response) => response.json())
      .then((data) => setBots(data));
  }, []);

  const handleSort = (key) => {
    setSortKey(key);
  };

  const handleFilter = (botClass) => {
    setFilters((prevFilters) =>
      prevFilters.includes(botClass)
        ? prevFilters.filter((item) => item !== botClass)
        : [...prevFilters, botClass]
    );
  };

  const handleEnlist = (bot) => {
    if (yourArmy.some((b) => b.bot_class === bot.bot_class)) {
      toast.error(`You already have a bot from ${bot.bot_class} class.`);
      return;
    }
    setYourArmy([...yourArmy, bot]);
    setBots(bots.filter((b) => b.id !== bot.id));
    setSelectedBot(null);
    toast.success(`${bot.name} enlisted into your army.`);
  };

  const handleDischarge = (bot) => {
    setYourArmy(yourArmy.filter((b) => b.id !== bot.id));
    setBots([...bots, bot]);
    toast.success(`${bot.name} discharged from your army.`);
  };

  const handleDelete = (bot) => {
    fetch(`http://localhost:8001/bots/${bot.id}`, {
      method: 'DELETE',
    }).then(() => {
      setYourArmy(yourArmy.filter((b) => b.id !== bot.id));
      toast.success(`${bot.name} discharged and deleted.`);
    });
  };

  const filteredBots = bots.filter((bot) =>
    filters.length === 0 || filters.includes(bot.bot_class)
  );

  const sortedBots = [...filteredBots].sort((a, b) => {
    if (sortKey) {
      return b[sortKey] - a[sortKey];
    }
    return 0;
  });

  return (
    <div className="app">
      <ToastContainer />
      {selectedBot ? (
        <BotSpecs
          bot={selectedBot}
          onBack={() => setSelectedBot(null)}
          onEnlist={handleEnlist}
        />
      ) : (
        <>
          <SortBar onSort={handleSort} />
          <Filter
            classes={['Support', 'Medic', 'Assault', 'Defender', 'Captain', 'Witch']}
            selectedClasses={filters}
            onFilter={handleFilter}
          />
          <div className="bot-collection">
            {sortedBots.map((bot) => (
              <BotCard
                key={bot.id}
                bot={bot}
                handleClick={() => setSelectedBot(bot)}
                dischargeBot={() => handleDischarge(bot)}
                isArmy={false}
              />
            ))}
          </div>
          <div className="your-bot-army">
            {yourArmy.map((bot) => (
              <BotCard
                key={bot.id}
                bot={bot}
                dischargeBot={() => handleDelete(bot)}
                isArmy={true}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
