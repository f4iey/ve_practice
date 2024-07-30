import { Metadata } from 'next';
import { QuestionList } from './list';
import { SubHeader } from '@/components/sub_header';

export const metadata: Metadata = {
  title: 'Question base',
  description: 'Questions base, that are asked for the exam.',
  openGraph: {
    title: 'Question base',
    description: 'Questions base, that are asked for the exam.',
  },
};

export default function QuestionPool() {
  return (
    <>
      <SubHeader>
        <h1>Question base</h1>
        <p className="text-lg">
          Full question pool, containing everything that can be asked for the exam.
        </p>
      </SubHeader>
      <QuestionList />;
    </>
  );
}
