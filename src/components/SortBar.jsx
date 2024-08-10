import React from 'react';

const SortBar = ({ onSort }) => {
  return (
    <div className="sort-bar">
      <button onClick={() => onSort('health')}>Sort by Health</button>
      <button onClick={() => onSort('damage')}>Sort by Damage</button>
      <button onClick={() => onSort('armor')}>Sort by Armor</button>
    </div>
  );
};

export default SortBar;
