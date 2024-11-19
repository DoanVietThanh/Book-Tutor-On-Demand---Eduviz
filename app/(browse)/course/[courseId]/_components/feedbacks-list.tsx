"use client";
import { getCommentCourse } from "@/actions/course/get-comments";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

type FeedbacksListProps = {
  courseId: string;
};

type Feedback = {
  ratingStar: number;
  comment: string;
  commentDate: string;
  userName: string;
};

const FeedbacksList = ({ courseId }: FeedbacksListProps) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    async function fetchFeedbacks() {
      const res = await getCommentCourse(courseId);
      setFeedbacks(res?.feedBacks || []);
    }
    fetchFeedbacks();
  }, [courseId]);

  if (feedbacks.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {feedbacks.map((feedback: Feedback, index: number) => (
        <div key={index} className={`flex flex-col gap-2 rounded-2xl border p-4 shadow-lg hover:bg-slate-100`}>
          <section className="flex items-center justify-between gap-4 px-4">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="/assets/avatar-student.jpg" alt="@shadcn" />
                <AvatarFallback>User</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="flex items-center gap-4">
                  <div className="font-serif text-xl font-semibold">{feedback.userName}</div>
                  <div className="font-semibold">
                    {new Date(feedback.commentDate).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </div>
                </div>
                <div className="flex items-center gap-2 italic text-nowrap">
                  Ratings&nbsp;
                  {Array.from({
                    length: feedback.ratingStar,
                  }).map(() => (
                    <Star size={16} fill="yellow" color="yellow" />
                  ))}
                  {Array.from({
                    length: 5 - feedback.ratingStar,
                  }).map(() => (
                    <Star size={16} fill="gray" color="gray" />
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section className="flex gap-4 p-4 font-medium">{feedback.comment}</section>
        </div>
      ))}
    </div>
  );
};

export default FeedbacksList;
