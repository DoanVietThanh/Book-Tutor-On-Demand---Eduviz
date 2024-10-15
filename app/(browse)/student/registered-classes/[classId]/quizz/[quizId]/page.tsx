"use client";
import React, { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/auth-provider";
import { getQuizDetail } from "@/actions/quiz/get-quiz-detail";
import { submitQuiz } from "@/actions/quiz/submit-quiz";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type QuizDetailProps = {
  params: { quizId: string; classId: string };
};

type QuizDetail = {
  duration: string;
  questionList: any[];
  quizId: string;
  quizTitle: string;
};

type AnswerQuiz = {
  answers: { answer: string; content: string }[];
  correctAnswer: string;
  questionId: string;
  questionText: string;
};

type AnswerSubmit = { questionId: string; chosenAnswer: string };

const QuizDetail = ({ params }: QuizDetailProps) => {
  const { user, accessToken } = useAuthContext();
  const router = useRouter();
  const [quizDetail, setQuizDetail] = useState<QuizDetail>();
  const [answersQuiz, setAnswersQuiz] = useState<AnswerQuiz[]>([]);
  const [answerSubmit, setAnswerSubmit] = useState<AnswerSubmit[]>([]);
  const [isPendingSubmit, startSubmit] = useTransition();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getQuizDetail(params.quizId, accessToken);
        const convertedAnswers = convertToAnswersFormat(response?.result?.questionList);
        setAnswersQuiz(convertedAnswers);
        setQuizDetail(response?.result);
        setAnswerSubmit(
          convertedAnswers?.map((item: AnswerSubmit) => ({ questionId: item.questionId, chosenAnswer: "" }))
        );
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

  if (!quizDetail || !answersQuiz) {
    return <div>Loading...</div>;
  }

  const handleSubmitQuiz = () => {
    startSubmit(async () => {
      try {
        const response = await submitQuiz(
          {
            studentId: user?.userId,
            quizId: params.quizId,
            duration: "00:10:00", // Fix sau
            answerList: answerSubmit,
          },
          accessToken
        );
        if (response.success) {
          toast.success("Submit successfully");
          router.push(`/student/registered-classes/${params.classId}`);
        }
      } catch (error) {
        console.error("Failed to submit quiz:", error);
      }
    });
  };

  const handleSelectAnswer = (questionId: string, chosenAnswer: string) => {
    setAnswerSubmit((prevAnswerSubmit) =>
      prevAnswerSubmit.map((item) => {
        if (item.questionId === questionId) {
          return { ...item, chosenAnswer };
        }
        return item;
      })
    );
  };

  return (
    <div className="p-4 h-full bg-slate-50 overflow-y-auto container">
      <header className="p-4 flex flex-col justify-center items-center bg-white rounded-md">
        <p className="font-semibold text-xl">Test {quizDetail?.quizTitle}</p>
        <div className="flex items-center gap-8">
          <span>{quizDetail?.questionList?.length} questions</span>
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
                const isActive =
                  answerSubmit.find((item) => item.questionId === quiz.questionId)?.chosenAnswer === answer.answer;

                return (
                  <div
                    key={answer.content}
                    className={`flex items-center p-4 gap-4 hover:cursor-pointer hover:bg-slate-100 rounded-lg ${
                      isActive ? "bg-blue-200" : ""
                    }`}
                    onClick={() => handleSelectAnswer(quiz.questionId, answer.answer)}
                  >
                    <span>{answer.answer}. </span> <span>{answer.content}</span>
                  </div>
                );
              })}
            </section>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <Button variant={"destructive"} onClick={() => handleSubmitQuiz()} disabled={isPendingSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default QuizDetail;
