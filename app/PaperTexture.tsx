'use client';
import { useSettings } from './contexts/Settings';

export default function PaperTexture() {
  const { settings } = useSettings();

  return (
    <div
      style={{ filter: 'url(#noise)' }}
      className={`pointer-events-none absolute inset-0 z-10 mix-blend-multiply duration-500 ${settings.paperTexture ? 'opacity-100 [.light_&]:opacity-75' : 'opacity-0'}`}
    >
      <svg className="hidden">
        <title>Noise</title>
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="2.5" numOctaves="3" seed="2" />
        </filter>
      </svg>
    </div>
  );
}
