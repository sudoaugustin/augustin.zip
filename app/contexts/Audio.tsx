'use client';

import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/16/solid';
import { type MutableRefObject, type ReactNode, createContext, useCallback, useEffect, useRef, useState } from 'react';

type WindowWithAudioContext = {
  webkitAudioContext: typeof AudioContext;
};

type TAudioContext = {
  audioRef: MutableRefObject<AudioContext | null>;
  isReady: boolean;
  enableAudio: () => Promise<void>;
};

const getWindowAudioContext = () => {
  if (typeof window === 'undefined') return null;
  return new (window.AudioContext || (window as unknown as WindowWithAudioContext).webkitAudioContext)();
};

export const AudioContext = createContext<TAudioContext>({
  isReady: false,
  audioRef: { current: null },
  enableAudio: async () => {},
});

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef(getWindowAudioContext());
  const [isReady, setIsReady] = useState(false);

  const enableAudio = useCallback(async () => {
    const audioCtx = audioRef.current;
    if (!audioCtx) return;

    if (audioCtx.state === 'suspended') {
      await audioCtx.resume();
    }

    setIsReady(audioCtx.state === 'running');
  }, []);

  useEffect(() => {
    const handleInteraction = () => {
      enableAudio();
    };

    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('keydown', handleInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, [enableAudio]);

  return (
    <AudioContext.Provider value={{ audioRef, isReady, enableAudio }}>
      {children}
      <button
        type="button"
        className="a-10 fixed right-[4.5rem] bottom-5 flex flex-center overflow-hidden rounded-[1.25rem] border border-theme-200/75 bg-theme-100 text-theme-600 lg:right-[5.5rem] lg:bottom-10"
        title="Audio status indicator"
        aria-label="Audio status indicator"
        onClick={() => setIsReady(!isReady)}
      >
        {isReady ? <SpeakerWaveIcon className="motion-preset-fade-sm w-4" /> : <SpeakerXMarkIcon className="w-4" />}
      </button>
    </AudioContext.Provider>
  );
};
