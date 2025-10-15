'use client';
import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { Cog8ToothIcon } from '@heroicons/react/24/outline';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { useSettings } from 'app/contexts/Settings';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { Tooltip } from 'radix-ui';
import { useState } from 'react';
import Select from './components/Select';
import Switch from './components/Switch';

export default function SettingsPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, setSettings } = useSettings();
  const { resolvedTheme, setTheme } = useTheme();

  const settingList = [
    {
      category: 'Sound',
      settings: [
        {
          label: 'Clock sound',
          component: <Switch checked={settings.clockSound} onCheckedChange={(checked) => setSettings({ clockSound: checked })} />,
        },
        {
          label: 'Interaction sound',
          component: (
            <Switch checked={settings.interactionSound} onCheckedChange={(checked) => setSettings({ interactionSound: checked })} />
          ),
        },
        {
          label: 'Background sound',
          component: <Switch checked={settings.backgroundSound} onCheckedChange={(checked) => setSettings({ backgroundSound: checked })} />,
        },
      ],
      information: 'Sound effects are only activated after user clicks on the page due to browser restrictions.',
    },
    {
      category: 'Display',
      settings: [
        {
          label: 'Theme',
          component: (
            <Select
              value={resolvedTheme}
              options={[
                { label: 'Dark', value: 'dark' },
                { label: 'Light', value: 'light' },
                // { label: 'Custom', value: 'custom' },
              ]}
              className=""
              onValueChange={setTheme}
            />
          ),
        },
        {
          label: 'Font size',
          component: (
            <Select
              value={settings.fontSize.toString()}
              options={[
                { label: 'Small', value: '14' },
                { label: 'Default', value: '16' },
                { label: 'Large', value: '18' },
                { label: 'Extra Large', value: '20' },
              ]}
              className=""
              onValueChange={(value) => setSettings({ fontSize: Number.parseInt(value) })}
            />
          ),
        },
        {
          label: 'Grayscale',
          component: <Switch checked={settings.grayscale} onCheckedChange={(checked) => setSettings({ grayscale: checked })} />,
        },
        {
          label: 'Paper texture',
          component: <Switch checked={settings.paperTexture} onCheckedChange={(checked) => setSettings({ paperTexture: checked })} />,
        },
      ],
    },
  ];

  return (
    <motion.div
      className={
        'fixed right-5 bottom-5 z-5 overflow-hidden rounded-[1.25rem] border border-theme-200/75 bg-theme-100 lg:right-10 lg:bottom-10'
      }
      initial={{ width: '2.5rem', height: '2.5rem' }}
      animate={{ width: isOpen ? '20rem' : '2.5rem', height: isOpen ? '20rem' : '2.5rem', borderRadius: isOpen ? '0.75rem' : '1.25rem' }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
    >
      {isOpen ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="h-full w-full">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute top-1 right-1 z-5 rounded-full p-1 duration-150 hover:bg-theme-200"
          >
            <XMarkIcon className="w-4 text-theme-600" />
          </button>
          <ScrollArea.Root className="h-full overflow-hidden">
            <ScrollArea.Viewport className="h-full">
              <div className="flex flex-col gap-5 p-2.5">
                {settingList.map(({ category, settings, information }) => (
                  <div key={category} className="text-sm text-theme-800">
                    <div className="mb-1.5 flex items-center gap-1">
                      <p className="font-semibold">{category}</p>
                      {information && (
                        <Tooltip.Root>
                          <Tooltip.Trigger>
                            <InformationCircleIcon className="w-3.5 text-theme-600" />
                          </Tooltip.Trigger>
                          <Tooltip.Portal>
                            <Tooltip.Content
                              side="bottom"
                              className="after:a-4 after:-translate-y-2 after:-translate-x-2 relative z-5 mt-2 w-80 rounded-lg bg-theme-200 p-2.5 text-sm after:absolute after:top-0 after:left-1/2 after:block after:rotate-45 after:rounded after:bg-theme-200"
                            >
                              {information}
                            </Tooltip.Content>
                          </Tooltip.Portal>
                        </Tooltip.Root>
                      )}
                    </div>
                    <div className="divide-y divide-theme-200 rounded-lg bg-theme-200/50 px-2">
                      {settings.map(({ label, component }) => (
                        <div key={label} className="flex items-center justify-between py-2">
                          <p>{label}</p>
                          {component}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar orientation="vertical" />
          </ScrollArea.Root>
        </motion.div>
      ) : (
        <button type="button" aria-label="Settings" onClick={() => setIsOpen(true)} className="a-full flex flex-center text-theme-600">
          <Cog8ToothIcon className="w-6" />
        </button>
      )}
    </motion.div>
  );
}
