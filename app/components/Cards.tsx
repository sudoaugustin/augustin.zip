import type { ReactNode } from 'react';

type Props = {
  items: { href: string; icon?: ReactNode; label: string; description: string }[];
};

export default function Cards({ items }: Props) {
  return (
    <ul className="lg:flex max-lg:space-y-2 lg:space-x-4 list-none px-0">
      {items.map(({ icon, label, href, description }) => (
        <li key={label} className="flex-1 px-0">
          <a
            href={href}
            className="flex items-center not-prose p-4 rounded-lg bg-zinc-100 duration-500 border border-zinc-200/50 dark:bg-zinc-900 dark:border-zinc-800/50"
          >
            <i className="flex flex-center a-10 rounded-md bg-zinc-200/75 dark:bg-zinc-800/75 grayscale duration-500">{icon}</i>
            <span className="flex flex-col ml-2">
              <span className="text-base font-bold">{label}</span>
              <span className="text-sm">{description}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
