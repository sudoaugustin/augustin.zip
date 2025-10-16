import { SETTINGS_STORAGE_KEY } from 'app/consts';
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Vars } from 'utils';

type Settings = {
  colors: Vars;
  fontSize: number;
  grayscale: boolean;
  paperTexture: boolean;
  clockSound: boolean;
  backgroundSound: boolean;
  interactionSound: boolean;
};

type SettingsContextType = {
  settings: Settings;
  setSettings: (newSettings: Partial<Settings>) => void;
};

const SettingsContext = createContext<SettingsContextType | null>(null);

const defaultSettings: Settings = {
  colors: {},
  fontSize: 16,
  grayscale: true,
  paperTexture: true,
  clockSound: false,
  backgroundSound: true,
  interactionSound: true,
};

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);

    if (stored) {
      const parsedSettings = JSON.parse(stored) as Partial<Settings>;
      setSettings({ ...defaultSettings, ...parsedSettings });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    if (settings.grayscale) {
      document.documentElement.classList.add('grayscale');
    } else {
      document.documentElement.classList.remove('grayscale');
    }
  }, [settings.grayscale]);

  useEffect(() => {
    const fontSize = settings.fontSize;
    document.documentElement.style.setProperty('--font-size', `${fontSize}px`);
  }, [settings.fontSize]);

  const handleSetSettings = useCallback<SettingsContextType['setSettings']>((newSettings) => {
    setSettings((prevSettings) => {
      return { ...prevSettings, ...newSettings };
    });
  }, []);

  return <SettingsContext.Provider value={{ settings, setSettings: handleSetSettings }}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
export { SETTINGS_STORAGE_KEY };
