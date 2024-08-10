import React from 'react';
import BotCard from './BotCard';

const YourBotArmy = ({ army, releaseBot, dischargeBot }) => {
  return (
    <div className="your-bot-army">
      {army.map(bot => (
        <BotCard 
          key={bot.id} 
          bot={bot} 
          handleClick={() => releaseBot(bot)} 
          dischargeBot={() => dischargeBot(bot)}
          isArmy
        />
      ))}
    </div>
  );
};

export default YourBotArmy;
