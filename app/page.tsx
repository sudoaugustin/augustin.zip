import type { Metadata } from 'next';
import Image from 'next/image';
import Profile from './icon.png';

const contacts = [
  { name: 'Github', href: 'https://github.com/sudoaugustin' },
  { name: 'Twitter', href: 'https://twitter.com/sudoaugustin' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/sudoaugustin/' },
  { name: 'sudoaugustin@gmail.com', href: 'mailto:sudoaugustin@gmail.com' },
];

const techstacks = [
  { name: 'NodeJS' },
  { name: 'NextJS' },
  { name: 'React Native' },
  { name: 'Typescript' },
  { name: 'Tailwind' },
  { name: 'SCSS' },
  { name: 'ESBuild' },
  { name: 'MongoDB' },
  { name: 'Laravel' },
];

const awards = [
  { name: 'Technical Award', href: 'https://witaward.com/result/2019', competition: 'WIT 2019' },
  {
    name: 'Best Employee Award',
    href: 'https://www.linkedin.com/posts/codigo-pte-ltd_hey-there-awesome-myanmar-codigo-rezeve-activity-7146663689310396416-zNu8?utm_source=share&utm_medium=member_desktop',
    competition: 'Codigo 2023',
  },
];

const education = [
  {
    year: '2023',
    href: 'https://www.nccedu.com/qualifications/computing/ncc-education-level-5-diploma-in-computing-l5dc/',
    course: 'Diploma in Computing',
    university: 'NCC Education',
  },
  {
    year: '2019',
    href: 'https://www.uit.edu.mm/',
    course: '2nd Year',
    university: 'The University of Information Technology(Yangon)',
  },
  {
    year: '2018',
    href: 'https://www.uit.edu.mm/',
    course: '1st Year',
    university: 'The University of Information Technology(Yangon)',
  },
];

const cdgprojects = [
  {
    name: 'codigo.co',
    href: 'https://codigo.co/',
    tags: ['Frontend Lead', 'AWS SES', 'Server Maintenance'],
  },
  {
    name: 'techforhire.dev',
    href: 'https://techforhire.dev/',
    tags: ['Frontend Lead', 'AWS SES', 'Server Maintenance'],
  },
  {
    name: 'trifectasingapore.com',
    href: 'https://trifectasingapore.com/',
    tags: ['Frontend Lead', 'Server Maintenance'],
  },
  {
    name: 'neuroglee.com',
    href: 'https://www.neuroglee.com/',
    tags: ['Frontend Lead', 'Server Maintenance'],
  },
  {
    name: 'boulderm.com',
    href: 'https://boulderm.com/',
    tags: ['Frontend Support'],
  },
];

const sideprojects = [
  {
    name: 'skel-ui',
    href: 'https://skel-ui.augustin.zip/',
    description: 'Next era of skeleton loading',
  },
  {
    name: 'tailwindcss-shorthand',
    href: 'https://www.npmjs.com/package/tailwindcss-shorthand',
    description: 'Useful tailwindcss shorthand classes and variants to boost productivity',
  },
  {
    name: 'portal',
    href: '/projects/portal',
    description: 'Embed live websites in New Tab.',
  },
  {
    name: 'qr-x',
    href: 'https://github.com/devtrice/qr-x',
    description: 'An Elegant QR Code Library.',
  },
  {
    name: 'supex',
    href: 'https://supex.dev/',
    description: 'Build cross-browser extensions.',
  },
  {
    name: 'vslook',
    href: 'https://marketplace.visualstudio.com/items?itemName=sudoaugustin.vslook',
    description: 'Create your own VSCode theme.',
  },
  {
    name: 'tailpile',
    href: 'https://marketplace.visualstudio.com/items?itemName=sudoaugustin.tailpile',
    description: 'Transpile TailwindCSS files into pure CSS.',
  },
  {
    name: 'renex',
    href: 'https://www.npmjs.com/package/renex',
    description: 'A small useful react utility components.',
  },
  {
    name: 'favicon-pro',
    href: 'https://www.npmjs.com/package/favicon-pro',
    description: 'Fetch live and best quality icons of any website.',
  },
  {
    name: 'tailwind-transpiler',
    href: 'https://marketplace.visualstudio.com/items?itemName=sudoaugustin.tailwindcss-transpiler',
    description: 'Transpile TailwindCSS files into pure CSS.',
  },
];

export default function AppPage() {
  return (
    <main className="space-y-5 lg:space-y-10">
      <div>
        <Image src={Profile} alt="My Face" className="size-10 rounded-md" />
        <h1 className="mt-2.5 lg:mt-5">
          Hello There!
          <br />
          I'm Augustin Joseph, a Fullstack Engineer from Myanmar. You can also call me <i>Aung Bo Bo Tun</i>. I have been working as a
          Senior Frontend Engineer at CodigoSG since 2022.
        </h1>
      </div>
      <div>
        <h2 className="font-medium mb-1.5 text-base">Codigo Projects</h2>
        <p>Within my 2+ years in codigo, I built these websites from scratch with colleagues</p>
        <ul className="mt-2.5 mb-5 space-y-2.5 text-slate-100">
          {cdgprojects.map(({ name, tags, href }) => (
            <li key={name} className="block">
              -{' '}
              <a href={href} target="_blank" className="shine" rel="noreferrer">
                {name}
              </a>
              <p className="ml-2 font-light">{tags.join(' / ')}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="font-medium mb-1.5 text-base">Side Projects</h2>
        <p>I build small tools during my free time. So far I have built:</p>
        <ul className="mt-2.5 mb-5 space-y-2.5 text-slate-100">
          {sideprojects.map(({ name, href, description }) => (
            <li key={name} className="block">
              -{' '}
              <a href={href} target="_blank" className="shine" rel="noreferrer">
                {name}
              </a>
              <p className="ml-2 font-light">{description}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="font-medium mb-1.5 text-base">Achievements</h2>
        <div className="mt-2.5 mb-5 space-y-2.5 text-slate-100">
          {awards.map(({ name, href, competition }) => (
            <a key={name} href={href} target="_blank" className="block" rel="noreferrer">
              <span className="mr-0.5 inline-block">-</span> <span className="shine">{name}</span>
              {' at '}
              {competition}
            </a>
          ))}
        </div>
      </div>
      <div>
        <h2 className="font-medium mb-1.5 text-base">Education</h2>
        <div className="mt-2.5 mb-5 space-y-2.5 text-slate-100">
          {education.map(({ year, href, course, university }) => (
            <a key={course} href={href} target="_blank" className="block" rel="noreferrer">
              <b className="inline-block w-9 font-medium">{year}</b> - <span className="shine">{course}</span>
              {' at '}
              {university}
            </a>
          ))}
        </div>
      </div>
      <div>
        <h2 className="font-medium mb-1.5 text-base">Tech Stack</h2>
        <ul className="list-inside mt-2.5 mb-5 gap-2.5 text-slate-100 list-disc grid grid-cols-3">
          {techstacks.map(({ name }) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="font-medium mb-1.5 text-base">Contact Me Via</h2>
        <div className="list-inside mt-2.5 mb-5 gap-2.5 text-slate-100 list-disc grid grid-cols-3 sm:grid-cols-4">
          {contacts.map(({ name, href }) => (
            <a key={name} href={href} target="_blank" className="shine" rel="noreferrer">
              {name}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Augustin - Fullstack engineer',
  description: 'A fullstack engineer based in Yangon. Work at Codigo as a front-end engineer and won Technical Award at WIT 2019',
};
