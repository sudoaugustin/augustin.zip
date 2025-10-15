'use client';

import { AudioContext } from 'app/contexts/Audio';
import { useSettings } from 'app/contexts/Settings';
import Link, { type LinkProps } from 'next/link';
import { useContext, type HTMLAttributes } from 'react';

export default function LinkButton({ className, ...rest }: LinkProps & HTMLAttributes<HTMLAnchorElement>) {
  const { settings } = useSettings();
  const { audioRef } = useContext(AudioContext);

  const handleEmitAudio = (freq: number) => {
    const audio = audioRef?.current;
    if (audio && settings.interactionSound) {
      const duration = 0.025;
      const currentTime = audio.currentTime;

      const osc = audio.createOscillator();
      const gainNode = audio.createGain();

      osc.connect(gainNode);
      gainNode.connect(audio.destination);

      osc.type = 'sine';

      osc.frequency.setValueAtTime(freq, currentTime);

      gainNode.gain.setValueAtTime(0.05, currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, currentTime + 0.001);

      osc.start(currentTime);
      osc.stop(currentTime + duration);
    }
  };

  return (
    <Link
      {...rest}
      target="_blank"
      onClick={() => handleEmitAudio(3200)}
      onMouseEnter={() => handleEmitAudio(2400)}
      className={`rounded-full bg-theme-200 px-3 py-1 text-theme-600 text-xs/none duration-500 hover:bg-theme-300 hover:text-theme-800 lg:text-sm/none ${className}`}
    />
  );
}
