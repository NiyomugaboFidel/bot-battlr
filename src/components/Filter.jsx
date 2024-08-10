import React from 'react';

const Filter = ({ classes, selectedClasses, onFilter }) => {
  return (
    <div className="filter">
      {classes.map((botClass) => (
        <label key={botClass}>
          <input
            type="checkbox"
            checked={selectedClasses.includes(botClass)}
            onChange={() => onFilter(botClass)}
          />
          {botClass}
        </label>
      ))}
    </div>
  );
};

export default Filter;
