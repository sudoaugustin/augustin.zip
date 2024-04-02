import { Metadata } from 'next';

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
    name: 'Supex',
    href: 'https://supex.dev/',
    label: 'NPM package',
    active: true,
  },
  {
    name: 'VSLook',
    href: 'https://marketplace.visualstudio.com/items?itemName=sudoaugustin.vslook',
    label: 'VSCode extension',
  },
  {
    name: 'Tailpile',
    href: 'https://marketplace.visualstudio.com/items?itemName=sudoaugustin.tailpile',
    label: 'VSCode extension',
  },
  {
    name: 'Renex',
    href: 'https://www.npmjs.com/package/renex',
    label: 'NPM package',
  },
  {
    name: 'Favecon',
    href: 'https://www.npmjs.com/package/favecon',
    label: 'NPM package',
  },
  {
    name: 'Tailwind Transpiler',
    href: 'https://marketplace.visualstudio.com/items?itemName=sudoaugustin.tailwindcss-transpiler',
    label: 'VSCode extension',
  },
];

export default function AppPage() {
  return (
    <main className="max-w-2xl mx-auto px-5 py-10 space-y-5 lg:py-20 lg:space-y-10 z-10 relative hover:[&_a]:underline animate-in duration-500 fade-in-5 slide-in-from-bottom-5">
      <h1>
        Hey!
        <br />
        I'm <strong>Augustin Joseph</strong>, a fullstack developer from south east asia. You can also call me <i>Aung Bo Bo Tun</i>.
      </h1>
      <div>
        <h2 className="font-bold mb-1.5 text-base">Work</h2>
        <p>
          I'm nerding as a frontend(<i>front-end</i>) developer at Codigo SG since 2022.
        </p>
      </div>
      <div>
        <h2 className="font-bold mb-1.5 text-base">Side Projects</h2>
        <p>
          Although my main profession is frontend development, I'm not limited to that. Because of my interest in developer experience, I
          build small dev tools during my free time. So far I have built:
        </p>
        <div className="mt-2.5 mb-5 space-y-2.5 text-slate-100">
          {sideprojects.map(({ name, href, label, active }) => (
            <a key={name} href={href} className="block">
              <span className="mr-0.5 inline-block">-</span> <span className="shine">{name}</span>{' '}
              <span className="text-slate-100/50">{`[${label}]`}</span>
              {active && (
                <span className="inline-flex bg-slate-100 rounded-full px-2 py-0.5 text-slate-900 text-xs font-bold ml-2">
                  Actively working
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
      <div>
        <h2 className="font-bold mb-1.5 text-base">Award</h2>
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
        <h2 className="font-bold mb-1.5 text-base">Tech Stacks</h2>
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
  title: 'Augustin - Fullstack developer',
  description: 'A fullstack developer based in Yangon. Work at Codigo as a front-end developer and won Technical Award at WIT 2019',
};
