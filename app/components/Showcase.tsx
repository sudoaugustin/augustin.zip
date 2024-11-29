import * as ScrollArea from '@radix-ui/react-scroll-area';
import type { HTMLAttributes } from 'react';

export default function Showcase({ title, children, className, ...rest }: HTMLAttributes<HTMLElement>) {
  return (
    <section>
      <ScrollArea.Root type="auto">
        <div className="flex items-end justify-between mb-4 lg:mb-6">
          <h2 className="leading-none">{title}</h2>
          <ScrollArea.Scrollbar
            orientation="horizontal"
            className="bg-zinc-200 dark:bg-zinc-800 w-16 h-1.5 mb-0.5 rounded !relative duration-500"
          >
            <ScrollArea.Thumb className="bg-zinc-400 hover:bg-zinc-600 dark:bg-zinc-600 dark:hover:bg-zinc-400 transition-colors duration-500 !h-1.5 rounded cursor-pointer motion-preset-fade" />
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
