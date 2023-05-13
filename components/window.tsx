'use client';
import { HTMLAttributes, ReactHTML, createElement } from 'react';
import ScrollArea from './scrollarea';

type Props = HTMLAttributes<HTMLElement> & { as?: keyof ReactHTML };

export default function Window({ as = 'div', title, children, className, ...rest }: Props) {
  return (
    <div className="w-full max-w-[22rem] bg-white/[0.015] bg-gradient-to-tr from-violet-500/5 to-indigo-500/10 hover:bg-gradient-to-br backdrop-blur-lg group/window rounded-lg ring-1 ring-inset ring-white/10 duration-500 hover:scale-105 hover:ring-white/20">
      <div className='p-2 text-center text-xs font-medium text-violet-100 tracking-wide border-b border-white/5 group-hover/window:border-white/10'>
        <p>{title}</p>
      </div>
      <ScrollArea className='w-full max-h-[25rem] sm:max-h-[17.75rem] lg:max-h-[25rem]'>
        {createElement(as, { ...rest, className: `grid ${className}` }, children)}
      </ScrollArea>
    </div>
  );
}
