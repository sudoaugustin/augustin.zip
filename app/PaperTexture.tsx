'use client';
import { useSettings } from './contexts/Settings';

export default function PaperTexture() {
  const { settings } = useSettings();

  return (
    <div
      style={{ filter: 'url(#noise)' }}
      className={`pointer-events-none absolute inset-0 z-5 mix-blend-multiply duration-500 ${settings.paperTexture ? 'opacity-75 [.light_&]:opacity-50' : 'opacity-0'}`}
    >
      <svg className="hidden">
        <title>Noise</title>
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency={1.5} numOctaves={10} seed={1} />
        </filter>
      </svg>
    </div>
  );
}
