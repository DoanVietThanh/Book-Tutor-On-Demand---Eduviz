"use client";

import { getQuizDetail } from "@/actions/quiz/get-quiz-detail";
import { useAuthContext } from "@/context/auth-provider";
import React, { useEffect, useState } from "react";

type QuizDetailProps = {
  params: { quizId: string; classId: string };
};

type AnswerQuiz = {
  answers: { answer: string; content: string }[];
  correctAnswer: string;
  questionId: string;
  questionText: string;
};

const QuizDetail = ({ params }: QuizDetailProps) => {
  const { accessToken } = useAuthContext();
  const [answersQuiz, setAnswersQuiz] = useState<AnswerQuiz[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getQuizDetail(params.quizId, accessToken);
        const convertedAnswers = convertToAnswersFormat(response?.result?.questionList);
        setAnswersQuiz(convertedAnswers);
      } catch (error) {
        console.error("Failed to fetch quiz detail:", error);
      }
    }
    fetchData();
  }, [params.quizId, accessToken]);

  const convertToAnswersFormat = (questions: any) => {
    return questions.map((question: any) => {
      const answers = Object.keys(question)
        .filter((key) => key.startsWith("answer"))
        .map((key) => ({
          answer: key.slice(-1),
          content: question[key],
        }));

      return {
        questionId: question.questionId,
        questionText: question.questionText,
        answers: answers,
        correctAnswer: question.correctAnswer,
      };
    });
  };

  return (
    <div className="p-4 h-full bg-slate-50 overflow-y-auto container">
      <header className="p-4 flex flex-col justify-center items-center bg-white rounded-md">
        <p className="font-semibold text-xl">Kiểm tra Toán định kì lần 1</p>
        <div className="flex items-center gap-8">
          <span>30 câu hỏi</span>
        </div>
      </header>
      <div>
        {answersQuiz.map((quiz, index: number) => (
          <div key={index} className="p-4 bg-white rounded-md shadow-lg my-4">
            <section className="pb-2 border-b-2">
              <span className="font-semibold text-red-500">Câu hỏi {index + 1}: </span>
              <span>{quiz?.questionText}</span>
            </section>
            <section className="py-4">
              {quiz?.answers.map((answer) => {
                return (
                  <div key={answer.content} className={`flex items-center p-4 gap-4 rounded-lg`}>
                    <span>{answer.answer}. </span> <span>{answer.content}</span>
                  </div>
                );
              })}
            </section>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizDetail;
