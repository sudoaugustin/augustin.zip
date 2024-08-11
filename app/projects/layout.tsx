import Link from 'next/link';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function ProjectsLayout({ children }: Props) {
  return (
    <main className="prose prose-sm prose-invert prose-headings:font-medium max-w-none">
      <Link href="/" className="float-right mt-1.5 inline-block">
        Go Home
      </Link>
      {children}
    </main>
  );
}
