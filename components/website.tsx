import Image, { ImageProps } from './image';

type Props = Omit<ImageProps, 'src'> & { href: string; image: string; timeline: string; className?: string };

export default function Browser({ href, image, timeline, className }: Props) {
  return (
    <a rel="noreferrer" href={`https://${href}`} target='_blank' className={`w-full h-full group ${className}`}>
      <Image
        src={`/images/web-projects/${image}`}
        size={[2880, 1770]}
        priority
        className='ring-4 ring-white/[0.075] rounded-md group-hover:ring-0 group-hover:scale-[1.025]'
      />

      <p className='text-xs mt-4 font-semibold flex items-baseline justify-between'>
        <span className='text-shine '>{href}</span>
        <span className='text-[0.625rem] text-violet-200/75 uppercase'>{timeline}</span>
      </p>
    </a>
  );
}
