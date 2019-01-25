import React from 'react';

export const highlightMatch = (text, matchText) => {
  const startIndex = text.toLowerCase().indexOf(matchText.toLowerCase());
  if (startIndex === -1) return <p>{text}</p>
  
  const endIndex = startIndex + matchText.length;

  const startStr = text.slice(0, startIndex);
  const matchStr = text.slice(startIndex, endIndex);
  const endStr = text.slice(endIndex);

  return (
    <p>
      {startStr}
      <span className='green-text'>{matchStr}</span>
      {endStr}
    </p>
  )
};