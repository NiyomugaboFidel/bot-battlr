import React from 'react';
import { toast } from 'react-toastify';

const BotCard = ({ bot, handleClick, dischargeBot, isArmy }) => {
  const { name, avatar_url, bot_class, health, damage, armor, catchphrase } = bot;

  return (
    <div className="bot-card" onClick={handleClick}>
      <img src={avatar_url} alt={name} />
      <div className="bot-card-content">
        <h3>{name}</h3>
        <p>{catchphrase}</p>
        <p>Class: {bot_class}</p>
        <p>Health: {health} | Damage: {damage} | Armor: {armor}</p>
        {isArmy && (
          <>
            <button onClick={(e) => {
              e.stopPropagation();
              dischargeBot();
              toast.success(`${name} discharged from your army.`);
            }}>
              Discharge
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BotCard;
