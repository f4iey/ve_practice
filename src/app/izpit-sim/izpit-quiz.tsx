'use client';

import { useState } from 'react';
import Modal from '../components/modal';
import { Question } from '@/interfaces/question';
import { getExamQuestions } from '@/util/question-util';
import { create } from 'zustand';
import QuestionCard from '@/components/question_card';
import { scrollToTop } from '@/components/scroll-to-top-button';

enum QuizState {
  Loading,
  Ready,
  InProgress,
  Finished,
}

interface IzpitQuizStore {
  state: QuizState;

  questions?: Question[];
  answers?: number[][];
  correctCount?: number;

  load: () => Promise<void>;
  finish: (correctCount: number) => Promise<void>;
  reset: () => Promise<void>;
}

const basicAdvanced: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selection, setSelection] = useState<string>('');

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSelect = (choice: 'Basic' | 'Advanced') => {
    setSelection(choice);
    setShowModal(false);
    console.log(`You selected: ${choice}`);
  };

  const getSelection = (): string => {
    return selection;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <button className="btn btn-primary" onClick={handleOpenModal}>
          Choose exam type
        </button>
        <p className="mt-4">
          {selection ? `You selected: ${selection}` : 'No selection made yet.'}
        </p>
      </div>
      <Modal show={showModal} onClose={handleCloseModal} onSelect={handleSelect} />
    </div>
  );
};
export const basicAdvanced;

const useStore = create<IzpitQuizStore>((set) => ({
  state: QuizState.Ready,

  questions: undefined,
  answers: undefined,
  correctCount: undefined,

  load: async () => {
    set({ state: QuizState.Loading });
    //look for basic or advanced questions and pass it through: no selection leads to basic
    if (getSelection() == 'Advanced'){
      const questions = await getExamQuestions(new Date().valueOf(), 50, 2, 'Advanced');
    } else {
      const questions = await getExamQuestions(new Date().valueOf(), 100, 4, 'Basic');
    }

    set({
      state: QuizState.InProgress,
      questions,
      answers: Array(questions.length).fill([-1]),
    });
  },

  finish: async (correctCount: number) => {
    set({ state: QuizState.Finished, correctCount });
    scrollToTop();
  },

  reset: async () => {
    set({ state: QuizState.Ready });
  },
}));

export default function IzpitQuiz() {
  const [state, questions, answers, correctCount, load, finish, reset] =
    useStore((state) => [
      state.state,
      state.questions,
      state.answers,
      state.correctCount,
      state.load,
      state.finish,
      state.reset,
    ]);

  return (
    <>
      {state === QuizState.Ready && (
        <div className="section">
          <button className="button mx-auto" onClick={load}>
            Begin
          </button>
        </div>
      )}

      {state === QuizState.Loading && <div>Loading ...</div>}

      {state === QuizState.InProgress && inProgress()}

      {state === QuizState.Finished && finished()}
    </>
  );

  function inProgress() {
    return (
      <div className="section container flex max-w-xl flex-col gap-12">
        {questions?.map((question, qi) => (
          <QuestionCard
            key={qi}
            question={question}
            reveal={false}
            selected={answers![qi]}
            onClick={(i) => {
              const newAnswers = [...answers!];
              newAnswers[qi] = [i];
              useStore.setState({ answers: newAnswers });
            }}
          />
        ))}

        <button
          className="button"
          onClick={() =>
            finish(
              questions!
                .map((q, qi) => q.correct === answers![qi][0])
                .reduce((acc, cur) => acc + (cur ? 1 : 0), 0),
            )
          }
        >
          Finish
        </button>
      </div>
    );
  }

  function finished() {
    return (
      <>
        <div className="bg-light">
          <div className="section container flex flex-col items-center">
            <h2 className="text-xl">Result</h2>
            <p className="text-4xl">
              {correctCount} / {answers!.length} (
              {Math.round((correctCount! / answers!.length) * 1000) / 10} %)
            </p>
            <button className="button mt-6" onClick={reset}>
              Retry
            </button>
          </div>
        </div>

        <div className="section">
          <h1 className="mb-10 text-center text-2xl font-semibold">
            Incorrect answers
          </h1>

          <div className="container flex max-w-xl flex-col gap-12">
            {questions?.map(
              (question, qi) =>
                question.correct !== answers![qi][0] && (
                  <QuestionCard
                    key={qi}
                    question={question}
                    reveal={true}
                    selected={[answers![qi][0], question.correct]}
                  />
                ),
            )}
          </div>
        </div>
      </>
    );
  }
}
