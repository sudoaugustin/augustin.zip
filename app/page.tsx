import { ArrowDownOnSquareIcon, ArrowUpRightIcon } from '@heroicons/react/16/solid';
import projects from 'data/projects.json';
import websites from 'data/websites.json';
import type { Metadata } from 'next';
import Link from 'next/link';
import { cssvars } from 'utils';
import { GithubIcon, GmailIcon, LinkedInIcon, XIcon } from './components/BrandIcons';
import Image from './components/Image';
import LinkButton from './components/LinkButton';
import Showcase from './components/Showcase';
import Profile from './say-hi.png';

const achievements = [
  {
    year: '2019',
    href: 'https://witaward.com/result/2019',
    image: '/images/achievements/technology-grand-prize.png',
    title: 'Technical Award',
    place: 'Web Innovation Technology',
  },
  {
    year: '2023',
    href: 'https://www.linkedin.com/posts/codigo-pte-ltd_hey-there-awesome-myanmar-codigo-rezeve-activity-7146663689310396416-zNu8?utm_source=share&utm_medium=member_desktop',
    image: '/images/achievements/codigo-2023-employee.png',
    title: 'Employee Award',
    place: 'Codigo Company Limited',
  },
];

const connectLinks = [
  { icon: <XIcon className="w-4 lg:w-6" />, href: 'https://x.com/sudoaugustin' },
  { icon: <GithubIcon className="w-4 lg:w-6" />, href: 'https://github.com/sudoaugustin' },
  { icon: <LinkedInIcon className="w-4 lg:w-6" />, href: 'https://www.linkedin.com/in/sudoaugustin/' },
  { icon: <GmailIcon className="w-4 lg:w-6" />, href: 'mailto:sudoaugustin@gmail.com' },
];

export default function AppPage() {
  // const writings = source.getPages().filter(({ file }) => file.dirname !== 'projects');

  return (
    <main className="paging space-y-10 lg:space-y-16 prose-headings:font-bold">
      <header className="flex items-end justify-between">
        <div className="flex items-center space-x-2.5">
          <Image
            src={Profile}
            alt="augustin's face"
            className="a-12 xl:a-14 rounded-full ring-1 ring-zinc-100 dark:ring-zinc-900 bg-gradient-to-b from-zinc-200 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900"
          />
          <div>
            <h1>Augustin Joseph</h1>
            <p>Software Engineer</p>
          </div>
        </div>
        <div>
          {/* <ul className="flex items-center justify-end space-x-4 mb-0">
            {navLinks.map(({ text, href }) => (
              <li key={href} className="flex items-center space-x-0.5 text-zinc-100 leading-none">
                <Link href={href}>{text}</Link>
              </li>
            ))}
          </ul> */}
          <ul className="flex items-center justify-end space-x-3 mb-1.5 lg:mb-2">
            {connectLinks.map(({ icon, href }) => (
              <li key={href}>
                <Link href={href} className="duration-[250ms] hover:text-white">
                  {icon}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <section>
        <h2 className="mb-2 lg:mb-4">About me</h2>
        <p className="text-zinc-800 dark:text-zinc-200">
          I’m a dedicated engineer from Myanmar, passionate about developer experience engineering and design engineering. I'm working as a
          Senior Frontend Engineer at Codigo. I'm also studying B.Sc(Hons) Computing at University of Greenwich.
        </p>
      </section>
      {/* <section>
        <h2 className="mb-2 lg:mb-4">Writings</h2>
        <div className="">
          {writings.map(({ url, data }) => (
            <Link
              key={url}
              href={url}
              className="text-zinc-800 hover:text-zinc-950 dark:text-zinc-200 hover:dark:text-zinc-50 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 hover:rounded-lg block py-2 px-4 -mx-4 duration-[250ms]"
            >
              <span className="!font-medium">{data.title}</span> <br />
              <span className="text-sm lg:text-base">{data.description}</span>
            </Link>
          ))}
        </div>
      </section> */}

      <Showcase title="Websites">
        {websites.map(({ name, image }, index) => (
          <div
            key={name}
            style={cssvars({ delay: `${(index + 1) * 200}ms` })}
            className="w-80 lg:w-[21.25rem] relative motion-delay-[--delay] motion-preset-fade"
          >
            <div className="w-full aspect-[4/3] bg-zinc-100 dark:bg-zinc-900 relative rounded-lg overflow-hidden duration-500">
              <Image src={image} alt="" fill />
            </div>
            <Link
              href={`https://www.${name}`}
              target="_blank"
              className="group inline-flex text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 font-[450] mt-1 lg:mt-2 space-x-0.5 duration-500"
            >
              <span>{name}</span>
              <ArrowUpRightIcon className="w-4 duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
              className="w-80 lg:w-[21.25rem] p-4 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 hover:border-zinc-200 dark:hover:border-zinc-800 rounded-lg motion-delay-[--delay] motion-preset-fade duration-500"
            >
              <Image src={logo} alt="" width={64} height={64} className="rounded-lg" />
              <div className="relative z-5 mt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-zinc-800 dark:text-zinc-200">{name}</h3>
                  {'downloads' in rest && (
                    <p className="flex items-center text-sm text-zinc-600 mb-0.5">
                      <ArrowDownOnSquareIcon className="w-4" />
                      <span className="mt-1">{rest.downloads}</span>
                    </p>
                  )}
                </div>
                <p className="text-zinc-600 leading-[1.25] mt-1 mb-3 dark:text-zinc-400">{description}</p>
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

      <Showcase title="Achievements" className="!space-x-5 lg:!space-x-10 mb-5">
        {achievements.map(({ year, image, href, title, place }, index) => (
          <div
            key={title}
            style={cssvars({ delay: `${(index + 1) * 200}ms` })}
            className="w-80 lg:flex-1 relative motion-delay-[--delay] motion-preset-fade"
          >
            <Image
              src={image}
              alt=""
              width={192}
              height={192}
              className="a-16 rounded-lg bg-gradient-to-b from-zinc-200 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900"
            />
            <div className="mt-4">
              <h3 className="text-zinc-800 dark:text-zinc-200">{title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm lg:text-base flex justify-between">
                <span>{place}</span> <time className="text-zinc-600 dark:text-zinc-400">{year}</time>
              </p>
            </div>
          </div>
        ))}
      </Showcase>
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Augustin Joseph',
  description: 'A fullstack engineer based in Yangon. Work at Codigo as a front-end engineer and won Technical Award at WIT 2019',
};
