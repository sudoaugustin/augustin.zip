import {
  ArrowDownOnSquareIcon,
  ArrowUpRightIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  SparklesIcon,
  SpeakerWaveIcon,
} from '@heroicons/react/16/solid';
import projects from 'data/projects.json';
import websites from 'data/websites.json';
import type { Metadata } from 'next';
import Link from 'next/link';
import { cssvars } from 'utils';
import Image from './components/Image';
import LinkButton from './components/LinkButton';
import Showcase from './components/Showcase';
import Profile from './say-hi.png';
import { GithubIcon, XIcon } from './components/BrandIcons';
import Clock from './components/Clock';

const connectLinks = [
  { icon: <EnvelopeIcon className="w-4 lg:w-[1.125rem]" />, text: 'Mail', href: 'mailto:sudoaugustin@gmail.com' },
  { icon: <GithubIcon className="w-3.5 lg:w-4" />, text: 'GitHub', href: 'https://github.com/sudoaugustin' },
  { icon: <XIcon className="w-3 lg:w-3.5" />, text: 'Twitter', href: 'https://x.com/sudoaugustin' },
  { icon: <DocumentTextIcon className="w-4 lg:w-[1.125rem]" />, text: 'Resume', href: '/resume.pdf' },
  // { icon: <SpeakerWaveIcon className="w-4 lg:w-[1.125rem]" />, text: 'Audio resume', href: '/audio-resume.pdf' },
];

export default function AppPage() {
  // const writings = source.getPages().filter(({ file }) => file.dirname !== 'projects');

  return (
    <main className="space-y-10 lg:space-y-16">
      <header className="flex items-center justify-between">
        <div className="flex flex-col items-start justify-between">
          <div className="flex items-center space-x-2.5">
            <Image
              src={Profile}
              alt="augustin's avatar"
              fetchPriority="high"
              className="a-12 lg:a-16 rounded-full bg-gradient-to-b from-theme-200 to-theme-100 ring-1 ring-theme-100"
            />
            <div>
              <h1 className="font-semibold">Augustin</h1>
              <p className="mt-1">Software Engineer</p>
            </div>
          </div>
          {/* <LinkButton
            className="flex items-center space-x-1 rounded-full bg-theme-200 px-2 py-0.5 text-theme-600 duration-500 hover:bg-theme-300 hover:text-theme-800 lg:mt-4 lg:space-x-1.5 lg:px-3 lg:py-1"
          >
            <SparklesIcon className="w-3 lg:w-4" />
            <p>Check My Fit with AI</p>
          </LinkButton> */}
        </div>
        <div className="flex flex-col items-center">
          <Clock />
          <p className="mt-1 font-medium text-theme-400 text-xs">UTC + 6:30</p>
        </div>
      </header>

      <section>
        <p className="mb-2.5 font-semibold lg:mb-5">About me</p>
        <h2 className="mb-2 text-theme-800 lg:mb-4">
          I’m a software engineer who loves developer experience and design engineering. I started in 2017 as a computer science student. In
          2020, I launched a VSCode extension that has over 78K installs and I’ve been hooked on creating ever since. These days, I build
          everything from web and mobile apps to browser extensions and open-source libraries.
        </h2>
        <ul className="-m-1 flex flex-wrap items-center">
          {connectLinks.map(({ icon, text, href }) => (
            <li key={href} className="m-1">
              <LinkButton href={href} className="flex h-7 items-center space-x-1.5">
                {icon}
                <span>{text}</span>
              </LinkButton>
            </li>
          ))}
        </ul>
      </section>

      <Showcase title="Websites">
        {websites.map(({ name, image }, index) => (
          <div
            key={name}
            style={cssvars({ delay: `${(index + 1) * 200}ms` })}
            className="motion-delay-[--delay] motion-preset-fade relative w-80 lg:w-[21.25rem]"
          >
            <Image
              src={image}
              alt=""
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 35vw, 50vw"
              width={1080}
              height={810}
              fetchPriority={index < 3 ? 'high' : 'auto'}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-theme-200/50 bg-theme-100 duration-500 hover:border-theme-200"
            />
            <Link
              href={`https://www.${name}`}
              target="_blank"
              className="group mt-1 inline-flex space-x-0.5 text-theme-600 duration-500 hover:text-theme-800 lg:mt-2"
            >
              <span>{name}</span>
              <ArrowUpRightIcon className="group-hover:-translate-y-0.5 w-4 duration-500 group-hover:translate-x-0.5" />
            </Link>
          </div>
        ))}
      </Showcase>

      {projects.map(({ title, items }) => (
        <Showcase key={title} title={title}>
          {items.map(({ logo, name, links, description, ...rest }, index) => (
            <div
              key={name}
              style={cssvars({ delay: `${(index + 1) * 200}ms` })}
              className="motion-delay-[--delay] motion-preset-fade w-80 rounded-lg border border-theme-200/75 bg-theme-100 p-4 duration-500 hover:border-theme-200 lg:w-[21.25rem]"
            >
              <Image src={logo} alt="" width={64} height={64} className="w-12 rounded-lg lg:w-16" />
              <div className="relative z-5 mt-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-theme-800">{name}</h3>
                  {'downloads' in rest && (
                    <p className="mb-0.5 flex items-center text-sm text-theme-600">
                      <ArrowDownOnSquareIcon className="w-4" />
                      <span className="mt-1">{rest.downloads}</span>
                    </p>
                  )}
                </div>
                <p className="mt-1 mb-3 text-theme-600">{description}</p>
                <div className="space-x-2.5">
                  {links.map(({ text, href }) => (
                    <LinkButton key={text} href={href}>
                      {text}
                    </LinkButton>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </Showcase>
      ))}

      {/* <Showcase title="UI Experiments" className="!space-x-5 lg:!space-x-10 mb-5"></Showcase> */}
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Augustin Joseph',
  description: 'A software engineer based in Yangon, Myanmar, passionate about developer experience and design engineering.',
};
