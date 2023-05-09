'use client';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLElement>;

export default function Window({ title, children, className, ...rest }: Props) {
  return (
    <div className='bg-white/5 backdrop-blur group rounded-lg shadow-xl border border-white/10 hover:scale-105 duration-250'>
      <div className='p-2 text-center text-xs font-medium tracking-wide border-b border-white/5'>
        <p>{title}</p>
      </div>
      <ScrollArea.Root type='always' className='overflow-hidden'>
        <ScrollArea.Viewport className='w-full max-h-[24rem]'>
          <div {...rest} className={`grid ${className}`}>
            {children}
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="select-none touch-none p-0.5 w-3 duration-250 opacity-0 group-hover:opacity-100"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="bg-white/10 rounded-md" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  );
}
