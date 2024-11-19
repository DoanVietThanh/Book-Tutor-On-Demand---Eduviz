"use client";
import { getViewHistory } from "@/actions/quiz/get-view-history";
import { Badge } from "@/components/ui/badge";
import { useAuthContext } from "@/context/auth-provider";
import { Separator } from "@radix-ui/react-select";
import { ArrowBigLeft, Check, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const StudentQuizHistory = () => {
  const searchParams = useSearchParams();
  const { accessToken } = useAuthContext();
  const studentId = searchParams.get("studentId") as string;
  const studentQuizScoreId = searchParams.get("studentQuizScoreId") as string;
  const [quizHistoryDetail, setQuizHistoryDetail] = useState<any>();

  useEffect(() => {
    async function fetchData() {
      const response = await getViewHistory(studentId, studentQuizScoreId, accessToken);
      if (!response.success) {
        toast.error(response?.result?.message || "Get view history failed");
        return;
      }
      setQuizHistoryDetail(response.result);
    }
    fetchData();
  }, [studentId, studentQuizScoreId]);

  return (
    <div className="p-4 h-full bg-slate-50 overflow-y-auto container">
      <header className="p-4 flex flex-col justify-center items-center bg-white rounded-md">
        <p className="font-semibold text-xl">{quizHistoryDetail?.quizTitle}</p>
        <div className="flex flex-col items-center">
          <p>{quizHistoryDetail?.resultList.length} câu hỏi</p>
          <p className="font-semibold text-lg flex items-center gap-4">
            <ArrowBigLeft className="w-10 h-10 cursor-pointer text-blue-500" onClick={() => window.history.back()} />{" "}
            Điểm
            <Badge variant="destructive" className="text-xl px-8">
              {quizHistoryDetail?.score}
            </Badge>
          </p>
        </div>
      </header>
      <div>
        {quizHistoryDetail?.resultList.map((quiz: any, index: number) => (
          <div key={index} className="p-4 bg-white rounded-md shadow-lg my-4">
            <section className="pb-2 border-b-2">
              <span className="font-semibold text-red-500">Câu hỏi {index + 1}: </span>
              <span>{quiz?.questionText}</span>
            </section>
            <section className="py-4">
              {["A", "B", "C", "D"].map((letter) => (
                <div
                  key={letter}
                  className={`flex justify-between items-center py-2 gap-2 px-8 rounded-lg ${
                    letter == quiz.correctAnswer && "text-green-500 font-semibold"
                  } ${letter == quiz.studentAnswer && "bg-blue-200 font-semibold"}`}
                >
                  <span>
                    <span>{letter}. </span> <span>{quiz[`answer${letter}`]}</span>
                  </span>
                  {letter == quiz.correctAnswer && letter == quiz.studentAnswer && <Check className="text-green-400" />}
                  {quiz.studentAnswer !== quiz.correctAnswer && letter == quiz.studentAnswer && (
                    <X className="text-red-700" size={24} />
                  )}
                </div>
              ))}
              <Separator />
              <div className="text-green-400 font-bold border-t-2 p-4 pb-0">Đáp án đúng: {quiz?.correctAnswer}</div>
            </section>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentQuizHistory;
