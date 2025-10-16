'use client';

import * as ScrollArea from '@radix-ui/react-scroll-area';
import type { HTMLAttributes } from 'react';

export default function Showcase({ title, children, className, ...rest }: HTMLAttributes<HTMLElement>) {
  return (
    <section>
      <ScrollArea.Root type="auto">
        <div className="mb-2.5 flex items-end justify-between lg:mb-5">
          <p className="font-semibold">{title}</p>
          <ScrollArea.Scrollbar orientation="horizontal" className="!relative mb-1 h-1.5 w-16 rounded bg-theme-200 duration-500">
            <ScrollArea.Thumb className="!h-1.5 motion-preset-fade cursor-pointer rounded bg-theme-400 transition-colors duration-500 hover:bg-theme-600" />
          </ScrollArea.Scrollbar>
        </div>
        <ScrollArea.Viewport className="max-lg:-mx-5 max-lg:px-5">
          <div {...rest} className={`flex space-x-4 [&>*]:flex-shrink-0 ${className}`}>
            {children}
          </div>
        </ScrollArea.Viewport>
      </ScrollArea.Root>
    </section>
  );
}
