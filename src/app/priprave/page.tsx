import { Metadata } from 'next';
import VajaQuiz from './vaja-quiz';

export const metadata: Metadata = {
  title: 'Study Mode',
  description: 'All the questions sorted by categories',
  openGraph: {
    title: 'Study Mode',
    description: 'All the questions sorted by categories',
  },
};

export default function Priprave() {
  return <VajaQuiz />;
}
