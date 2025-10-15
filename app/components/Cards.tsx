import type { ReactNode } from 'react';

type Props = {
  items: { href: string; icon?: ReactNode; label: string; description: string }[];
};

export default function Cards({ items }: Props) {
  return (
    <ul className="list-none px-0 max-lg:space-y-2 lg:flex lg:space-x-4">
      {items.map(({ icon, label, href, description }) => (
        <li key={label} className="flex-1 px-0">
          <a href={href} className="not-prose flex items-center rounded-lg border border-theme-200 bg-theme-100 p-4">
            <i className="a-10 flex flex-center rounded-md bg-theme-200/75">{icon}</i>
            <span className="ml-2 flex flex-col">
              <span className="font-bold text-base">{label}</span>
              <span className="text-sm">{description}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
