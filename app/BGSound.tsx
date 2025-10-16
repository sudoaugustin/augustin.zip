'use client';

import { useContext, useEffect, useRef } from 'react';
import { AudioContext } from './contexts/Audio';
import { useSettings } from './contexts/Settings';

export default function BGSound() {
  const { settings } = useSettings();
  const { audioRef, isReady } = useContext(AudioContext);
  const nodesRef = useRef<Array<AudioNode>>([]);
  const mousePos = useRef({ x: 0.5, y: 0.5 }); // Normalized 0-1
  const mouseVelocity = useRef({ x: 0, y: 0 }); // Movement speed
  const lastMousePos = useRef({ x: 0.5, y: 0.5 });
  const lastMoveTime = useRef(Date.now());

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX / window.innerWidth;
      const newY = e.clientY / window.innerHeight;

      // Calculate velocity (how fast mouse is moving)
      const deltaX = newX - lastMousePos.current.x;
      const deltaY = newY - lastMousePos.current.y;

      mouseVelocity.current = {
        x: Math.abs(deltaX),
        y: Math.abs(deltaY),
      };

      lastMousePos.current = { x: newX, y: newY };
      mousePos.current = { x: newX, y: newY };
      lastMoveTime.current = Date.now();
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const audioContext = audioRef.current;
    if (!audioContext || !settings.backgroundSound || !isReady) return;

    const nodes: AudioNode[] = [];
    const oscillators: OscillatorNode[] = [];

    // Master gain - reduced for more oscillators
    const masterGain = audioContext.createGain();
    masterGain.gain.setValueAtTime(0.22, audioContext.currentTime);
    nodes.push(masterGain);

    // Create lush reverb using convolver
    const convolver = audioContext.createConvolver();
    const reverbLength = audioContext.sampleRate * 4; // 4 seconds for spacious reverb
    const impulse = audioContext.createBuffer(2, reverbLength, audioContext.sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      for (let i = 0; i < reverbLength; i++) {
        // Create smoother decay curve for ambient reverb
        const decay = (1 - i / reverbLength) ** 2.5;
        channelData[i] = (Math.random() * 2 - 1) * decay;
      }
    }
    convolver.buffer = impulse;
    nodes.push(convolver);

    const reverbGain = audioContext.createGain();
    reverbGain.gain.setValueAtTime(0.55, audioContext.currentTime); // More reverb for ambient
    nodes.push(reverbGain);

    const dryGain = audioContext.createGain();
    dryGain.gain.setValueAtTime(0.45, audioContext.currentTime);
    nodes.push(dryGain);

    // Main oscillator mix node
    const oscMix = audioContext.createGain();
    oscMix.gain.setValueAtTime(1, audioContext.currentTime);
    nodes.push(oscMix);

    // Deep bass oscillators with slow fade-in
    const bassOsc1 = audioContext.createOscillator();
    const bassOsc2 = audioContext.createOscillator();
    const bassOsc3 = audioContext.createOscillator(); // Add detuned third
    bassOsc1.type = 'sine';
    bassOsc2.type = 'sine';
    bassOsc3.type = 'sine';
    bassOsc1.frequency.setValueAtTime(55, audioContext.currentTime); // A1
    bassOsc2.frequency.setValueAtTime(82.5, audioContext.currentTime); // E2
    bassOsc3.frequency.setValueAtTime(110, audioContext.currentTime); // A2
    oscillators.push(bassOsc1, bassOsc2, bassOsc3);

    const bassGain1 = audioContext.createGain();
    const bassGain2 = audioContext.createGain();
    const bassGain3 = audioContext.createGain();
    // Start from silence and fade in slowly to subtle levels
    bassGain1.gain.setValueAtTime(0, audioContext.currentTime);
    bassGain1.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + 4);
    bassGain2.gain.setValueAtTime(0, audioContext.currentTime);
    bassGain2.gain.linearRampToValueAtTime(0.06, audioContext.currentTime + 5);
    bassGain3.gain.setValueAtTime(0, audioContext.currentTime);
    bassGain3.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + 6);
    nodes.push(bassGain1, bassGain2, bassGain3);

    // Mid-range pad oscillators - detuned for richness
    const padOsc1 = audioContext.createOscillator();
    const padOsc2 = audioContext.createOscillator();
    const padOsc3 = audioContext.createOscillator();
    const padOsc4 = audioContext.createOscillator();
    const padOsc5 = audioContext.createOscillator();
    padOsc1.type = 'sawtooth';
    padOsc2.type = 'sawtooth';
    padOsc3.type = 'triangle';
    padOsc4.type = 'sine';
    padOsc5.type = 'sine';
    // Using perfect fifth intervals for harmonic richness
    padOsc1.frequency.setValueAtTime(110, audioContext.currentTime); // A2
    padOsc2.frequency.setValueAtTime(110.5, audioContext.currentTime); // A2 slightly detuned
    padOsc3.frequency.setValueAtTime(165, audioContext.currentTime); // E3
    padOsc4.frequency.setValueAtTime(220, audioContext.currentTime); // A3
    padOsc5.frequency.setValueAtTime(164.5, audioContext.currentTime); // E3 slightly detuned
    oscillators.push(padOsc1, padOsc2, padOsc3, padOsc4, padOsc5);

    const padGain1 = audioContext.createGain();
    const padGain2 = audioContext.createGain();
    const padGain3 = audioContext.createGain();
    const padGain4 = audioContext.createGain();
    const padGain5 = audioContext.createGain();
    // Slow fade-ins with staggered timing - very subtle under noise
    padGain1.gain.setValueAtTime(0, audioContext.currentTime);
    padGain1.gain.linearRampToValueAtTime(0.03, audioContext.currentTime + 6);
    padGain2.gain.setValueAtTime(0, audioContext.currentTime);
    padGain2.gain.linearRampToValueAtTime(0.03, audioContext.currentTime + 7);
    padGain3.gain.setValueAtTime(0, audioContext.currentTime);
    padGain3.gain.linearRampToValueAtTime(0.04, audioContext.currentTime + 8);
    padGain4.gain.setValueAtTime(0, audioContext.currentTime);
    padGain4.gain.linearRampToValueAtTime(0.035, audioContext.currentTime + 9);
    padGain5.gain.setValueAtTime(0, audioContext.currentTime);
    padGain5.gain.linearRampToValueAtTime(0.03, audioContext.currentTime + 10);
    nodes.push(padGain1, padGain2, padGain3, padGain4, padGain5);

    // High shimmer oscillators - very subtle
    const shimmerOsc1 = audioContext.createOscillator();
    const shimmerOsc2 = audioContext.createOscillator();
    const shimmerOsc3 = audioContext.createOscillator();
    shimmerOsc1.type = 'sine';
    shimmerOsc2.type = 'sine';
    shimmerOsc3.type = 'triangle';
    shimmerOsc1.frequency.setValueAtTime(440, audioContext.currentTime); // A4
    shimmerOsc2.frequency.setValueAtTime(660, audioContext.currentTime); // E5
    shimmerOsc3.frequency.setValueAtTime(880, audioContext.currentTime); // A5
    oscillators.push(shimmerOsc1, shimmerOsc2, shimmerOsc3);

    const shimmerGain1 = audioContext.createGain();
    const shimmerGain2 = audioContext.createGain();
    const shimmerGain3 = audioContext.createGain();
    // Very slow fade-in for ethereal quality - barely audible
    shimmerGain1.gain.setValueAtTime(0, audioContext.currentTime);
    shimmerGain1.gain.linearRampToValueAtTime(0.02, audioContext.currentTime + 12);
    shimmerGain2.gain.setValueAtTime(0, audioContext.currentTime);
    shimmerGain2.gain.linearRampToValueAtTime(0.015, audioContext.currentTime + 14);
    shimmerGain3.gain.setValueAtTime(0, audioContext.currentTime);
    shimmerGain3.gain.linearRampToValueAtTime(0.01, audioContext.currentTime + 16);
    nodes.push(shimmerGain1, shimmerGain2, shimmerGain3);

    // === Noise Generators for Rich Atmosphere ===
    const bufferSize = audioContext.sampleRate * 2;

    // 1. White Noise - High frequency texture
    const whiteNoiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const whiteNoiseData = whiteNoiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      whiteNoiseData[i] = Math.random() * 2 - 1;
    }

    const whiteNoiseSource = audioContext.createBufferSource();
    whiteNoiseSource.buffer = whiteNoiseBuffer;
    whiteNoiseSource.loop = true;
    nodes.push(whiteNoiseSource);

    const whiteNoiseFilter = audioContext.createBiquadFilter();
    whiteNoiseFilter.type = 'bandpass';
    whiteNoiseFilter.frequency.setValueAtTime(2000, audioContext.currentTime);
    whiteNoiseFilter.Q.setValueAtTime(0.5, audioContext.currentTime);
    nodes.push(whiteNoiseFilter);

    const whiteNoiseGain = audioContext.createGain();
    whiteNoiseGain.gain.setValueAtTime(0.045, audioContext.currentTime);
    nodes.push(whiteNoiseGain);

    // 2. Pink Noise - More natural, balanced spectrum
    const pinkNoiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const pinkNoiseData = pinkNoiseBuffer.getChannelData(0);
    let b0 = 0;
    let b1 = 0;
    let b2 = 0;
    let b3 = 0;
    let b4 = 0;
    let b5 = 0;
    let b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.969 * b2 + white * 0.153852;
      b3 = 0.8665 * b3 + white * 0.3104856;
      b4 = 0.55 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.016898;
      pinkNoiseData[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }

    const pinkNoiseSource = audioContext.createBufferSource();
    pinkNoiseSource.buffer = pinkNoiseBuffer;
    pinkNoiseSource.loop = true;
    nodes.push(pinkNoiseSource);

    const pinkNoiseFilter = audioContext.createBiquadFilter();
    pinkNoiseFilter.type = 'lowpass';
    pinkNoiseFilter.frequency.setValueAtTime(800, audioContext.currentTime);
    pinkNoiseFilter.Q.setValueAtTime(0.3, audioContext.currentTime);
    nodes.push(pinkNoiseFilter);

    const pinkNoiseGain = audioContext.createGain();
    pinkNoiseGain.gain.setValueAtTime(0.07, audioContext.currentTime);
    nodes.push(pinkNoiseGain);

    // 3. Brown Noise - Deep rumbling texture
    const brownNoiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const brownNoiseData = brownNoiseBuffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      brownNoiseData[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = brownNoiseData[i];
      brownNoiseData[i] *= 3.5; // Compensate for volume loss
    }

    const brownNoiseSource = audioContext.createBufferSource();
    brownNoiseSource.buffer = brownNoiseBuffer;
    brownNoiseSource.loop = true;
    nodes.push(brownNoiseSource);

    const brownNoiseFilter = audioContext.createBiquadFilter();
    brownNoiseFilter.type = 'lowpass';
    brownNoiseFilter.frequency.setValueAtTime(200, audioContext.currentTime);
    brownNoiseFilter.Q.setValueAtTime(1, audioContext.currentTime);
    nodes.push(brownNoiseFilter);

    const brownNoiseGain = audioContext.createGain();
    brownNoiseGain.gain.setValueAtTime(0.08, audioContext.currentTime);
    nodes.push(brownNoiseGain);

    // 4. Wind-like texture noise
    const windNoiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const windNoiseData = windNoiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      windNoiseData[i] = Math.random() * 2 - 1;
    }

    const windNoiseSource = audioContext.createBufferSource();
    windNoiseSource.buffer = windNoiseBuffer;
    windNoiseSource.loop = true;
    nodes.push(windNoiseSource);

    const windNoiseFilter1 = audioContext.createBiquadFilter();
    windNoiseFilter1.type = 'bandpass';
    windNoiseFilter1.frequency.setValueAtTime(400, audioContext.currentTime);
    windNoiseFilter1.Q.setValueAtTime(0.3, audioContext.currentTime);
    nodes.push(windNoiseFilter1);

    const windNoiseFilter2 = audioContext.createBiquadFilter();
    windNoiseFilter2.type = 'highpass';
    windNoiseFilter2.frequency.setValueAtTime(300, audioContext.currentTime);
    windNoiseFilter2.Q.setValueAtTime(0.5, audioContext.currentTime);
    nodes.push(windNoiseFilter2);

    const windNoiseGain = audioContext.createGain();
    windNoiseGain.gain.setValueAtTime(0.055, audioContext.currentTime);
    nodes.push(windNoiseGain);

    // 5. Enhanced Vinyl Crackle - more prominent for vintage feel
    const crackleNoiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const crackleNoiseData = crackleNoiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      // More frequent crackles with varying intensity
      if (Math.random() < 0.04) {
        crackleNoiseData[i] = (Math.random() * 2 - 1) * (Math.random() * 0.5 + 0.5);
      } else {
        crackleNoiseData[i] = 0;
      }
    }

    const crackleNoiseSource = audioContext.createBufferSource();
    crackleNoiseSource.buffer = crackleNoiseBuffer;
    crackleNoiseSource.loop = true;
    nodes.push(crackleNoiseSource);

    const crackleNoiseFilter = audioContext.createBiquadFilter();
    crackleNoiseFilter.type = 'highpass';
    crackleNoiseFilter.frequency.setValueAtTime(1800, audioContext.currentTime);
    crackleNoiseFilter.Q.setValueAtTime(0.5, audioContext.currentTime);
    nodes.push(crackleNoiseFilter);

    const crackleNoiseGain = audioContext.createGain();
    crackleNoiseGain.gain.setValueAtTime(0.035, audioContext.currentTime);
    nodes.push(crackleNoiseGain);

    // 6. Tape Hiss - classic analog tape character
    const tapeHissBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const tapeHissData = tapeHissBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      tapeHissData[i] = Math.random() * 2 - 1;
    }

    const tapeHissSource = audioContext.createBufferSource();
    tapeHissSource.buffer = tapeHissBuffer;
    tapeHissSource.loop = true;
    nodes.push(tapeHissSource);

    const tapeHissFilter = audioContext.createBiquadFilter();
    tapeHissFilter.type = 'highpass';
    tapeHissFilter.frequency.setValueAtTime(4000, audioContext.currentTime);
    tapeHissFilter.Q.setValueAtTime(0.3, audioContext.currentTime);
    nodes.push(tapeHissFilter);

    const tapeHissGain = audioContext.createGain();
    tapeHissGain.gain.setValueAtTime(0.025, audioContext.currentTime);
    nodes.push(tapeHissGain);

    // 7. Low-frequency rumble (old equipment/turntable)
    const rumbleNoiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const rumbleNoiseData = rumbleNoiseBuffer.getChannelData(0);
    let rumbleAccum = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      rumbleAccum = (rumbleAccum + 0.005 * white) / 1.005;
      rumbleNoiseData[i] = rumbleAccum * 10;
    }

    const rumbleNoiseSource = audioContext.createBufferSource();
    rumbleNoiseSource.buffer = rumbleNoiseBuffer;
    rumbleNoiseSource.loop = true;
    nodes.push(rumbleNoiseSource);

    const rumbleNoiseFilter = audioContext.createBiquadFilter();
    rumbleNoiseFilter.type = 'lowpass';
    rumbleNoiseFilter.frequency.setValueAtTime(50, audioContext.currentTime);
    rumbleNoiseFilter.Q.setValueAtTime(2, audioContext.currentTime);
    nodes.push(rumbleNoiseFilter);

    const rumbleNoiseGain = audioContext.createGain();
    rumbleNoiseGain.gain.setValueAtTime(0.08, audioContext.currentTime);
    nodes.push(rumbleNoiseGain);

    // 8. Vinyl surface noise (continuous low hiss)
    const vinylSurfaceBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const vinylSurfaceData = vinylSurfaceBuffer.getChannelData(0);
    let vs0 = 0;
    let vs1 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      vs0 = 0.997 * vs0 + white * 0.0125;
      vs1 = 0.985 * vs1 + white * 0.0085;
      vinylSurfaceData[i] = (vs0 + vs1) * 0.5;
    }

    const vinylSurfaceSource = audioContext.createBufferSource();
    vinylSurfaceSource.buffer = vinylSurfaceBuffer;
    vinylSurfaceSource.loop = true;
    nodes.push(vinylSurfaceSource);

    const vinylSurfaceFilter = audioContext.createBiquadFilter();
    vinylSurfaceFilter.type = 'bandpass';
    vinylSurfaceFilter.frequency.setValueAtTime(1500, audioContext.currentTime);
    vinylSurfaceFilter.Q.setValueAtTime(0.4, audioContext.currentTime);
    nodes.push(vinylSurfaceFilter);

    const vinylSurfaceGain = audioContext.createGain();
    vinylSurfaceGain.gain.setValueAtTime(0.055, audioContext.currentTime);
    nodes.push(vinylSurfaceGain);

    // 9. Random pops and clicks (old vinyl)
    const popsBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const popsData = popsBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      // Very rare but noticeable pops
      if (Math.random() < 0.0005) {
        popsData[i] = (Math.random() * 2 - 1) * 0.8;
        // Add decay tail
        for (let j = 1; j < 10 && i + j < bufferSize; j++) {
          popsData[i + j] = popsData[i] * (1 - j / 10);
        }
      }
    }

    const popsSource = audioContext.createBufferSource();
    popsSource.buffer = popsBuffer;
    popsSource.loop = true;
    nodes.push(popsSource);

    const popsGain = audioContext.createGain();
    popsGain.gain.setValueAtTime(0.15, audioContext.currentTime);
    nodes.push(popsGain);

    // 10. Analog warmth noise (low-mid frequency texture)
    const warmthNoiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const warmthNoiseData = warmthNoiseBuffer.getChannelData(0);
    let w0 = 0;
    let w1 = 0;
    let w2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      w0 = 0.95 * w0 + white * 0.08;
      w1 = 0.92 * w1 + white * 0.06;
      w2 = 0.88 * w2 + white * 0.04;
      warmthNoiseData[i] = (w0 + w1 + w2) * 0.4;
    }

    const warmthNoiseSource = audioContext.createBufferSource();
    warmthNoiseSource.buffer = warmthNoiseBuffer;
    warmthNoiseSource.loop = true;
    nodes.push(warmthNoiseSource);

    const warmthNoiseFilter = audioContext.createBiquadFilter();
    warmthNoiseFilter.type = 'bandpass';
    warmthNoiseFilter.frequency.setValueAtTime(600, audioContext.currentTime);
    warmthNoiseFilter.Q.setValueAtTime(0.6, audioContext.currentTime);
    nodes.push(warmthNoiseFilter);

    const warmthNoiseGain = audioContext.createGain();
    warmthNoiseGain.gain.setValueAtTime(0.065, audioContext.currentTime);
    nodes.push(warmthNoiseGain);

    // Mix all noise sources
    const noiseMix = audioContext.createGain();
    noiseMix.gain.setValueAtTime(1, audioContext.currentTime);
    nodes.push(noiseMix);

    // Multiple filter stages for smooth ambient sound
    // Aggressive lowpass to tame harsh frequencies
    const lowpassFilter1 = audioContext.createBiquadFilter();
    lowpassFilter1.type = 'lowpass';
    lowpassFilter1.frequency.setValueAtTime(600, audioContext.currentTime);
    lowpassFilter1.Q.setValueAtTime(0.7, audioContext.currentTime);
    nodes.push(lowpassFilter1);

    const lowpassFilter2 = audioContext.createBiquadFilter();
    lowpassFilter2.type = 'lowpass';
    lowpassFilter2.frequency.setValueAtTime(1200, audioContext.currentTime);
    lowpassFilter2.Q.setValueAtTime(0.5, audioContext.currentTime);
    nodes.push(lowpassFilter2);

    const highpassFilter = audioContext.createBiquadFilter();
    highpassFilter.type = 'highpass';
    highpassFilter.frequency.setValueAtTime(35, audioContext.currentTime);
    highpassFilter.Q.setValueAtTime(0.3, audioContext.currentTime);
    nodes.push(highpassFilter);

    // Peaking filter to add warmth in mid-range
    const peakFilter = audioContext.createBiquadFilter();
    peakFilter.type = 'peaking';
    peakFilter.frequency.setValueAtTime(250, audioContext.currentTime);
    peakFilter.Q.setValueAtTime(1, audioContext.currentTime);
    peakFilter.gain.setValueAtTime(3, audioContext.currentTime);
    nodes.push(peakFilter);

    // Additional gentle lowshelf to warm up the bass
    const lowShelfFilter = audioContext.createBiquadFilter();
    lowShelfFilter.type = 'lowshelf';
    lowShelfFilter.frequency.setValueAtTime(150, audioContext.currentTime);
    lowShelfFilter.gain.setValueAtTime(4, audioContext.currentTime);
    nodes.push(lowShelfFilter);

    // LFOs for modulation - including vintage drift and pitch modulation
    const lfo1 = audioContext.createOscillator();
    const lfo2 = audioContext.createOscillator();
    const lfo3 = audioContext.createOscillator();
    const lfo4 = audioContext.createOscillator();
    const lfo5 = audioContext.createOscillator();
    const lfo6 = audioContext.createOscillator();
    const lfo7 = audioContext.createOscillator(); // Vintage drift
    const lfo8 = audioContext.createOscillator(); // Tape wow/flutter
    const lfo9 = audioContext.createOscillator(); // Bass pitch drift
    const lfo10 = audioContext.createOscillator(); // Pad pitch vibrato
    const lfo11 = audioContext.createOscillator(); // Shimmer pitch modulation
    const lfo12 = audioContext.createOscillator(); // Additional pad movement

    lfo1.type = 'sine';
    lfo2.type = 'sine';
    lfo3.type = 'triangle';
    lfo4.type = 'sine';
    lfo5.type = 'sine';
    lfo6.type = 'triangle';
    lfo7.type = 'sine';
    lfo8.type = 'triangle';
    lfo9.type = 'sine';
    lfo10.type = 'triangle';
    lfo11.type = 'sine';
    lfo12.type = 'sine';

    lfo1.frequency.setValueAtTime(0.08, audioContext.currentTime); // Very slow
    lfo2.frequency.setValueAtTime(0.05, audioContext.currentTime);
    lfo3.frequency.setValueAtTime(0.03, audioContext.currentTime); // Super slow for breathing
    lfo4.frequency.setValueAtTime(0.12, audioContext.currentTime);
    lfo5.frequency.setValueAtTime(0.06, audioContext.currentTime);
    lfo6.frequency.setValueAtTime(0.09, audioContext.currentTime);
    lfo7.frequency.setValueAtTime(0.02, audioContext.currentTime); // Ultra slow pitch drift
    lfo8.frequency.setValueAtTime(0.15, audioContext.currentTime); // Tape wow/flutter
    lfo9.frequency.setValueAtTime(0.04, audioContext.currentTime); // Super slow bass drift
    lfo10.frequency.setValueAtTime(0.18, audioContext.currentTime); // Subtle pad vibrato
    lfo11.frequency.setValueAtTime(0.25, audioContext.currentTime); // Shimmer pitch movement
    lfo12.frequency.setValueAtTime(0.07, audioContext.currentTime); // Secondary pad drift
    oscillators.push(lfo1, lfo2, lfo3, lfo4, lfo5, lfo6, lfo7, lfo8, lfo9, lfo10, lfo11, lfo12);

    const lfoGain1 = audioContext.createGain();
    const lfoGain2 = audioContext.createGain();
    const lfoGain3 = audioContext.createGain();
    const lfoGain4 = audioContext.createGain();
    const lfoGain5 = audioContext.createGain();
    const lfoGain6 = audioContext.createGain();
    const lfoGain7 = audioContext.createGain();
    const lfoGain8 = audioContext.createGain();
    const lfoGain9 = audioContext.createGain();
    const lfoGain10 = audioContext.createGain();
    const lfoGain11 = audioContext.createGain();
    const lfoGain12 = audioContext.createGain();

    lfoGain1.gain.setValueAtTime(150, audioContext.currentTime); // Modulate lowpass1
    lfoGain2.gain.setValueAtTime(250, audioContext.currentTime); // Modulate lowpass2
    lfoGain3.gain.setValueAtTime(0.04, audioContext.currentTime); // Modulate master gain (subtle breathing)
    lfoGain4.gain.setValueAtTime(80, audioContext.currentTime); // Modulate wind noise filter
    lfoGain5.gain.setValueAtTime(0.012, audioContext.currentTime); // Modulate pink noise gain
    lfoGain6.gain.setValueAtTime(150, audioContext.currentTime); // Modulate white noise filter
    lfoGain7.gain.setValueAtTime(0.015, audioContext.currentTime); // Modulate rumble gain
    lfoGain8.gain.setValueAtTime(100, audioContext.currentTime); // Modulate vinyl surface filter
    lfoGain9.gain.setValueAtTime(0.8, audioContext.currentTime); // Bass pitch drift (subtle)
    lfoGain10.gain.setValueAtTime(1.5, audioContext.currentTime); // Pad vibrato
    lfoGain11.gain.setValueAtTime(3, audioContext.currentTime); // Shimmer pitch movement
    lfoGain12.gain.setValueAtTime(2, audioContext.currentTime); // Secondary pad drift
    nodes.push(lfoGain1, lfoGain2, lfoGain3, lfoGain4, lfoGain5, lfoGain6, lfoGain7, lfoGain8, lfoGain9, lfoGain10, lfoGain11, lfoGain12);

    // Stereo widening with panner
    const pannerLeft = audioContext.createStereoPanner();
    const pannerRight = audioContext.createStereoPanner();
    pannerLeft.pan.setValueAtTime(-0.3, audioContext.currentTime);
    pannerRight.pan.setValueAtTime(0.3, audioContext.currentTime);
    nodes.push(pannerLeft, pannerRight);

    const leftGain = audioContext.createGain();
    const rightGain = audioContext.createGain();
    leftGain.gain.setValueAtTime(0.5, audioContext.currentTime);
    rightGain.gain.setValueAtTime(0.5, audioContext.currentTime);
    nodes.push(leftGain, rightGain);

    // Connect LFOs for organic movement and vintage character
    lfo1.connect(lfoGain1);
    lfoGain1.connect(lowpassFilter1.frequency);

    lfo2.connect(lfoGain2);
    lfoGain2.connect(lowpassFilter2.frequency);

    lfo3.connect(lfoGain3);
    lfoGain3.connect(masterGain.gain);

    lfo4.connect(lfoGain4);
    lfoGain4.connect(windNoiseFilter1.frequency);

    lfo5.connect(lfoGain5);
    lfoGain5.connect(pinkNoiseGain.gain);

    lfo6.connect(lfoGain6);
    lfoGain6.connect(whiteNoiseFilter.frequency);

    lfo7.connect(lfoGain7);
    lfoGain7.connect(rumbleNoiseGain.gain);

    lfo8.connect(lfoGain8);
    lfoGain8.connect(vinylSurfaceFilter.frequency);

    // Connect pitch modulation LFOs to oscillator frequencies
    lfo9.connect(lfoGain9);
    lfoGain9.connect(bassOsc1.detune);
    lfoGain9.connect(bassOsc2.detune);

    lfo10.connect(lfoGain10);
    lfoGain10.connect(padOsc1.detune);
    lfoGain10.connect(padOsc3.detune);

    lfo11.connect(lfoGain11);
    lfoGain11.connect(shimmerOsc1.detune);
    lfoGain11.connect(shimmerOsc2.detune);

    lfo12.connect(lfoGain12);
    lfoGain12.connect(padOsc2.detune);
    lfoGain12.connect(padOsc4.detune);
    lfoGain12.connect(padOsc5.detune);

    // Additional cross-modulation for richer movement
    lfoGain9.connect(bassOsc3.detune);
    lfoGain11.connect(shimmerOsc3.detune);

    // Connect bass oscillators
    bassOsc1.connect(bassGain1);
    bassOsc2.connect(bassGain2);
    bassOsc3.connect(bassGain3);
    bassGain1.connect(oscMix);
    bassGain2.connect(oscMix);
    bassGain3.connect(oscMix);

    // Connect pad oscillators (split for stereo width)
    padOsc1.connect(padGain1);
    padOsc2.connect(padGain2);
    padOsc3.connect(padGain3);
    padOsc4.connect(padGain4);
    padOsc5.connect(padGain5);

    // Spread pads across stereo field
    padGain1.connect(oscMix); // Center
    padGain2.connect(pannerLeft);
    padGain3.connect(oscMix); // Center
    padGain4.connect(pannerRight);
    padGain5.connect(pannerLeft);

    pannerLeft.connect(leftGain);
    pannerRight.connect(rightGain);
    leftGain.connect(oscMix);
    rightGain.connect(oscMix);

    // Connect shimmer oscillators
    shimmerOsc1.connect(shimmerGain1);
    shimmerOsc2.connect(shimmerGain2);
    shimmerOsc3.connect(shimmerGain3);
    shimmerGain1.connect(oscMix);
    shimmerGain2.connect(oscMix);
    shimmerGain3.connect(oscMix);

    // Connect all noise sources to noiseMix
    whiteNoiseSource.connect(whiteNoiseFilter);
    whiteNoiseFilter.connect(whiteNoiseGain);
    whiteNoiseGain.connect(noiseMix);

    pinkNoiseSource.connect(pinkNoiseFilter);
    pinkNoiseFilter.connect(pinkNoiseGain);
    pinkNoiseGain.connect(noiseMix);

    brownNoiseSource.connect(brownNoiseFilter);
    brownNoiseFilter.connect(brownNoiseGain);
    brownNoiseGain.connect(noiseMix);

    windNoiseSource.connect(windNoiseFilter1);
    windNoiseFilter1.connect(windNoiseFilter2);
    windNoiseFilter2.connect(windNoiseGain);
    windNoiseGain.connect(noiseMix);

    crackleNoiseSource.connect(crackleNoiseFilter);
    crackleNoiseFilter.connect(crackleNoiseGain);
    crackleNoiseGain.connect(noiseMix);

    // Connect vintage noise sources
    tapeHissSource.connect(tapeHissFilter);
    tapeHissFilter.connect(tapeHissGain);
    tapeHissGain.connect(noiseMix);

    rumbleNoiseSource.connect(rumbleNoiseFilter);
    rumbleNoiseFilter.connect(rumbleNoiseGain);
    rumbleNoiseGain.connect(noiseMix);

    vinylSurfaceSource.connect(vinylSurfaceFilter);
    vinylSurfaceFilter.connect(vinylSurfaceGain);
    vinylSurfaceGain.connect(noiseMix);

    popsSource.connect(popsGain);
    popsGain.connect(noiseMix);

    warmthNoiseSource.connect(warmthNoiseFilter);
    warmthNoiseFilter.connect(warmthNoiseGain);
    warmthNoiseGain.connect(noiseMix);

    // Mix noise into main signal
    noiseMix.connect(oscMix);

    // Route through multiple filter stages for smooth ambient sound
    oscMix.connect(highpassFilter);
    highpassFilter.connect(lowShelfFilter);
    lowShelfFilter.connect(peakFilter);
    peakFilter.connect(lowpassFilter1);
    lowpassFilter1.connect(lowpassFilter2);

    // Split dry and wet (reverb) signals
    lowpassFilter2.connect(dryGain);
    lowpassFilter2.connect(convolver);
    convolver.connect(reverbGain);

    // Mix dry and wet
    dryGain.connect(masterGain);
    reverbGain.connect(masterGain);

    // Connect to output
    masterGain.connect(audioContext.destination);

    // Start all oscillators
    for (const osc of oscillators) {
      osc.start();
    }

    // Start all noise sources
    whiteNoiseSource.start();
    pinkNoiseSource.start();
    brownNoiseSource.start();
    windNoiseSource.start();
    crackleNoiseSource.start();
    tapeHissSource.start();
    rumbleNoiseSource.start();
    vinylSurfaceSource.start();
    popsSource.start();
    warmthNoiseSource.start();

    nodesRef.current = nodes;

    // Mouse-driven noise modulation
    let animationId: number;
    const updateNoiseParams = () => {
      const mouseX = mousePos.current.x; // 0-1 (left to right)
      const mouseY = mousePos.current.y; // 0-1 (top to bottom)
      const velocityX = mouseVelocity.current.x;
      const velocityY = mouseVelocity.current.y;
      const totalVelocity = Math.min((velocityX + velocityY) * 100, 1); // Movement intensity

      // Check if mouse has been idle
      const timeSinceMove = Date.now() - lastMoveTime.current;
      const idleDecay = Math.max(0, 1 - timeSinceMove / 2000); // Fade over 2 seconds

      // Mouse X position controls horizontal noise spread
      const frequencyMultX = 0.5 + mouseX * 1.0; // 0.5x to 1.5x based on X position

      // Mouse Y position controls brightness/darkness
      const frequencyMultY = 0.5 + mouseY * 1.0; // 0.5x to 1.5x based on Y position

      // White noise follows horizontal movement (left-right)
      whiteNoiseFilter.frequency.setTargetAtTime(900 * frequencyMultX, audioContext.currentTime, 0.08);

      // Pink noise follows vertical movement (top-bottom)
      pinkNoiseFilter.frequency.setTargetAtTime(800 * frequencyMultY, audioContext.currentTime, 0.08);

      // Brown noise depth follows diagonal movement
      brownNoiseFilter.frequency.setTargetAtTime((200 * (frequencyMultX + frequencyMultY)) / 2, audioContext.currentTime, 0.08);

      // Wind noise follows diagonal movement
      windNoiseFilter1.frequency.setTargetAtTime((400 * (frequencyMultX + frequencyMultY)) / 2, audioContext.currentTime, 0.08);

      // Vinyl surface follows mouse X position
      vinylSurfaceFilter.frequency.setTargetAtTime(750 * frequencyMultX, audioContext.currentTime, 0.08);

      // Movement velocity triggers MORE noise
      const movementBoost = 1 + totalVelocity * idleDecay * 1.5; // Up to 2.5x louder when moving fast

      // White noise bursts on movement
      whiteNoiseGain.gain.setTargetAtTime(0.045 * movementBoost, audioContext.currentTime, 0.03);

      // Wind noise swells with movement
      windNoiseGain.gain.setTargetAtTime(0.055 * movementBoost, audioContext.currentTime, 0.03);

      // Vinyl surface crackles more on movement
      vinylSurfaceGain.gain.setTargetAtTime(0.055 * (1 + totalVelocity * idleDecay * 1.2), audioContext.currentTime, 0.03);

      // Crackle intensity SPIKES with fast movement
      crackleNoiseGain.gain.setTargetAtTime(0.035 * (1 + totalVelocity * idleDecay * 2.5), audioContext.currentTime, 0.02);

      // Pink noise pulses with movement
      pinkNoiseGain.gain.setTargetAtTime(0.07 * (1 + totalVelocity * idleDecay * 0.8), audioContext.currentTime, 0.03);

      // Tape hiss increases with fast movement
      tapeHissGain.gain.setTargetAtTime(0.025 * (1 + totalVelocity * idleDecay * 1.0), audioContext.currentTime, 0.03);

      // Mouse Y position affects overall filter brightness
      const brightnessY = 0.6 + mouseY * 0.8; // 0.6 to 1.4
      lowpassFilter1.frequency.setTargetAtTime(600 * brightnessY, audioContext.currentTime, 0.1);

      lowpassFilter2.frequency.setTargetAtTime(950 * brightnessY, audioContext.currentTime, 0.1);

      // Movement adds brightness burst
      const movementBrightness = 1 + totalVelocity * idleDecay * 0.5;
      lowpassFilter1.frequency.setTargetAtTime(600 * brightnessY * movementBrightness, audioContext.currentTime, 0.05);

      // Decay velocity for next frame
      mouseVelocity.current.x *= 0.85;
      mouseVelocity.current.y *= 0.85;

      // Continue animation loop
      animationId = requestAnimationFrame(updateNoiseParams);
    };

    // Start the animation loop
    updateNoiseParams();

    return () => {
      // Cancel animation loop
      cancelAnimationFrame(animationId);

      // Stop all oscillators
      for (const osc of oscillators) {
        try {
          osc.stop();
        } catch (e) {}
      }

      // Stop all noise sources
      try {
        whiteNoiseSource.stop();
        pinkNoiseSource.stop();
        brownNoiseSource.stop();
        windNoiseSource.stop();
        crackleNoiseSource.stop();
        tapeHissSource.stop();
        rumbleNoiseSource.stop();
        vinylSurfaceSource.stop();
        popsSource.stop();
        warmthNoiseSource.stop();
      } catch (e) {}

      // Disconnect all nodes
      for (const node of nodes) {
        try {
          node.disconnect();
        } catch (e) {}
      }
    };
  }, [audioRef, settings.backgroundSound, isReady]);

  return null;
}
