import React from 'react';

const BotSpecs = ({ bot, onBack, onEnlist }) => {
  const { name, avatar_url, bot_class, health, damage, armor, catchphrase } = bot;

  return (
    <div className="bot-specs">
      <button onClick={onBack}>Back to List</button>
      <div className="bot-card">
        <img src={avatar_url} alt={name} />
        <div className="bot-card-content">
          <h3>{name}</h3>
          <p>{catchphrase}</p>
          <p>Class: {bot_class}</p>
          <p>Health: {health} | Damage: {damage} | Armor: {armor}</p>
          <button onClick={() => onEnlist(bot)}>Enlist</button>
        </div>
      </div>
    </div>
  );
};

export default BotSpecs;
