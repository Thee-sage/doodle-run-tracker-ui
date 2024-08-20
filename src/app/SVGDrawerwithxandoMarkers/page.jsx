"use client";
import React, { useRef, useState } from 'react';

const DrawAndSave = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [pathData, setPathData] = useState([]);

  const color = '#271897'; // Color to be used

  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = color; // Set the drawing color
    ctx.lineWidth = 2; // Set the line width
    ctx.lineJoin = 'round'; // Make line joins rounded
    ctx.lineCap = 'round'; // Make line ends rounded
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setPathData(prevPathData => [...prevPathData, `M ${e.nativeEvent.offsetX} ${e.nativeEvent.offsetY}`]);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
    setPathData(prevPathData => {
      const updatedPath = [...prevPathData];
      updatedPath[updatedPath.length - 1] = `${updatedPath[updatedPath.length - 1]} L ${e.nativeEvent.offsetX} ${e.nativeEvent.offsetY}`;
      return updatedPath;
    });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setPathData([]);
  };

  const getStartAndEndPoints = (pathData) => {
    const pathSegments = pathData.split('L');
    if (pathSegments.length < 2) return { start: null, end: null };

    const start = pathSegments[0].match(/M (\d+) (\d+)/);
    const end = pathSegments[pathSegments.length - 1].match(/(\d+) (\d+)/);

    return {
      start: start ? { x: parseFloat(start[1]), y: parseFloat(start[2]) } : null,
      end: end ? { x: parseFloat(end[1]), y: parseFloat(end[2]) } : null
    };
  };

  const saveAsSVG = () => {
    const canvas = canvasRef.current;
    const svgPaths = pathData.map((path, index) => `<path d="${path}" fill="none" stroke="${color}" stroke-width="2"/>`).join('');

    const { start, end } = getStartAndEndPoints(pathData.join(' '));
    const startX = start ? start.x : 0;
    const startY = start ? start.y : 0;
    const endX = end ? end.x : 0;
    const endY = end ? end.y : 0;

    const svgHeader = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${canvas.width}" height="${canvas.height}" xmlns="http://www.w3.org/2000/svg">
  ${svgPaths}
  <!-- Add markers or other elements here if needed -->
</svg>`;

    const blob = new Blob([svgHeader], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'drawing.svg';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        style={{ border: '1px solid black' }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
      />
      <button onClick={clearCanvas}>Clear Canvas</button>
      <button onClick={saveAsSVG}>Save as SVG</button>
    </div>
  );
};

export default DrawAndSave;
