"use client";
import { getRegisteredQuizByClassId } from "@/actions/quiz/get-registered-quizzes";
import { useAuthContext } from "@/context/auth-provider";
import Link from "next/link";
import { useEffect, useState } from "react";

type TutorQuizPageProps = {
  params: {
    classId: string;
  };
};

type QuizResponse = {
  duration: string;
  numOfQuestion: number;
  numOfStuAttempt: number;
  quizId: string;
  quizTitle: string;
  totalStudent: number;
};

const TutorQuizPage = ({ params }: TutorQuizPageProps) => {
  const { accessToken } = useAuthContext();
  const [quizzes, setQuizzes] = useState<QuizResponse[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getRegisteredQuizByClassId(params.classId, accessToken);
        console.log("🚀 ~ fetchData ~ response:", response);
        setQuizzes(response?.result?.quizzes || []);
      } catch (error) {
        console.error("Failed to fetch courses or quizes:", error);
      }
    }
    fetchData();
  }, []);

  if (!quizzes) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container flex flex-col gap-4 min-h-[100vh] pt-4">
      <section className="py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {quizzes.map((quiz, index) => (
            <Link
              key={index}
              href={`/student/registered-classes/${params.classId}/quizz/${quiz.quizId}`}
              className="text-sm bg-white p-4 rounded-md shadow-lg cursor-pointer"
            >
              <p className="font-semibold">{quiz.quizTitle}</p>
              <p className="text-sm text-green-500">
                {quiz.numOfQuestion} questions - {quiz.duration} minutes
              </p>
              <p>
                Done: {quiz.numOfStuAttempt} / {quiz.totalStudent} students{" "}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TutorQuizPage;
