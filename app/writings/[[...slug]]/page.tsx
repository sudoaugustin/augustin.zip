import type { PageProps } from '.next/types/app/writings/[[...slug]]/page';
import { source } from 'app/source';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: { slug?: string[] };
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = source.getPage(slug);

  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <article className="paging prose prose-lg leading-normal prose-zinc prose-h1:mb-10 prose-h1:text-2xl prose-img:rounded-lg prose-img:border prose-img:border-zinc-200 dark:prose-img:border-zinc-800 prose-headings:text-lg prose-headings:font-bold dark:prose-invert">
      <MDX components={{ ...defaultMdxComponents, Tab, Tabs }} />
    </article>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  // console.log("IMAGE",page.data.image)

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: page.slugs.includes("ultra-power-saving-mode") ? {
      images: [
        {
          url: "/images/writings/ultra-battery-banner.png",
        },
      ],
    } : undefined,
  } satisfies Metadata;
}

export async function generateStaticParams() {
  return source.generateParams();
}
