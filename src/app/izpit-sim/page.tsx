import { Metadata } from 'next';
import IzpitQuiz from './izpit-quiz';
import { SubHeader } from '@/components/sub_header';

export const metadata: Metadata = {
  title: 'Exam Simulator',
  description: 'Amateur Radio Exam Simulation',
  openGraph: {
    title: 'Exam Simulator',
    description: 'Amateur Radio Exam Simulation',
  },
};

export default function Priprave() {
  return (
    <>
      <SubHeader>
        <h1>Exam Simulator</h1>
        <p>
          The exam is either made of <strong>100 or 50 questions</strong> depending
          on the chosen qualification (respectively Basic and Advanced).
          Time is unlimited and <strong>pass mark is 70%</strong>.
        </p>
      </SubHeader>

      <IzpitQuiz />
    </>
  );
}
