import { ReactNode } from 'react';

type Props = {
  icon: ReactNode;
  name: string;
  link?: string;
};

export default function Launcher({ name, icon, link }: Props) {
  return (
    <a
      href={link}
      rel="noreferrer"
      target="_blank"
      className={`text-shine hover:text-shine-md duration-150 flex flex-col items-center ${link ? 'cursor-pointer' : 'cursor-wait'}`}
    >
      <i className='bg-gray-500/25 object-center rounded-lg overflow-hidden [&>svg]:w-12 mb-3.5'>{icon}</i>
      <p className="text-center text-xs font-semibold">{name}</p>
    </a>
  );
}
