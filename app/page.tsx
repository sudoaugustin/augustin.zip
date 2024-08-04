import type { Metadata } from 'next';

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

const awards = [{ name: 'Technical Award', href: 'https://witaward.com/result/2019', competition: 'WIT 2019' }];

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

const sideprojects = [
  {
    name: 'portal',
    href: '/projects/portal',
  },
  {
    name: 'qr-x',
    href: 'https://github.com/devtrice/qr-x',
  },
  {
    name: 'supex',
    href: 'https://supex.dev/',
  },
  {
    name: 'vslook',
    href: 'https://marketplace.visualstudio.com/items?itemName=sudoaugustin.vslook',
  },
  {
    name: 'tailpile',
    href: 'https://marketplace.visualstudio.com/items?itemName=sudoaugustin.tailpile',
  },
  {
    name: 'renex',
    href: 'https://www.npmjs.com/package/renex',
  },
  {
    name: 'favicon-pro',
    href: 'https://www.npmjs.com/package/favicon-pro',
  },
  {
    name: 'tailwind-transpiler',
    href: 'https://marketplace.visualstudio.com/items?itemName=sudoaugustin.tailwindcss-transpiler',
  },
];

export default function AppPage() {
  return (
    <main className="space-y-5 lg:space-y-10">
      <h1>
        Hey!
        <br /> <br />
        I'm <strong>Augustin Joseph</strong>, a fullstack engineer from south east asia. You can also call me <i>Aung Bo Bo Tun</i>. I'm
        working as a senior frontend engineer at Codigo SG since 2022.
      </h1>
      <div>
        <h2 className="font-bold mb-1.5 text-base">Side Projects</h2>
        <p>I build small tools during my free time. So far I have built:</p>
        <ul className="mt-2.5 mb-5 space-y-2.5 text-slate-100">
          {sideprojects.map(({ name, href }) => (
            <li key={name} className="block">
              -{' '}
              <a href={href} className="shine">
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="font-bold mb-1.5 text-base">Achievements</h2>
        <div className="mt-2.5 mb-5 space-y-2.5 text-slate-100">
          {awards.map(({ name, href, competition }) => (
            <a key={name} href={href} className="block">
              <span className="mr-0.5 inline-block">-</span> <span className="shine">{name}</span>
              {' at '}
              {competition}
            </a>
          ))}
        </div>
      </div>
      <div>
        <h2 className="font-bold mb-1.5 text-base">Education</h2>
        <div className="mt-2.5 mb-5 space-y-2.5 text-slate-100">
          {education.map(({ year, href, course, university }) => (
            <a key={course} href={href} className="block">
              <b className="inline-block w-8 font-semibold">{year}</b> - <span className="shine">{course}</span>
              {' at '}
              {university}
            </a>
          ))}
        </div>
      </div>
      <div>
        <h2 className="font-bold mb-1.5 text-base">Tech Stack</h2>
        <ul className="list-inside mt-2.5 mb-5 gap-2.5 text-slate-100 list-disc grid grid-cols-3">
          {techstacks.map(({ name }) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="font-bold mb-1.5 text-base">Contact Me Via</h2>
        <div className="list-inside mt-2.5 mb-5 gap-2.5 text-slate-100 list-disc grid grid-cols-3 sm:grid-cols-4">
          {contacts.map(({ name, href }) => (
            <a key={name} href={href} className="shine">
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
