'use client';

import * as ScrollArea from '@radix-ui/react-scroll-area';
import { AudioContext } from 'app/contexts/Audio';
import { useSettings } from 'app/contexts/Settings';
import { type HTMLAttributes, useContext, useRef } from 'react';

export default function Showcase({ title, children, className, ...rest }: HTMLAttributes<HTMLElement>) {
  const { settings } = useSettings();
  const { audioRef } = useContext(AudioContext);

  const handleScroll = () => {
    const audio = audioRef?.current;
    if (audio && settings.interactionSound) {
      const currentTime = audio.currentTime;

      const osc = audio.createOscillator();
      const gainNode = audio.createGain();

      osc.connect(gainNode);
      gainNode.connect(audio.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(100, currentTime);

      gainNode.gain.setValueAtTime(0.1, currentTime);

      osc.start(currentTime);
      osc.stop(currentTime + 0.005);
    }
  };

  return (
    <section>
      <ScrollArea.Root type="auto">
        <div className="mb-2.5 flex items-end justify-between lg:mb-5">
          <p className="font-semibold">{title}</p>
          <ScrollArea.Scrollbar orientation="horizontal" className="!relative mb-1 h-1.5 w-16 rounded bg-theme-200 duration-500">
            <ScrollArea.Thumb className="!h-1.5 motion-preset-fade cursor-pointer rounded bg-theme-400 transition-colors duration-500 hover:bg-theme-600" />
          </ScrollArea.Scrollbar>
        </div>
        <ScrollArea.Viewport className="max-lg:-mx-5 max-lg:px-5" onScroll={handleScroll}>
          <div {...rest} className={`flex space-x-4 [&>*]:flex-shrink-0 ${className}`}>
            {children}
          </div>
        </ScrollArea.Viewport>
      </ScrollArea.Root>
    </section>
  );
}
