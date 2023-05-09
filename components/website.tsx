import Image from './image';
import { cssvars } from 'utils';

type Props = { color: string; href: string; image: string; timeline: string; className?: string };

export default function Browser({ color, href, image, timeline, className }: Props) {
  return (
    <a rel="noreferrer" href={`https://${href}`} style={cssvars({ color })} target='_blank' className={`w-full h-full group ${className}`}>
      <Image
        src={`/images/web-projects/${image}`}
        size={[2880, 1770]}
        className='bg-black/10 ring-4 ring-slate-200/20 relative rounded-md overflow-hidden group-hover:ring-transparent group-hover:shadow-neon'
      />
      <p className='text-xs mt-4 font-semibold flex items-baseline justify-between'>
        <span className='text-shine '>{href}</span>
        <span className='text-[0.625rem] text-slate-100/75 uppercase'>{timeline}</span>
      </p>
    </a>
  );
}
