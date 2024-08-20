"use client";
import React from 'react';

const SvgLoader = ({ name, width = 32, height = 32 }) => {
  const svgSrc = `/images/${name}.svg`; 
  const placeholderSrc = '/images/placeholder.svg';

  return (
    <img
      src={svgSrc}
      alt={name}
      width={width}
      height={height}
      onError={(e) => e.target.src = placeholderSrc}
    />
  );
};

export default SvgLoader;
