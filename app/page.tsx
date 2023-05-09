import Launcher from 'components/launcher';
import Website from 'components/website';
import Window from 'components/window';
import { Favecon, Pascal, Renex, Tailpile, TailwindTranspiler, VSLook } from 'icons/dev-projects';
import {
  ESBuild,
  Express,
  FramerMotion,
  Nanostore,
  NextJS,
  NodeJS,
  RadixUI,
  Recoil,
  Rome,
  SASS,
  TailwindCSS,
  Typescript,
} from 'icons/tech-stacks';
import { Metadata } from 'next';

const contacts = [
  { name: 'Github', link: 'https://github.com/sudoaugustin' },
  { name: 'Twitter', link: 'https://twitter.com/sudoaugustin' },
  { name: 'LinkedIn', link: 'https://www.linkedin.com/in/sudoaugustin/' },
  { name: 'sudoaugustin@gmail.com', link: 'mailto:sudoaugustin@gmail.com' },
];

const techstacks = [
  {
    name: 'Favourites',
    items: [
      { name: 'NodeJS', link: 'https://nodejs.org/', icon: <NodeJS /> },
      { name: 'Typescript', link: 'https://www.typescriptlang.org/', icon: <Typescript /> },
      { name: 'ESBuild', link: 'https://esbuild.github.io/', icon: <ESBuild /> },
      { name: 'Rome', link: 'https://rome.tools/', icon: <Rome /> },
      { name: 'NextJS', link: 'https://nextjs.org/', icon: <NextJS /> },
      { name: 'Nanostore', link: 'https://github.com/nanostores', icon: <Nanostore /> },
      { name: 'Radix UI', link: 'https://www.radix-ui.com/', icon: <RadixUI /> },
      { name: 'Framer Motion', link: 'https://www.framer.com/motion/', icon: <FramerMotion /> },
      { name: 'Tailwind', link: 'https://tailwindcss.com/', icon: <TailwindCSS /> },
    ],
  },
  {
    name: 'Archives',
    items: [
      { name: 'SCSS', link: 'https://sass-lang.com/', icon: <SASS /> },
      { name: 'Recoil', link: 'https://recoiljs.org/', icon: <Recoil /> },
      { name: 'Express', link: 'https://expressjs.com/', icon: <Express /> },
    ],
  },
];

const devprojects = [
  {
    name: 'VSLook',
    icon: <VSLook />,
    link: 'https://marketplace.visualstudio.com/items?itemName=sudoaugustin.vslook',
  },
  {
    name: 'Tailpile',
    icon: <Tailpile />,
    link: 'https://marketplace.visualstudio.com/items?itemName=sudoaugustin.tailpile',
  },
  {
    name: 'TailwindCSS Transpiler',
    icon: <TailwindTranspiler />,
    link: 'https://marketplace.visualstudio.com/items?itemName=sudoaugustin.tailwindcss-transpiler',
  },
  {
    name: 'Favecon',
    icon: <Favecon />,
    link: 'https://www.npmjs.com/package/favecon',
  },
  {
    name: 'Renex',
    icon: <Renex />,
    link: 'https://www.npmjs.com/package/renex',
  },
  {
    name: 'Loading...',
    icon: <Pascal />,
  },
];

const cdgprojects = [
  {
    href: 'codigo.co',
    color: '#d5333e',
    image: 'codigo.png',
    timeline: '2022 - Present • codigo',
  },
  {
    href: 'neuroglee.com',
    color: '#2563eb',
    image: 'neuroglee.png',
    timeline: '2022 - Present • codigo',
  },
  {
    href: 'trifectasingapore.com',
    color: '#1d5cb7', // #e2e500
    image: 'trifectasingapore.png',
    timeline: '2023 • codigo',
  },
  {
    href: 'boulderm.com',
    color: '#ee4266',
    image: 'boulderm.png',
    timeline: '2022 • codigo',
  },
];

export default function AppPage() {
  return (
    <main className='p-20 animate-in fade-in-0 slide-in-from-bottom-4 duration-400 [&>section]:relative [&>section]:z-10 text-white bg-boxes bg-black min-h-screen before:fixed before:bg-gradient-to-br before:from-purple-950/40 before:via-fuchsia-950/40 before:to-violet-950/40 before:inset-0'>
      <section>
        <h1 className='max-w-lg leading-relaxed'>
          I'm Augustin, a fullstack developer based in Yangon. I work at{' '}
          <a
            href="https://www.codigo.co"
            className='text-shine hover:text-shine-md underline underline-offset-2 decoration-wavy font-medium'
          >
            Codigo
          </a>{' '}
          as a front-end developer during day and mini dev projects at night. I won Technical Award at{' '}
          <a
            href='https://witaward.com/result/2019#section3'
            className='text-shine hover:text-shine-md underline underline-offset-2 decoration-wavy font-medium'
          >
            WIT 2019
          </a>
          .
        </h1>
      </section>
      <section className='py-20 flex space-x-10 items-start'>
        <div className='space-y-10 grid-cols-3 w-[22rem]'>
          <Window title='Dev Projects' className='gap-x-2.5 gap-y-10 py-10 grid-cols-3'>
            {devprojects.map((project) => (
              <Launcher key={project.name} {...project} />
            ))}
          </Window>
          <Window title='Tech Stacks' className='p-1'>
            {techstacks.map(({ name, items }) => (
              <div key={name} className='p-2.5'>
                <h4 className='text-slate-400 text-[0.625rem] uppercase mb-2.5 font-semibold'>{name}</h4>
                <div className='grid gap-x-10 gap-y-5 grid-cols-4'>
                  {items.map((item) => (
                    <Launcher key={item.name} {...item} />
                  ))}
                </div>
              </div>
            ))}
          </Window>
        </div>
        <div className='grid grid-cols-2 flex-1 gap-10'>
          {cdgprojects.map((website) => (
            <Website key={website.href} {...website} />
          ))}
        </div>
      </section>
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Augustin Joseph - Full Stack developer',
  description: 'A fullstack developer based in Yangon. Work at Codigo as a front-end developer and won Technical Award at WIT 2019',
};
