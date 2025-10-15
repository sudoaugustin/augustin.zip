'use client';

import { useContext, useEffect, useRef } from 'react';
import { AudioContext } from './contexts/Audio';
import { useSettings } from './contexts/Settings';

export default function BGSound() {
  const { settings } = useSettings();
  const { audioRef, isReady } = useContext(AudioContext);
  const nodesRef = useRef<Array<AudioNode>>([]);

  useEffect(() => {
    const audioContext = audioRef.current;
    if (!audioContext || !settings.backgroundSound || !isReady) return;

    const nodes: AudioNode[] = [];
    const masterGain = audioContext.createGain();
    masterGain.gain.setValueAtTime(0.35, audioContext.currentTime);
    nodes.push(masterGain);

    const osc1 = audioContext.createOscillator();
    const osc2 = audioContext.createOscillator();
    const osc3 = audioContext.createOscillator();

    osc1.type = 'sine';
    osc2.type = 'triangle';
    osc3.type = 'sine';

    osc1.frequency.setValueAtTime(80, audioContext.currentTime);
    osc2.frequency.setValueAtTime(120, audioContext.currentTime);
    osc3.frequency.setValueAtTime(200, audioContext.currentTime);

    const gain1 = audioContext.createGain();
    const gain2 = audioContext.createGain();
    const gain3 = audioContext.createGain();

    gain1.gain.setValueAtTime(0.6, audioContext.currentTime);
    gain2.gain.setValueAtTime(0.3, audioContext.currentTime);
    gain3.gain.setValueAtTime(0.15, audioContext.currentTime);

    const filter1 = audioContext.createBiquadFilter();
    const filter2 = audioContext.createBiquadFilter();

    filter1.type = 'lowpass';
    filter1.frequency.setValueAtTime(600, audioContext.currentTime);
    filter1.Q.setValueAtTime(8, audioContext.currentTime);

    filter2.type = 'bandpass';
    filter2.frequency.setValueAtTime(300, audioContext.currentTime);
    filter2.Q.setValueAtTime(12, audioContext.currentTime);

    const lfo1 = audioContext.createOscillator();
    const lfo2 = audioContext.createOscillator();
    const lfo3 = audioContext.createOscillator();

    lfo1.type = 'sine';
    lfo2.type = 'sine';
    lfo3.type = 'triangle';

    lfo1.frequency.setValueAtTime(0.3, audioContext.currentTime);
    lfo2.frequency.setValueAtTime(0.7, audioContext.currentTime);
    lfo3.frequency.setValueAtTime(1.2, audioContext.currentTime);

    const lfoGain1 = audioContext.createGain();
    const lfoGain2 = audioContext.createGain();
    const lfoGain3 = audioContext.createGain();

    lfoGain1.gain.setValueAtTime(300, audioContext.currentTime);
    lfoGain2.gain.setValueAtTime(150, audioContext.currentTime);
    lfoGain3.gain.setValueAtTime(0.08, audioContext.currentTime);

    lfo1.connect(lfoGain1);
    lfoGain1.connect(filter1.frequency);

    lfo2.connect(lfoGain2);
    lfoGain2.connect(filter2.frequency);

    lfo3.connect(lfoGain3);
    lfoGain3.connect(masterGain.gain);

    osc1.connect(gain1);
    osc2.connect(gain2);
    osc3.connect(gain3);

    gain1.connect(filter1);
    gain2.connect(filter1);
    gain3.connect(filter2);

    filter1.connect(filter2);
    filter2.connect(masterGain);
    masterGain.connect(audioContext.destination);

    osc1.start();
    osc2.start();
    osc3.start();
    lfo1.start();
    lfo2.start();
    lfo3.start();

    nodes.push(osc1, osc2, osc3, gain1, gain2, gain3, filter1, filter2, lfo1, lfo2, lfo3, lfoGain1, lfoGain2, lfoGain3);
    nodesRef.current = nodes;

    return () => {
      try {
        osc1.stop();
        osc2.stop();
        osc3.stop();
        lfo1.stop();
        lfo2.stop();
        lfo3.stop();
      } catch (e) {}

      for (const node of nodes) {
        try {
          node.disconnect();
        } catch (e) {}
      }
    };
  }, [audioRef, settings.backgroundSound, isReady]);

  return null;
}
