import { Metadata } from 'next';

export default function Page() {
  return (
    <main className="relative z-10 max-w-2xl mx-auto px-5 py-10 lg:py-20 font-light [&_b]:font-extrabold">
      <h1>
        Hey Adam! <br /> <i>(If you are not Adam, please kindly foward this application to him)</i>
      </h1>
      <br /> <br />
      <p>
        <i>Adam:</i> Who the hell are u?
      </p>
      <p>
        <i>Augustin:</i> A 22yr old from a country in Asia u never heard of, Myanmar(Burma).
      </p>
      <br /> <br />
      <p>
        <i>Adam:</i> What, Asia??? Huge Timezone difference dude! Better luck with another job.
      </p>
      <p>
        <i>Augustin:</i> I can explain. You said the important hours to overlap is 9am-1pm(in a tweet) in your timezone which is
        7:30pm-11:30pm in my local time. So I can be available from 4am-1pm according to your timezone.
      </p>
      <br /> <br />
      <p>
        <i>Adam:</i> OK! I'm listening.
      </p>
      <p>
        <i>Augustin:</i> About me. I got first introduced to programming at my first year of university when I'm about 16. Before that, I
        don't know what is programming or how the programs were created.
        <br /> <br />
        My first language was <b>C++</b>(I forgot the syntax now, only JS, TS is flowing through my veins). My first project was password
        manager with C++ for my academic.
        <br /> <br />I learned <b>Java(the nightmare)</b> and <b>Javascript</b> at my 2nd year of university. The odd thing is I didn't like
        Javascript at first, my first love was <b>PHP</b>. I was very interested in payment systems during that time, so I competed in a web
        competition held by Japan company and won Technical Award(https://witaward.com/result/2019). After that I learned about payment
        methods and difference between cash usage in Europe and Asia. I'm also familiar with <b>Laravel</b> to a basic level.
        <br /> <br />I learned <b>React</b> and <b>NodeJS</b> during covid period. I got my first job as a frontend developer in a Singapore
        company 2years ago with NextJS. At my job, I primarily work on client projects and during free office hours, our frontend team work
        on <b>nextjs boilerplate</b>.
      </p>
      <br /> <br />
      <p>
        <i>Adam:</i> Could you tell me about some of the projects you are proud of.
      </p>
      <p>
        <i>Augustin:</i> Well, I have three.
      </p>
      <ol className="list-decimal ml-6">
        <li>
          <a href="https://supex.dev/" className="shine underline">
            Supex:
          </a>
          <span>
            {' '}
            It's a cross-browser extension tool, I released this year. It's my favourite project of all time. It was made to improve the
            experience of browser extension development.
          </span>
        </li>
        <li>
          <a href="https://marketplace.visualstudio.com/items?itemName=sudoaugustin.vslook" className="shine underline">
            VSLook:
          </a>
          <span>
            {' '}
            A VSCode extension which let you create your own VSCode theme with TailwindCSS colors. It was the most challenging project for
            me. It has 7K installs.
          </span>
        </li>
        <li>
          <a href="https://marketplace.visualstudio.com/items?itemName=sudoaugustin.tailwindcss-transpiler" className="shine underline">
            TailwindCSS Transpiler:
          </a>
          <span>
            {' '}
            It was my first side project. It's a VSCode extension which transpile tailwindcss into purecss on file save. This extension has
            51K installs . I also release a Atom version of TailwindCSS Transpiler but I unpublished due to very low installs.
          </span>
        </li>
      </ol>
      If you want to know more of my side projects please visit{' '}
      <a href="https://www.augustin.zip/" className="underline">
        https://www.augustin.zip/
      </a>
      .
      <br /> <br />
      <p>
        <i>Adam:</i> Do you wanna add something to this application?
      </p>
      <p>
        <i>Augustin: </i> Yes, I have a hearing problem. I'm not deaf. But sometime, I have problem of interpreting words when the person
        speak sudden fast.
      </p>
      <br /> <br />
      <p>
        <i>Adam:</i> OK!! No worries, you are not hired anyway due to timezone difference. Better luck.
      </p>
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Hire me, Adam!!',
  description: 'If you are inspecting this description, it means you are going to hire me.',
};
