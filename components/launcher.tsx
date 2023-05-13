import { ReactNode, createElement } from 'react';

type Props = {
  icon: ReactNode;
  name: string;
  link?: string;
};

export default function Launcher({ name, icon, link }: Props) {
  const ele = link ? 'a' : 'button';
  const props = link ? { rel: 'noreferrer', target: '_blank', href: link } : {};
  return createElement(
    ele,
    { ...props, className: `duration-150 group/launcher flex flex-col items-center ${link ? 'cursor-pointer' : 'cursor-wait'}` },
    <>
      <i className='bg-white/10 object-center rounded-lg overflow-hidden [&>svg]:w-12 mb-3.5'>{icon}</i>
      <p className="text-center whitespace-nowrap text-xs/none font-semibold text-shine rounded-md py-1 px-2 duration-150 group-hover/launcher:bg-white group-hover/launcher:shadow-shine group-hover/launcher:text-shine-none group-hover/launcher:text-violet-600">
        {name}
      </p>
    </>,
  );
}
