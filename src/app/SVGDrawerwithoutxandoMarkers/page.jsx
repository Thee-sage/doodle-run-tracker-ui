"use client";
import React, { useRef, useState } from 'react';

const DrawAndSave = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [pathData, setPathData] = useState([]);
  
  const color = '#271897'; 

  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = color; 
    ctx.lineWidth = 2; 
    ctx.lineJoin = 'round'; 
    ctx.lineCap = 'round'; 
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

  const saveAsSVG = () => {
    const canvas = canvasRef.current;
    const svgPaths = pathData.map((path, index) => `<path d="${path}" fill="none" stroke="${color}" stroke-width="2"/>`).join('');
    const svgHeader = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${canvas.width}" height="${canvas.height}" xmlns="http://www.w3.org/2000/svg">
  ${svgPaths}
</svg>`;

    const blob = new Blob([svgHeader], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'drawing.svg';
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetCanvas = () => {
    clearCanvas();
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Draw and Save SVG</h1>
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        style={{ border: `1px solid ${color}` }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
      />
      <div style={{ marginTop: '10px' }}>
        <button onClick={clearCanvas}>Clear</button>
        <button onClick={saveAsSVG}>Save as SVG</button>
        <button onClick={resetCanvas}>Reset</button>
      </div>
    </div>
  );
};

export default DrawAndSave;
