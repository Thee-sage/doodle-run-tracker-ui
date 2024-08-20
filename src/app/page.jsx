"use client";
import React, { useState, useEffect } from 'react';
import SvgLoader from './SvgLoader.jsx';
import DoodleDate from './DoodleDate.jsx';
import { motion, useAnimation } from 'framer-motion';

const X_MARKER = `<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">
<path d="M 151 174 L 149 171 L 151 171 L 152 173 L 155 175 L 156 176 L 157 177 L 160 179 L 165 185 L 171 188 L 171 189 L 173 192 L 177 195 L 181 200 L 184 201 L 187 203 L 189 205 L 191 208 L 196 215 L 197 219 L 200 221 L 204 223 L 211 227 L 211 228 L 216 232 L 219 237 L 221 240 L 223 241 L 224 243 L 225 243 L 227 244 L 228 245 L 231 249 L 233 252 L 239 257 L 241 260 L 243 263 L 244 264 L 245 267 L 247 269 L 247 271 L 249 273 L 251 276 L 252 277 L 253 280 L 257 285 L 260 288 L 263 291 L 264 295 L 267 299 L 271 303 L 272 305 L 273 305 L 276 308 L 277 311 L 280 315 L 283 317 L 284 319 L 285 319 L 285 320 L 287 321 L 289 324 L 291 327 L 292 328 L 293 328 L 295 331 L 295 332 L 296 335 L 299 336 L 300 337 L 301 339 L 301 340 L 303 340 L 304 343 L 305 344 L 308 348 L 309 351 L 311 351 L 312 351 L 313 352 L 316 355" fill="none" stroke="#271897" stroke-width="2"/><path d="M 317 165 L 313 165 L 311 167 L 309 167 L 308 169 L 307 171 L 305 173 L 303 176 L 301 177 L 300 180 L 300 184 L 299 185 L 296 187 L 295 188 L 293 191 L 292 193 L 291 195 L 289 197 L 287 199 L 285 201 L 283 205 L 281 207 L 280 208 L 279 209 L 277 211 L 276 212 L 275 213 L 275 216 L 273 216 L 273 219 L 271 220 L 269 221 L 268 224 L 267 225 L 264 228 L 263 228 L 263 229 L 261 232 L 259 233 L 257 235 L 256 237 L 255 239 L 253 240 L 252 241 L 251 241 L 251 243 L 248 245 L 247 247 L 245 248 L 244 248 L 243 251 L 241 252 L 240 253 L 237 256 L 236 257 L 235 259 L 233 260 L 233 261 L 232 261 L 231 263 L 229 264 L 228 265 L 227 265 L 225 268 L 225 269 L 225 271 L 224 272 L 221 273 L 220 275 L 220 276 L 219 276 L 217 279 L 215 280 L 213 281 L 212 283 L 212 284 L 209 287 L 208 287 L 207 287 L 205 289 L 204 292 L 203 293 L 201 297 L 200 297 L 199 299 L 197 300 L 195 301 L 195 303 L 193 304 L 192 305 L 191 305 L 191 307 L 189 308 L 185 313 L 184 315 L 183 315 L 181 316 L 179 319 L 177 320 L 176 323 L 173 324 L 172 325 L 172 327 L 169 328 L 168 328 L 167 328 L 165 329 L 164 332 L 163 333 L 161 335 L 161 336 L 160 337 L 159 337 L 157 339 L 155 341 L 153 343 L 151 345" fill="none" stroke="#271897" stroke-width="2"/>
</svg>`;
const O_MARKER = `<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">
<path d="M 229 145 L 228 144 L 227 144 L 224 144 L 221 144 L 219 144 L 216 144 L 215 144 L 213 144 L 212 144 L 209 144 L 205 147 L 203 148 L 200 149 L 197 151 L 195 152 L 193 153 L 192 153 L 191 153 L 189 155 L 187 156 L 184 157 L 181 159 L 177 161 L 173 167 L 171 172 L 169 176 L 168 180 L 167 183 L 167 184 L 165 191 L 165 196 L 165 201 L 165 205 L 165 208 L 165 211 L 165 215 L 165 219 L 165 221 L 165 223 L 165 227 L 165 229 L 165 232 L 165 235 L 165 239 L 165 241 L 167 247 L 168 249 L 171 252 L 175 255 L 176 256 L 181 259 L 183 260 L 185 263 L 187 264 L 189 267 L 191 267 L 192 268 L 195 269 L 197 271 L 200 272 L 204 273 L 207 275 L 208 275 L 212 275 L 215 275 L 216 275 L 219 275 L 221 275 L 224 275 L 225 275 L 228 275 L 229 273 L 232 271 L 233 269 L 236 268 L 240 264 L 243 263 L 244 260 L 245 257 L 247 256 L 248 256 L 249 255 L 251 253 L 252 251 L 253 249 L 255 248 L 256 247 L 259 243 L 261 239 L 263 237 L 263 236 L 264 233 L 265 229 L 267 227 L 267 224 L 267 223 L 267 221 L 267 219 L 267 213 L 267 211 L 267 208 L 267 205 L 267 204 L 267 200 L 267 197 L 265 193 L 265 189 L 264 183 L 263 180 L 263 177 L 263 175 L 261 172 L 261 171 L 260 168 L 260 167 L 260 164 L 260 163 L 259 160 L 259 159 L 259 157 L 257 155 L 255 152 L 253 151 L 251 149 L 248 148 L 247 144 L 243 143 L 240 143 L 236 140 L 235 140 L 233 139 L 233 137 L 232 137 L 231 137 L 229 137 L 227 137 L 225 137 L 224 137 L 223 137 L 220 137 L 217 137 L 216 139 L 213 140 L 212 143 L 209 144 L 207 147 L 203 152 L 200 155 L 199 156 L 197 157 L 193 161 L 192 161" fill="none" stroke="#271897" stroke-width="2"/>
</svg>`;
const SVG_FILES = {
  path1: { file: '/path/path1.svg', kmRan: 5, minutesTaken: '30', degree: '45°' },
  path2: { file: '/path/path2.svg', kmRan: 10, minutesTaken: '30', degree: '45°' },
  path3: { file: '/path/path3.svg', kmRan: 15, minutesTaken: '30', degree: '45°' },
  path4: { file: '/path/path4.svg', kmRan: 15, minutesTaken: '30', degree: '45°' },
  path5: { file: '/path/path5.svg', kmRan: 15, minutesTaken: '30', degree: '45°' },
  path6: { file: '/path/path6.svg', kmRan: 15, minutesTaken: '30', degree: '45°' },
  path7: { file: '/path/path7.svg', kmRan: 15, minutesTaken: '30', degree: '45°' },
  path8: { file: '/path/path8.svg', kmRan: 15, minutesTaken: '30', degree: '45°' },
  path9: { file: '/path/path9.svg', kmRan: 15, minutesTaken: '30', degree: '45°' },
};

const DrawWithXandO = () => {
  const [view, setView] = useState('opening');
  const [selectedPath, setSelectedPath] = useState(null);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });
  const [kmRan, setKmRan] = useState(0);
  const [minutesTaken, setMinutesTaken] = useState('');
  const [degree, setDegree] = useState('');
  const [viewMode, setViewMode] = useState('path');
  const [animateMarkers, setAnimateMarkers] = useState(false);

  const xControls = useAnimation();
  const smileyControls = useAnimation();
  const oControls = useAnimation();
  useEffect(() => {
    if (view === 'opening') {
      // Reset markers to their initial positions
      xControls.start({ x: 0, y: 0, transition: { duration: 0 } });
      oControls.start({ x: 0, y: 0, transition: { duration: 0 } });
      setAnimateMarkers(false); 
    } else if (view === 'details') {
      setAnimateMarkers(false);
    }
  }, [view]);

  useEffect(() => {
    if (selectedPath) {
      const fetchPathData = async () => {
        const response = await fetch(selectedPath);
        const svgText = await response.text();

        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
        const pathElement = svgDoc.querySelector('path');
        if (pathElement) {
          const pathData = pathElement.getAttribute('d');
          const { start, end } = getStartAndEndPoints(pathData);
          if (start && end) {
            setStartPoint(start);
            setEndPoint(end);
            // Trigger animation when the path is selected
            xControls.start({ x: start.x - 200, y: start.y - 20 });
            oControls.start({ x: end.x - 200, y: end.y - 20 });
          }
        }

        const pathInfo = Object.values(SVG_FILES).find(info => info.file === selectedPath);
        if (pathInfo) {
          setKmRan(pathInfo.kmRan);
          setMinutesTaken(pathInfo.minutesTaken);
          setDegree(pathInfo.degree);
        }
      };

      fetchPathData();
    }
  }, [selectedPath]);

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

  const handlePathChange = (path) => {
    setSelectedPath(path);
    setViewMode('path');
    setView('details');
  };

  const handleToggleView = () => {
    setViewMode(viewMode === 'path' ? 'allPaths' : 'path');
  };

  const handleMarkerClick = (markerType) => {
    // Set rotation for the smiley SVG
    smileyControls.start({ rotate: -90, transition: { duration: 0.2 } });
  
       // Define the target positions for both markers
       const xTarget = { x: 10, y: 260 };
       const oTarget = { x: 10, y: 240 };
  
    // Start animations for both markers
    xControls.start({ x: xTarget.x, y: xTarget.y, transition: { duration: 2 } });
    oControls.start({ x: oTarget.x, y: oTarget.y, transition: { duration: 3 } });
  
    // Set the selected path based on the clicked marker
    if (markerType === 'X') {
    
      setSelectedPath(SVG_FILES.path1.file);
    } else if (markerType === 'O') {
     
      setSelectedPath(SVG_FILES.path2.file);
    }
  
    // Move to details view after animation
    setTimeout(() => {
      setView('details');
    }, 2000);
  
    // Trigger marker animations
    setTimeout(() => {
      setAnimateMarkers(true);
    }, 2500);
  };
  
  
  
  

  const DoodleMinutesTaken = ({ minutesTaken }) => {
    const minutesString = minutesTaken.toString();
    const renderNumberPart = (part) => [...part].map((char, index) => (
      <div key={index} style={{ margin: '0 1px' }}>
        <SvgLoader name={char} />
      </div>
    ));
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {renderNumberPart(minutesString)}
        <span style={{ margin: '0 -28px' }}><img src="./min.svg"  style={{ width:"200px",height:"64px"}}alt="min"/></span>
      </div>
    );
  };

  const DoodleDegree = ({ degree }) => {
    const degreeString = degree.toString();
    const renderNumberPart = (part) => [...part].map((char, index) => (
      <div key={index} style={{ margin: '0 1px' }}>
        <SvgLoader name={char} />
      </div>
    ));
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {renderNumberPart(degreeString)}
        <span style={{ margin: '0 -40px',color:"#271897" }}>"</span>
      </div>
    );
  };

  const DoodleNumber = ({ number }) => {
    const numberString = number.toString();
    const renderNumberPart = (part) => [...part].map((char, index) => (
      <div key={index} style={{ margin: '0 1px' }}>
        <SvgLoader name={char} />
      </div>
    ));
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {renderNumberPart(numberString)}
      </div>
    );
  };

  
  

  const getContent = () => {
    switch (view) {
      case 'opening':
        return (
          <div style={{ textAlign: 'center', marginTop: '20px', background: 'white', width: '350px' }}>
            <div style={{ position: 'relative', width: '350px', height: '700px' }}>
              {/* Smiley SVG with rotation animation */}
              <motion.img
                src="./smilebox.svg" 
                alt="Smilebox"
                animate={smileyControls} 
                style={{
                  width: '100%',       
                  height: '100%',      
                  position: 'absolute',
                  top: "-50px",
                  left: '30px',
                  zIndex: 1,
                  objectFit: 'contain',
                }}
              />
        
              {/* X Marker */}
              <motion.div
                animate={xControls}
                transition={{ duration: 2 }}
                style={{
                  position: 'absolute',
                  left: '145px',
                  top: '240px',
                  width: '60px',
                  height: '80px',
                  cursor: 'pointer',
                  zIndex: 2, 
                }}
                onClick={() => handleMarkerClick('X')}
              >
                <img
                  src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(X_MARKER)}`}
                  alt="X Marker"
                />
              </motion.div>
        
              {/* O Marker */}
              <motion.div
                animate={oControls}
                transition={{ duration: 2 }}
                style={{
                  position: 'absolute',
                  left: '170px',
                  top: '240px',
                  width: '70px',
                  height: '90px',
                  cursor: 'pointer',
                  zIndex: 2, 
                }}
                onClick={() => handleMarkerClick('O')}
              >
                <img
                  src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(O_MARKER)}`}
                  alt="O Marker"
                />
              </motion.div>
            </div>
          </div>
        );
        
      case 'details':
        return (
          <div style={{ textAlign: 'center', marginTop: '20px', background: 'white', width: '350px', height: '700px' }}>
              <div style={{ display: 'flex', alignItems: 'center', zIndex: '2', position: 'absolute', left: '10px', top: '40px', width: '260px' }}>
        <div onClick={() => setView('opening')} style={{ cursor: 'pointer' ,position:"relative",left:"2px",top:"6px"}}>
    <img src="./twolines.svg" alt="Open Opening Tab" style={{ width: '72px', height: '72px' }} />
  </div>
  <div onClick={handleToggleView} style={{ cursor: 'pointer', position:"relative",left: '60px' }}>
          <DoodleDate />
        </div>
      </div>
            {viewMode === 'path' && selectedPath ? (
              <div style={{ textAlign: 'center', background: 'white' }}>
                {selectedPath && (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  left:"40px",top: '200px',position:"absolute", zIndex: '4' }}>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <div style={{ position:"relative",top:"-80px",left:"-90px"}}><img src={selectedPath} alt="Selected SVG" sty  /></div>
                      {animateMarkers && (
                        <>
                          <motion.div
                            animate={{ x: startPoint.x -118, y: startPoint.y- 610  }}
                            initial={{ x: startPoint.x - 50, y: startPoint.y - 50 }}
                            transition={{ duration: 2 }}
                            style={{
                              position: 'absolute',
                              width: '60px',
                              height: '60px',
                            }}
                          >
                            <img
                              src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(X_MARKER)}`}
                              alt="X Marker"
                            />
                          </motion.div>
                          <motion.div
                            animate={{ x: endPoint.x -115, y: endPoint.y - 610, }}
                            initial={{ x: endPoint.x - 50, y: endPoint.y - 50 }} // Adjust the initial position
                            transition={{ duration: 2 }}
                            style={{
                              position: 'absolute',
                              width: '60px',
                              height: '60px',
                            }}
                          >
                            <img
                              src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(O_MARKER)}`}
                              alt="O Marker"
                            />
                          </motion.div>
                        </>
                      )}
                    </div>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',top: '650px',position:"absolute" }}>
                  <DoodleNumber number={kmRan} />
                  <span style={{ margin: '0 -2px 0px 0px' }}><img src="./km.svg"  style={{ width:"64px",height:"64px"}}alt="Km Logo"/></span>
                  <DoodleMinutesTaken minutesTaken={minutesTaken} />
                  <span style={{ margin: '0 -38px' }}></span>
                  <DoodleDegree degree={degree} />
                </div>
              </div>
            ) : (
<div 
  style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    flexWrap: 'wrap', 
    position: "relative", 
    top: "100px",
    height: '580px',
    overflowY: "auto",
    msOverflowStyle: "none",
    scrollbarWidth: "none"
  }}
>
  {Object.values(SVG_FILES).map((file, index) => (
    <img
      key={index}
      src={file.file}
      alt={`SVG ${index + 1}`}
      onClick={() => handlePathChange(file.file)}
      style={{
        width: '150px',
        height: '150px',
        margin: '5px',
        cursor: 'pointer',
        border: selectedPath === file.file ? '2px solid black' : '2px solid transparent',
      }}
    />
  ))}
</div>

            )}
          </div>
        );
      default:
        return <div>Invalid view</div>;
    }
  };


  return (
    <div >
    <div>
      <div>
        {getContent()}
      </div>
    </div>
  </div>
  

); 
};


export default DrawWithXandO;