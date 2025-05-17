import React from 'react';

export function ClearIcon({ color = 'white', size = 50 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.9343 13C6.76642 26.2258 8.45779 32.6774 19.3723 43M31.9781 15.9032C29.3041 32.3548 31.9781 33 40 39.4516" stroke={color} stroke-width="2"/>
            <line y1="-1" x2="17.8634" y2="-1" transform="matrix(0.983677 0.179942 -0.250135 0.968211 14.7883 14.0708)" stroke={color} stroke-width="2"/>
            <line y1="-1" x2="20.1221" y2="-1" transform="matrix(0.987159 -0.159743 0.222794 0.974866 19.3723 43)" stroke={color} stroke-width="2"/>
            <line y1="-1" x2="6.88934" y2="-1" transform="matrix(0.665368 0.746516 -0.845671 0.533705 20.9001 36.5713)" stroke={color} stroke-width="2"/>
            <line y1="-1" x2="17.8634" y2="-1" transform="matrix(0.983677 0.179942 -0.250135 0.968211 13.2603 18.5708)" stroke={color} stroke-width="2"/>
            <rect x="0.723241" y="1.1525" width="3.66405" height="9.6869" transform="matrix(0.982422 0.186672 -0.259181 0.965829 23.7284 3.30135)" stroke={color} stroke-width="2"/>
        </svg>
    );
}
