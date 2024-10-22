"use client";

import { getQuizByClass } from "@/actions/quiz/get-quiz-by-class";
import { useAuthContext } from "@/context/auth-provider";
import Link from "next/link";
import { useEffect, useState } from "react";

type TutorQuizPageProps = {
  params: {
    classId: string;
  };
};

const TutorQuizPage = ({ params }: TutorQuizPageProps) => {
  const [quizzes, setQuizzes] = useState([]);
  const { accessToken } = useAuthContext();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getQuizByClass(params.classId, accessToken);
        setQuizzes(response?.result?.quizzes || []);
      } catch (error) {
        console.error("Failed to fetch courses or quizes:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container flex flex-col gap-4 min-h-[100vh] pt-4">
      <section className="py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {quizzes.length == 0 ? (
            <div className="text-center text-nowrap">No quizzes available at the moment.</div>
          ) : (
            quizzes.map((quiz: any, index) => (
              <Link
                href={`/tutor/classes/${params.classId}/quizz/${quiz?.quizId}`}
                key={index}
                className="text-sm bg-white p-4 rounded-md shadow-lg cursor-pointer"
              >
                <p className="font-semibold">{quiz?.quizTitle}</p>
                <p className="text-sm text-green-500">
                  {quiz?.numOfQuestion} questions - {quiz?.duration} minutes
                </p>
                <p>
                  Done: {quiz?.numOfStuAttempt} / {quiz?.totalStudents} students
                </p>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default TutorQuizPage;
