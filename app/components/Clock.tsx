'use client';

import { AudioContext } from 'app/contexts/Audio';
import { useSettings } from 'app/contexts/Settings';
import { useContext, useEffect, useRef, useState } from 'react';

const useTime = () => {
  const [time, setTime] = useState(getTimePercent);

  useEffect(() => {
    const intervalId = setInterval(() => setTime(getTimePercent), 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return time;
};

const getTimePercent = () => {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const zonedDate = new Date(utc + 6.5 * 60 * 60 * 1000);

  return { h: (zonedDate.getHours() % 12 || 12) / 12, m: zonedDate.getMinutes() / 60, s: zonedDate.getSeconds() / 60 };
};

export default function Clock() {
  const { h, m, s } = useTime();
  const { settings } = useSettings();
  const { audioRef } = useContext(AudioContext);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const audio = audioRef?.current;
    if (audio && settings.clockSound) {
      const osc1 = audio.createOscillator();
      const osc2 = audio.createOscillator();
      const gainNode = audio.createGain();

      const isTock = new Date().getSeconds() % 2 === 0;
      const volume = 0.015;
      const duration = 0.05;
      const currentTime = audio.currentTime;

      const freq = isTock ? 1200 : 2400;

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(audio.destination);

      osc1.type = 'sine';
      osc1.frequency.value = freq;
      osc2.type = 'sine';
      osc2.frequency.value = freq * 2;

      gainNode.gain.setValueAtTime(0, currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, currentTime + 0.001);

      osc1.start(currentTime);
      osc2.start(currentTime);

      osc1.stop(currentTime + duration);
      osc2.stop(currentTime + duration);
    }
  }, [s]);

  return (
    <svg viewBox="0 0 100 100" fill="none" className="-rotate-180 w-16 lg:w-[5.5rem]">
      <path
        d="M48.4132 6.14126C49.1367 4.61958 51.3031 4.61958 52.0265 6.14126L55.3166 13.0612C56.902 16.3962 61.0951 17.5218 64.1369 15.4284L70.5529 11.0124C71.94 10.0577 73.8141 11.1394 73.6808 12.818L73.0675 20.5377C72.7754 24.2175 75.8438 27.2859 79.5236 26.9938L87.2433 26.3815C88.9217 26.2484 90.0036 28.1224 89.049 29.5094L84.671 35.8698C82.5607 38.9358 83.722 43.164 87.1027 44.7213L94.2765 48.025C95.8274 48.7395 95.8274 50.9443 94.2765 51.6588L87.1789 54.9274C83.7688 56.4982 82.6234 60.7801 84.7931 63.8444L89.4142 70.3717C90.4016 71.7662 89.2982 73.677 87.5968 73.5192L79.6925 72.7858C75.9528 72.439 72.8174 75.5743 73.1642 79.3141L73.8976 87.2194C74.0552 88.9207 72.1446 90.0231 70.7501 89.0358L64.1671 84.3747C61.1271 82.2223 56.8807 83.3318 55.2814 86.6959L52.0265 93.5426C51.3031 95.0643 49.1367 95.0642 48.4132 93.5426L45.1232 86.6208C43.5376 83.2856 39.3438 82.1608 36.3019 84.2545L29.8869 88.6696C28.4999 89.6243 26.6266 88.5424 26.7599 86.8639L27.3722 79.1452C27.6641 75.4656 24.5958 72.3971 20.9162 72.6891L13.1964 73.3024C11.5178 73.4357 10.4361 71.5615 11.3908 70.1745L15.7687 63.8141C17.8791 60.7479 16.7169 56.5199 13.3361 54.9625L6.16323 51.6588C4.61226 50.9444 4.61226 48.7394 6.16323 48.025L13.2619 44.7555C16.6719 43.1845 17.8181 38.9026 15.6486 35.8385L11.0255 29.3102C10.0383 27.9157 11.1415 26.0049 12.8429 26.1627L20.7462 26.8961C24.4862 27.243 27.6215 24.1077 27.2746 20.3678L26.5421 12.4645C26.3843 10.7633 28.2942 9.66023 29.6886 10.6471L36.2726 15.3092C39.3127 17.4615 43.559 16.352 45.1583 12.9879L48.4132 6.14126Z"
        fill="white"
        className="fill-theme-100 stroke-theme-200"
      />
      <path
        d="M49.5 46H50.5L50.125 76H50H49.875L49.5 46Z"
        transform={`rotate(${s * 360} 50 50)`}
        className="fill-theme-500"
        suppressHydrationWarning
      />
      <path d="M49 46H51L50.5 82H49.5L49 46Z" transform={`rotate(${m * 360} 50 50)`} className="fill-theme-600" suppressHydrationWarning />
      <path d="M49 46H51L50.5 74H49.5L49 46Z" transform={`rotate(${h * 360} 50 50)`} className="fill-theme-600" suppressHydrationWarning />
    </svg>
  );
}
