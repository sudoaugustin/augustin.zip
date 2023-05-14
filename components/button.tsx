import { VariantProps, cva } from 'class-variance-authority';
import { ProgressBar } from 'icons/loading';
import Link, { LinkProps } from 'next/link';
import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type Props = VariantProps<typeof classes> &
  (LinkProps | ButtonProps) & {
    icon?: ReactNode;
    label: ReactNode;
    inline?: boolean;
    className?: string;
  };

const classes = cva('flex-center rounded-lg cursor-pointer transition duration-250 ring-1 backdrop-blur hover:box-shine', {
  variants: {
    size: {
      sm: 'text-xs px-4 h-8 [&>p]:space-x-0.5',
      md: 'text-base px-6 h-10 [&>p]:space-x-1.5',
      lg: 'text-lg px-8 h-12 [&>p]:space-x-2',
    },
    width: { fill: 'flex w-full', inline: 'inline-flex' },
    state: { loading: 'pointer-events-none', disable: 'pointer-events-none bg-opacity-50' },
    intent: {
      link: '',
      solid: '',
      danger: '',
      outline: 'text-violet-100 ring-inset ring-violet-400/75 bg-violet-800/10 bg-gradient-to-b from-violet-600/5 to-indigo-600/20',
    },
  },
});

export default function Button({ icon, size = 'sm', state, label, inline = true, intent = 'outline', className, ...rest }: Props) {
  const props = {
    ...rest,
    children:
      state === 'loading' ? (
        <ProgressBar className="!absolute duration-150 rounded-md" />
      ) : (
        <>
          {icon && <i className='[&>svg]:w-[1em]'>{icon}</i>}
          <span className={`select-none leading-none ${intent !== 'link' && 'font-medium'}`}>{label}</span>
        </>
      ),
    className: classes({ size, state, width: inline ? 'inline' : 'fill', intent, className }),
  };

  return props.href ? <Link {...props} /> : <button type='button' {...(props as ButtonProps)} />;
}

export type { Props as ButtonProps };
