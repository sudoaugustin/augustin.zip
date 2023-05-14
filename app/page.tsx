import Button from 'components/button';
import Launcher from 'components/launcher';
import Website from 'components/website';
import Window from 'components/window';
import { Favecon, Pascal, Renex, Tailpile, TailwindTranspiler, VSLook } from 'icons/dev-projects';
import {
  ESBuild,
  Express,
  FramerMotion,
  Jest,
  Laravel,
  Mongo,
  Nanostore,
  NextJS,
  NodeJS,
  RadixUI,
  Recoil,
  Redux,
  Rome,
  SASS,
  TailwindCSS,
  Typescript,
} from 'icons/tech-stacks';
import { Metadata } from 'next';

const contacts = [
  { name: 'Github', href: 'https://github.com/sudoaugustin' },
  { name: 'Twitter', href: 'https://twitter.com/sudoaugustin' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/sudoaugustin/' },
  { name: 'sudoaugustin@gmail.com', href: 'mailto:sudoaugustin@gmail.com' },
];

const techstacks = [
  {
    name: 'Favourites',
    items: [
      { name: 'NodeJS', link: 'https://nodejs.org/', icon: <NodeJS /> },
      { name: 'Typescript', link: 'https://www.typescriptlang.org/', icon: <Typescript /> },
      { name: 'NextJS', link: 'https://nextjs.org/', icon: <NextJS /> },
      { name: 'Tailwind', link: 'https://tailwindcss.com/', icon: <TailwindCSS /> },
      { name: 'Nanostore', link: 'https://github.com/nanostores', icon: <Nanostore /> },
      { name: 'Radix UI', link: 'https://www.radix-ui.com/', icon: <RadixUI /> },
      { name: 'Framer Motion', link: 'https://www.framer.com/motion/', icon: <FramerMotion /> },
      { name: 'ESBuild', link: 'https://esbuild.github.io/', icon: <ESBuild /> },
      { name: 'Rome', link: 'https://rome.tools/', icon: <Rome /> },
      { name: 'Jest', link: 'https://jestjs.io/', icon: <Jest /> },
      { name: 'MongoDB', link: 'https://www.mongodb.com/', icon: <Mongo /> },
    ],
  },
  {
    name: 'Archives',
    items: [
      { name: 'SCSS', link: 'https://sass-lang.com/', icon: <SASS /> },
      { name: 'Recoil', link: 'https://recoiljs.org/', icon: <Recoil /> },
      { name: 'Redux', link: 'https://redux.js.org/', icon: <Redux /> },
      { name: 'Express', link: 'https://expressjs.com/', icon: <Express /> },
      { name: 'Laravel', link: 'https://laravel.com/', icon: <Laravel /> },
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
    name: 'Renex',
    icon: <Renex />,
    link: 'https://www.npmjs.com/package/renex',
  },
  {
    name: 'Favecon',
    icon: <Favecon />,
    link: 'https://www.npmjs.com/package/favecon',
  },
  {
    name: 'Tailwind Transpiler',
    icon: <TailwindTranspiler />,
    link: 'https://marketplace.visualstudio.com/items?itemName=sudoaugustin.tailwindcss-transpiler',
  },
  {
    name: 'Loading...',
    icon: <Pascal />,
  },
];

const cdgprojects = [
  {
    href: 'codigo.co',
    image: 'codigo.png',
    timeline: '2022 - Present • codigo',
  },
  {
    href: 'neuroglee.com',
    image: 'neuroglee.png',
    timeline: '2022 - Present • codigo',
  },
  {
    href: 'trifectasingapore.com',
    image: 'trifectasingapore.png',
    timeline: '2023 • codigo',
  },
  {
    href: 'boulderm.com',
    image: 'boulderm.png',
    timeline: '2022 • codigo',
  },
];

export default function AppPage() {
  return (
    <main className='text-sm px-5 py-10 lg:px-10 lg:py-20 bg-boxes min-h-screen text-violet-100 bg-black after:fixed after:bg-gradient-to-br after:from-violet-950/50 after:to-indigo-950/50 after:inset-0'>
      <div className='relative z-10 max-w-screen-xl mx-auto space-y-10 lg:space-y-20'>
        <section className='sm:flex sm:flex-row-reverse sm:justify-between'>
          <div className='flex justify-end sm:mt-1.5 mb-10 animate-in duration-500 fade-in-5 slide-in-from-top-20 motion-safe:slide-in-from-right-20'>
            <Button label="Articles" className='' />
          </div>
          <div className='animate-in duration-500 fade-in-5 slide-in-from-top-20 motion-safe:slide-in-from-left-20'>
            <h1 className='max-w-md lg:max-w-lg leading-loose [&>a]:text-shine [&>a]:underline [&>a]:underline-offset-[5px] [&>a]:decoration-wavy [&>a]:whitespace-nowrap'>
              I'm Augustin, a fullstack developer based in Yangon. I work at <a href="https://www.codigo.co">Codigo</a> as a front-end
              developer during day and mini dev projects at night. I won Technical Award at{' '}
              <a href='https://witaward.com/result/2019#section3'>WIT 2019</a>.
            </h1>
            <ul className='flex mt-5'>
              {contacts.map(({ name, href }, i) => (
                <li key={name}>
                  <a
                    rel="noreferrer"
                    href={href}
                    target='_blank'
                    className='text-violet-100/75 hover:text-white hover:text-shine active:text-shine font-semibold text-xs'
                  >
                    {name}
                  </a>
                  {i !== contacts.length - 1 && <span className='px-1.5 md:px-2.5 text-violet-200/50'>•</span>}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className='lg:flex lg:flex-row lg:items-start'>
          <div className='inline-grid gap-x-5 gap-y-10 max-lg:mb-10 sm:grid-cols-2 md:gap-10 lg:grid-cols-1 lg:mr-10 items-start animate-in duration-500 fade-in-5 slide-in-from-bottom-20 motion-safe:slide-in-from-left-20'>
            <Window title='Dev Projects' className='gap-x-2.5 gap-y-10 py-10 grid-cols-3'>
              {devprojects.map((project) => (
                <Launcher key={project.name} {...project} />
              ))}
            </Window>
            <Window title='Tech Stacks' className='px-2.5 py-5 space-y-5'>
              {techstacks.map(({ name, items }) => (
                <div key={name}>
                  <p className='text-violet-200/75 text-[0.625rem] uppercase mb-2.5 ml-2.5 font-semibold'>{name}</p>
                  <div className='grid gap-5 grid-cols-4'>
                    {items.map((item) => (
                      <Launcher key={item.name} {...item} />
                    ))}
                  </div>
                </div>
              ))}
            </Window>
          </div>
          <div className='grid gap-x-5 gap-y-10 flex-1 sm:grid-cols-2 md:gap-x-10 animate-in duration-500 fade-in-5 slide-in-from-bottom-20 motion-safe:slide-in-from-right-20'>
            {cdgprojects.map((website) => (
              <Website key={website.href} sizes={{ sm: '50vw' }} {...website} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Augustin Joseph - Full Stack developer',
  description: 'A fullstack developer based in Yangon. Work at Codigo as a front-end developer and won Technical Award at WIT 2019',
};
