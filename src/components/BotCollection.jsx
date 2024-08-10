import React, { useEffect, useState } from 'react';
import BotCard from './BotCard';
import axios from 'axios';

const BotCollection = ({ enlistBot }) => {
  const [bots, setBots] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8001/bots')
      .then(response => setBots(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="bot-collection">
      {bots.map(bot => (
        <BotCard key={bot.id} bot={bot} handleClick={() => enlistBot(bot)} />
      ))}
    </div>
  );
};

export default BotCollection;
