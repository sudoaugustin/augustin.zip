'use client';

import { useState } from 'react';

type BatteryState = 'idle' | 'charging' | 'save';

export default function Battery() {
  const [state, setState] = useState<BatteryState>('idle');

  const toggleState = () => {
    setState((prev) => {
      if (prev === 'idle') return 'charging';
      if (prev === 'charging') return 'save';
      return 'idle';
    });
  };

  const getButtonText = () => {
    switch (state) {
      case 'idle':
        return 'Idle';
      case 'charging':
        return 'Charging';
      case 'save':
        return 'Power Saving';
      default:
        return 'Idle';
    }
  };

  const getGradientColors = () => {
    switch (state) {
      case 'idle':
        return {
          stop1: '#f3f4f6',
          stop2: '#ffffff',
        };
      case 'charging':
        return {
          stop1: '#22c55e',
          stop2: '#86efac',
        };
      case 'save':
        return {
          stop1: '#fbbf24',
          stop2: '#fef08a',
        };
      default:
        return {
          stop1: '#f3f4f6',
          stop2: '#ffffff',
        };
    }
  };

  const { stop1, stop2 } = getGradientColors();

  return (
    <div className="flex flex-col items-center gap-4">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>
          {`
            .battery-fill {
              transition: width 0.8s ease-in-out;
            }
          `}
        </style>
        <path
          d="M3.75 6.75C2.95435 6.75 2.19129 7.06607 1.62868 7.62868C1.06607 8.19129 0.75 8.95435 0.75 9.75V15.75C0.75 16.5456 1.06607 17.3087 1.62868 17.8713C2.19129 18.4339 2.95435 18.75 3.75 18.75H18.75C19.5456 18.75 20.3087 18.4339 20.8713 17.8713C21.4339 17.3087 21.75 16.5456 21.75 15.75V15.713C22.606 15.539 23.25 14.783 23.25 13.875V11.625C23.25 10.718 22.606 9.961 21.75 9.788V9.75C21.75 8.95435 21.4339 8.19129 20.8713 7.62868C20.3087 7.06607 19.5456 6.75 18.75 6.75H3.75ZM18.75 8.25C19.1478 8.25 19.5294 8.40804 19.8107 8.68934C20.092 8.97064 20.25 9.35218 20.25 9.75V15.75C20.25 16.1478 20.092 16.5294 19.8107 16.8107C19.5294 17.092 19.1478 17.25 18.75 17.25H3.75C3.35218 17.25 2.97064 17.092 2.68934 16.8107C2.40804 16.5294 2.25 16.1478 2.25 15.75V9.75C2.25 9.35218 2.40804 8.97064 2.68934 8.68934C2.97064 8.40804 3.35218 8.25 3.75 8.25H18.75Z"
          fillRule="evenodd"
          clipRule="evenodd"
          className="fill-theme-800"
        />
        <rect
          x="3.75"
          y="10"
          width={state === 'idle' ? '0' : '8'}
          height="6"
          rx="1"
          fill="url(#batteryGradient)"
          className="battery-fill"
        />
        <defs>
          <linearGradient id="batteryGradient" x1="11.75" y1="12.75" x2="3.75" y2="12.75" gradientUnits="userSpaceOnUse">
            <stop offset="1" stopColor={stop1} />
            <stop offset="0.1" stopColor={stop2} />
          </linearGradient>
        </defs>
      </svg>
      <button
        type="button"
        onClick={toggleState}
        className="rounded-lg bg-gray-800 px-4 py-2 text-white transition-colors hover:bg-gray-700"
      >
        {getButtonText()}
      </button>
    </div>
  );
}
