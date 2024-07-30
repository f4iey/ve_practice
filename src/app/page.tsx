import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  description: 'About Amateur Radio licensing',
  openGraph: {
    description:
      'About Amateur Radio licensing',
  },
};

const povezave = [
  {
    label: 'ISED Exam generator',
    href: 'https://ised-isde.canada.ca/site/amateur-radio-operator-certificate-services/en/amateur-radio-exam-generator/',
  },
  {
    label: 'Info on the Amateur Radio Service in Canada (RIC-3)',
    href: 'https://ised-isde.canada.ca/site/spectrum-management-telecommunications/en/licences-and-certificates/radiocom-information-circulars-ric/ric-3-information-amateur-radio-service',
  },
  {
    label: 'ISED Callsign directory',
    href: 'https://apc-cap.ic.gc.ca/pls/apc_anon/query_amat_cs$.startup',
  },
];

const classes = [
  {
    premium: false,
    name: 'Basic qualification',
    description:
      'The Basic qualification is the first license level containing 100 questions about basic knowledge in STEM fields, radio propagation and antenna systems.',
    perks: [
      <>
        Limited to bands above 30 MHz{' '}
      </>,
      <>
        Limited Power{' '}
        <span className="text-sm font-light">(560 W SSB/CW, 190 W AM/FM)</span>
      </>,
      <>Minimal 70% score. 80% score gives "Basic with Honours" and allows HF.</>,
    ],
  },
  {
    premium: true,
    name: 'Advanced qualification',
    description:
      'The Advanced qualification is a more technical test with 50 questions and allows more privileges such as installing or building its own equipment',
    perks: [
      <>Unlocks all amateur bands{' '}<span className="text-sm font-light">(see RAC band plan)</span></>,
      <>
        Higher output power <span className="text-sm font-light">(2250 W SSB/CW, 750W AM/FM)</span>
      </>,
      <>Build and install its own station</>,
    ],
  },
];

export default function Home() {
  return (
    <>
      <div className="section container prose">
        <h1>What is ham radio?</h1>
        <p>
        Radio amateur is a non-profit hobby involving every aspects of radioelectricity.
        Every amateur (ham) finds their own interest.
        Some are involved in building radio stations, others with
        establishing radio communications, some like to compete in
        establishing radio communications or searching for hidden transmitters.
        Radio amateurs are also assistants in the event of natural disasters when
        the main communications are down.
        </p>
      </div>

      <div className="bg-light">
        <div className="section container">
          <div className="prose mx-auto">
            <h2 className="text-center">Amateur radio qualification levels</h2>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-6 md:flex-row md:items-stretch">
            {classes.map((c) => (
              <div
                key={c.name}
                className={`flex max-w-sm flex-1 flex-col rounded-2xl p-6 ${
                  c.premium ? 'bg-dark text-light' : 'bg-white'
                }`}
              >
                <h4 className="mb-4 text-center text-lg font-bold">{c.name}</h4>
                <p>{c.description}</p>

                <div className={`divider ${c.premium ? '!bg-gray-500' : ''}`} />

                <ul className="flex flex-col gap-2">
                  {c.perks.map((p, i) => (
                    <li key={i} className="flex flex-row items-start gap-2">
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="mt-1 h-4 w-4 text-primary"
                      />
                      <div className="flex-1">{p}</div>
                    </li>
                  ))}
                </ul>
            ))}
          </div>
        </div>
      </div>

      <div className="section container prose">
        <h2>About the exams</h2>
        <p>The qualification exams tests your knowledge on the following themes:</p>
        <h3>Basic qualification</h3>
        <ol>
          <li>Regulations and Policies</li>
          <li>Operating and Procedures</li>
          <li>Station Assembly, Practice and Safety</li>
          <li>Circuit Components</li>
          <li>Basic Electronics and Theory</li>
          <li>Feedlines and Antenna Systems</li>
          <li>Radio Wave Propagation</li>
          <li>Interference and Suppression</li>
        </ol>
        <h3>Advanced qualification</h3>
        <ol>
          <li>Advanced Theory</li>
          <li>Advanced Components and Circuits</li>
          <li>Measurements</li>
          <li>Power Supplies</li>
          <li>Transmitters, Modulation and Processing</li>
          <li>Receivers </li>
          <li>Feedlines - Matching and Antenna Systems</li>
        </ol>
        <p>
          For more details{' '}
          <Link target="_blank" href="https://ised-isde.canada.ca/site/spectrum-management-telecommunications/en/licences-and-certificates/radiocom-information-circulars-ric/ric-3-information-amateur-radio-service">
            RIC-3
          </Link>{' '}
          Or see <Link href="/zbirka">the official question pool</Link>, which is used for generating the exams.
        </p>

        <h3>Morse Code qualification</h3>
        <blockquote cite="https://ised-isde.canada.ca/site/spectrum-management-telecommunications/en/licences-and-certificates/radiocom-information-circulars-ric/ric-3-information-amateur-radio-service">
          <p>The examination for this qualification consists of sending 
          and receiving Morse Code at a speed of not less than 5 words per minute (w.p.m.)
          for three consecutive minutes.
          The Morse Code examination is in plain language and may include the 26 letters, the 10 numbers, comma, period, 
          question mark, dash, fraction bar, Q-signals and emergency signals. In both the sending and receiving examinations, 
          each character omitted or incorrectly sent or received is counted as one error. 
          A mark of 100% is awarded for five errors or less, 99% for six errors, 98% for seven errors, 97% for eight errors, etc. 
          The examiner will allow candidates two minutes to review and correct their copy before it is graded. 
          The pass mark is 100%.</p>
        </blockquote>
        <p>—ISED, <cite>RIC-3</cite></p>

        <h3>Finding remote examiner</h3>
        <p>
          ISED maintains a list of RAC accredited examiners. For remote exams, see the{' '}
          <Link
            target="_blank"
            href="https://lid.radio/ham-exams"
          >
            list of AEs offering remote exams
          </Link>
          . <em>VA3IEY Soon™</em>
        </p>

        <h2>Getting prepared</h2>
        <p>
          The best method is to study the questions directly on {' '}
          <Link
            target="_blank"
            href="https://ised-isde.canada.ca/site/amateur-radio-operator-certificate-services/en/amateur-radio-exam-generator"
          >
            the ISED generator
          </Link>
        </p>
        <p>
          The exam can be taken either in English or French. Before requesting to pass the exam in French, make sure your examiner
          is able to do so. Otherwise, you can ask for correspondence from ISED.
        </p>
        <p>
          You can study using{' '}
          <Link href="/priprave">the training page</Link>, which contains the same questions from the original exam.
        </p>
        <p>
          When you feel ready,{' '}
          <Link href="/izpit-sim">you can take the test here</Link>. The exam has no time limit and retesting is allowed.
        </p>

        <h2>After the examination</h2>
        <p>
          After passing the exam, you will receive an email to register on the ISED platform and will be asked to apply
          for a callsign. More details on callsigns here:{' '}
          <Link href="/licenca">Applying for a callsign</Link>.
        </p>
        <h2>Links</h2>
        <ul>
          {povezave.map(({ label, href }) => (
            <li key={label}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
