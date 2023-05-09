import Image from 'components/image';
import Motion from 'components/motion';
import Window from 'components/window';

const devtools = [
  {
    image: 'vslook.png',
    links: [
      { name: 'Github', href: 'https://github.com/sudoaugustin/vslook' },
      { name: 'Marketplace', href: 'https://marketplace.visualstudio.com/items?itemName=sudoaugustin.vslook' },
    ],
  },
  {
    image: 'tailpile.png',
    links: [
      { name: 'Github', href: 'https://github.com/sudoaugustin/tailpile' },
      { name: 'Marketplace', href: 'https://marketplace.visualstudio.com/items?itemName=sudoaugustin.tailpile' },
    ],
  },
  {
    image: 'tailwindcss-transpiler.png',
    links: [
      { name: 'Github', href: 'https://github.com/sudoaugustin/tailwindcss-transpiler-vscode' },
      { name: 'Marketplace', href: 'https://marketplace.visualstudio.com/items?itemName=sudoaugustin.tailwindcss-transpiler' },
    ],
  },
  {
    image: 'favecon.png',
    links: [
      { name: 'Website', href: 'https://favecon.vercel.app/' },
      { name: 'Github', href: 'https://github.com/sudoaugustin/favecon' },
      { name: 'NPM', href: 'https://www.npmjs.com/package/favecon' },
    ],
  },
  {
    image: 'renex.png',
    links: [
      { name: 'Github', href: 'https://github.com/sudoaugustin/renex' },
      { name: 'NPM', href: 'https://www.npmjs.com/package/renex' },
    ],
  },
];

const websites = [
  {
    href: 'codigo.co',
    image: 'codigo.png',
  },
  {
    href: 'neuroglee.com',
    image: 'neuroglee.png',
  },
  {
    href: 'boulderm.com',
    image: 'boulderm.png',
  },
];

const contacts = [
  { name: 'Github', link: 'https://github.com/sudoaugustin' },
  { name: 'Twitter', link: 'https://twitter.com/sudoaugustin' },
  { name: 'LinkedIn', link: 'https://www.linkedin.com/in/sudoaugustin/' },
  { name: 'sudoaugustin@gmail.com', link: 'mailto:sudoaugustin@gmail.com' },
];

const boilerplates = [
  {
    name: 'Personal',
    description: 'I developed this boilerplates alone and been using it in some of my personal projects',
    stacks: [
      { name: 'Tailwind', link: 'https://tailwindcss.com/' },
      { name: 'Radix UI', link: 'https://www.radix-ui.com/' },
      { name: 'Framer', link: 'https://www.framer.com/motion/' },
      { name: 'Nano Stores', link: 'https://github.com/nanostores' },
      { name: 'SWR', link: 'https://swr.vercel.app/' },
      { name: 'Hook Form', link: 'https://react-hook-form.com/' },
      { name: 'Yup', link: 'https://github.com/jquense/yup' },
      { name: 'React Use', link: 'https://github.com/streamich/react-use' },
      { name: 'Sonner', link: 'https://sonner.emilkowal.ski/' },
      { name: 'Rome Tools', link: 'https://rome.tools/' },
    ],
  },
  {
    name: 'Codigo',
    description: 'I developed this boilerplates along with my co-workers and been using it in for all codigo projects',
    stacks: [
      { name: 'Tailwind', link: 'https://tailwindcss.com/' },
      { name: 'Radix UI', link: 'https://www.radix-ui.com/' },
      { name: 'Framer', link: 'https://www.framer.com/motion/' },
      { name: 'Recoil', link: 'https://recoiljs.org/' },
      { name: 'TanStack Query', link: 'https://tanstack.com/query/latest' },
      { name: 'Hook Form', link: 'https://react-hook-form.com/' },
      { name: 'Yup', link: 'https://github.com/jquense/yup' },
      { name: 'Mantine Hooks', link: 'https://mantine.dev/' },
      { name: 'ESLint', link: 'https://eslint.org/' },
      { name: 'Prettier', link: 'https://prettier.io/' },
    ],
  },
];

export default function Index() {
  return (
    <main className='p-20 bg-boxes bg-gray-950  min-h-screen after:absolute after:bg-gradient-to-br after:from-purple-950/25 after:via-fuchsia-950/25 after:to-violet-950/25 after:inset-0'>
      <Window title="Dev Tool Projects">{}</Window>
    </main>
  );
  // return (
  //   <main className="p-20 space-y-20 text-sm animate-in fade-in-0 slide-in-from-bottom-5 duration-700 max-w-screen-2xl mx-auto">
  //     <Motion as="section">
  //       <h1 className="max-w-lg leading-relaxed">
  //         Hey! 👋
  //         <br />
  //         I'm Augustin, a fullstack developer based in Yangon. I work at{' '}
  //         <a href="https://www.codigo.co/" className="link">
  //           Codigo
  //         </a>{' '}
  //         as a front-end developer during day and mini dev tools at night. I won Technical Award at{' '}
  //         <a href="https://witaward.com/result/2019#section3" className="link">
  //           WIT2019
  //         </a>
  //         .
  //       </h1>
  //       <ul className="py-5 flex space-x-5">
  //         {contacts.map(({ name, link }) => (
  //           <li key={name}>
  //             <a href={link} className="text-brand-600 hover:text-brand-400">
  //               • {name}
  //             </a>
  //           </li>
  //         ))}
  //       </ul>
  //     </Motion>
  //     <Motion as="section">
  //       <h2 className='font-semibold pb-5 uppercase text-gray-600'>Dev Tools</h2>
  //       <ul className='grid grid-cols-4 gap-5'>
  //         {devtools.map(({ image, links }, i) => (
  //           <Motion
  //             as="li"
  //             key={image}
  //             delay={i * 0.15}
  //             className="rounded-lg overflow-hidden border bg-gray-50 duration-150 hover:shadow-md"
  //           >
  //             <Image src={`/images/dev-projects/${image}`} size={[1000, 1110]} className="w-full" />
  //             <p className='p-5 space-x-4 border-t'>
  //               {links.map(({ name, href }) => (
  //                 <a key={name} rel="noreferrer" target='_blank' href={href} className="link decoration-solid">
  //                   {name}
  //                 </a>
  //               ))}
  //             </p>
  //           </Motion>
  //         ))}
  //       </ul>
  //     </Motion>
  //     <Motion as="section">
  //       <h2 className='font-semibold pb-5 uppercase text-gray-600'>Codigo Works</h2>
  //       <ul className='grid grid-cols-3 gap-5'>
  //         {websites.map(({ href, image }, i) => (
  //           <Motion as="li" key={image} delay={i * 0.15}>
  //             <Image
  //               src={`/images/web-projects/${image}`}
  //               size={[1440, 821]}
  //               className="w-full rounded-lg overflow-hidden border bg-gray-50 border-gray-200/50"
  //             />
  //             <a
  //               rel="noreferrer"
  //               target='_blank'
  //               href={`https://${href}`}
  //               className="mt-2 link decoration-transparent inline-flex items-center space-x-0.5 group"
  //             >
  //               <span>{href}</span>
  //               <svg
  //                 viewBox="0 0 20 20"
  //                 fill="currentColor"
  //                 className="w-5 h-5 mt-1 rotate-45 opacity-0 duration-150 group-hover:opacity-100"
  //               >
  //                 <path
  //                   d="M10 15a.75.75 0 01-.75-.75V7.612L7.29 9.77a.75.75 0 01-1.08-1.04l3.25-3.5a.75.75 0 011.08 0l3.25 3.5a.75.75 0 11-1.08 1.04l-1.96-2.158v6.638A.75.75 0 0110 15z"
  //                   clipRule="evenodd"
  //                   fillRule="evenodd"
  //                 />
  //               </svg>
  //             </a>
  //           </Motion>
  //         ))}
  //       </ul>
  //     </Motion>
  //     <Motion as="section">
  //       <h2 className='font-semibold pb-5 uppercase text-gray-600'>NextJs Boilerplates</h2>
  //       <ul className='space-y-5'>
  //         {boilerplates.map(({ name, stacks, description }) => (
  //           <li key={name} className='max-w-md bg-slate-50 p-2.5 text-xs rounded-xl'>
  //             <h3 className='font-extrabold mb-1 text-sm'>{name}</h3>
  //             <p>{description}</p>
  //             <div className='flex flex-wrap -m-0.5 pt-4'>
  //               {stacks.map(({ name, link }) => (
  //                 <a
  //                   key={name}
  //                   href={link}
  //                   target='_blank'
  //                   rel='noreferrer'
  //                   className='whitespace-nowrap m-0.5 bg-sky-400/25 text-xs text-sky-800 font-semibold px-0.5 rounded border border-sky-500/25'
  //                 >
  //                   {name}
  //                 </a>
  //               ))}
  //             </div>
  //           </li>
  //         ))}
  //       </ul>
  //     </Motion>
  //   </main>
  // );
}
