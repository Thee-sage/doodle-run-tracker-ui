"use client";
import React from 'react';
import SvgLoader from './SvgLoader';

const DoodleDate = () => {
  const currentDate = new Date();
  const dayNumber = currentDate.getDate().toString().padStart(2, '0');
  const monthNumber = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
  const year = currentDate.getFullYear().toString();

  const renderDatePart = (part) => {
    return [...part].map((char, index) => (
      <div key={index} style={{ margin: '0 1px' }}>
        <SvgLoader name={char} />
      </div>
    ));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {renderDatePart(dayNumber)}
      <span style={{ margin: '0 1px' }}><img src="./dot1.svg" width="8" height="8"/></span>
      {renderDatePart(monthNumber)}
      <span style={{margin: '0 1px' }}><img src="./dot2.svg" width="8" height="8"/></span>
      {renderDatePart(year)}
    </div>
  );
};

export default DoodleDate;
