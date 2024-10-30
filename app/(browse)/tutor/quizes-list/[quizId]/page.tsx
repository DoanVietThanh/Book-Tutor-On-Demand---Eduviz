"use client";

import { getQuizDetail } from "@/actions/quiz/get-quiz-detail";
import { useAuthContext } from "@/context/auth-provider";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type QuizDetailProps = {
  params: { quizId: string };
};

const QuizDetail = ({ params }: QuizDetailProps) => {
  const { accessToken } = useAuthContext();
  const [quizDetail, setQuizDetail] = useState<any>();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getQuizDetail(params.quizId, accessToken);
        if (!response.success) {
          toast.error("Get quiz detail failed");
          return;
        }
        setQuizDetail(response?.result);
      } catch (error) {
        console.error("Failed to fetch quiz detail:", error);
      }
    }
    fetchData();
  }, []);

  if (!quizDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 h-full bg-slate-50 overflow-y-auto container">
      <header className="p-4 flex flex-col justify-center items-center bg-white rounded-md">
        <p className="font-semibold text-xl">{quizDetail.quizTitle}</p>
        <div className="flex items-center gap-8">
          <span>{quizDetail.questionList.length} câu hỏi</span>
        </div>
        <div className="flex items-center gap-8">
          <span className="font-semibold">Duration {quizDetail.duration}</span>
        </div>
      </header>
      <div>
        {quizDetail.questionList.map((quiz: any, index: number) => (
          <div key={index} className="p-4 bg-white rounded-md shadow-lg my-4">
            <section className="pb-2 border-b-2">
              <span className="font-semibold text-red-500">Câu hỏi {index + 1}: </span>
              <span>{quiz?.questionText}</span>
            </section>
            <section className="py-4">
              {["A", "B", "C", "D"].map((letter) => (
                <div
                  key={letter}
                  className={`flex items-center py-2 gap-2 ${
                    letter == quiz.correctAnswer && "text-green-500 font-semibold"
                  }`}
                >
                  <span>{letter}. </span> <span>{quiz[`answer${letter}`]}</span>
                </div>
              ))}
            </section>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizDetail;
