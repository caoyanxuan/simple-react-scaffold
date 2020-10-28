import React from 'react';
import './index.scss';

export default () => {


  return (
    <div>
      <svg id="svg-path" width="1200px" height="240px" version="1.1">
        <defs>
          <linearGradient id="greenGradient">
            <stop offset="0" stopColor="rgba(255, 255,255, 0)" />
            <stop offset="100%" stopColor="rgba(255, 255,255, 0.2)" />
          </linearGradient>
        </defs>
        <path fill="transparent" stroke="url(#greenGradient)" strokeWidth="6" d="M152,224 C296,110.5 426,77 542,124 C715.5,194 925.5,0.5 1109,39" className="path"></path>
      </svg>

      <svg id="svg-ball" width="42px" height="42px" viewBox="0 0 42 42" version="1.1" >
        <defs>
          <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-1">
            <stop stopColor="#FFFFFF" stopOpacity="0" offset="0%"></stop>
            <stop stopColor="#FFFFFF" offset="100%"></stop>
          </linearGradient>
        </defs>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-1194.000000, -5395.000000)">
            <g transform="translate(0.000000, 5376.000000)">
              <g transform="translate(1194.000000, 19.000000)">
                <circle fill="url(#linearGradient-1)" opacity="0.889764695" cx="21" cy="21" r="7"></circle>
                <circle fill="url(#linearGradient-1)" opacity="0.110142299" cx="21" cy="21" r="21"></circle>
                <path d="M21,36 C29.2842712,36 36,29.2842712 36,21 C36,12.7157288 29.2842712,6 21,6 C12.7157288,6 6,12.7157288 6,21 C6,29.2842712 12.7157288,36 21,36 Z" stroke="#FFFFFF" opacity="0.638253348" strokeDasharray="1,4"></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div >
  );
}