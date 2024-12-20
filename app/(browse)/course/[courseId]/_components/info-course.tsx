"use client";
import { purchaseCourse } from "@/actions/payment/purchase-course";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useAuthContext } from "@/context/auth-provider";
import { ROLES } from "@/enum";
import { formatStartDate } from "@/lib/utils";
import { Course } from "@/types/course";
import { Send, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Suspense, useState, useTransition } from "react";
import { toast } from "sonner";
import FeedbacksList from "./feedbacks-list";
import { Textarea } from "@/components/ui/textarea";
import { createCommentCourse } from "@/actions/course/create-comments";

type TutorInfoProps = {
  courseId: string;
  courseDetail: Course;
  relatedCourses: Course[];
};

const InfoCourse = ({ courseId, courseDetail, relatedCourses }: TutorInfoProps) => {
  const { accessToken, role } = useAuthContext();
  const router = useRouter();
  const [isPending, startPurchaseCourse] = useTransition();
  const [isPendingComment, startComment] = useTransition();
  const [comment, setComment] = useState<string>("");
  const [rate, setRate] = useState<number>(5);

  const handleBuyCourse = () => {
    try {
      startPurchaseCourse(async () => {
        const res = await purchaseCourse(courseId, accessToken);
        if (!res.success) {
          toast.error(res?.result?.message || "Upgrade Premium Account failed");
          return;
        }
        toast.success("Course purchased successfully");
        router.push(res?.result?.paymentLink);
      });
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleComment = async () => {
    if (!comment) {
      toast.info("Please enter a comment");
      return;
    }

    startComment(async () => {
      try {
        const res = await createCommentCourse({ comment, rate }, accessToken, courseId);
        if (!res.success) {
          toast.error(res?.result?.message || "Comment failed");
          return;
        }
        toast.success("Comment successfully");
        router.push(`/course/${courseId}`);
      } catch (error: any) {
        toast.error(error.message || "Something went wrong");
      }
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <section className="flex items-center justify-between gap-4 border p-8 shadow-md">
        <div className="flex items-center gap-4">
          <Image src={`/assets/avatar-tutor.png`} alt="Avatar" width={40} height={40} className="rounded-full" />
          <div className="flex flex-col">
            <p>
              Name <span className="font-bold">{courseDetail.mentorName}</span>
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="cursor-none">
            Share
          </Button>
          <Button variant="default" className="cursor-none">
            Follow
          </Button>
        </div>
      </section>

      <section className="flex flex-1 justify-center gap-8 p-8">
        <div className="overflow-hidden rounded-lg p-4 shadow-lg flex items-center justify-center">
          <Image src={`/assets/avatar-tutor.png`} alt="Avatar" width={400} height={400} className="rounded-md" />
        </div>
        <div className="flex flex-1 flex-col justify-between rounded-md border bg-white p-4 shadow-md">
          <div>
            <p className="border-b-2 font-serif text-3xl">Related courses</p>

            <section className="flex justify-center">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full max-w-2xl"
              >
                <CarouselContent>
                  {relatedCourses.map((relatedCourseItem: Course, index: number) => (
                    <CarouselItem
                      key={index}
                      className="py-4 md:basis-1/2 cursor-pointer overflow-hidden"
                      onClick={() => router.push(`/course/${relatedCourseItem.courseId}`)}
                    >
                      <div className="flex flex-col justify-between items-center h-full p-4 border rounded-md shadow-md ">
                        <div className="h-28 flex items-center justify-center hover:scale-105 duration-500 transition-all">
                          <Image
                            src={
                              relatedCourseItem.picture ||
                              `https://images.viblo.asia/1d949589-afdd-4a1e-b77f-c53fdaf8af13.png`
                            }
                            alt="Avatar"
                            width={100}
                            height={100}
                            className="rounded-md"
                          />
                        </div>
                        <div className="flex flex-col justify-end mx-2 overflow-auto text-center mt-2">
                          <p className="whitespace-nowrap font-semibold">{relatedCourseItem.courseName}</p>
                          <div className="flex items-center gap-2 text-yellow-600 text-center justify-center font-semibold">
                            <Image src="/icons/coin.png" width={16} height={16} className="object-cover" alt="coin" />
                            {relatedCourseItem.price.toLocaleString("en-US")} / {relatedCourseItem?.duration} months
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </section>

            <section className="flex gap-4 rounded-xl border p-4 shadow-lg">
              <Image
                src={courseDetail.picture || `https://images.viblo.asia/1d949589-afdd-4a1e-b77f-c53fdaf8af13.png`}
                alt="Avatar"
                width={140}
                height={100}
                className="rounded-md"
              />
              <div className="mx-2 flex flex-col gap-2 w-full">
                <p className="text-3xl font-bold">{courseDetail.courseName}</p>
                <div className="flex items-center gap-2 text-yellow-600 font-semibold">
                  <Image src="/icons/coin.png" width={24} height={24} className="object-cover" alt="coin" />
                  {courseDetail.price.toLocaleString("en-US")}
                </div>
                <p>
                  <span>📅 {formatStartDate(courseDetail.startDate)} </span>
                  <span className="text-blue-600 font-bold">
                    (
                    {courseDetail?.duration > 1
                      ? `${courseDetail?.duration} months`
                      : `${courseDetail?.duration} months`}
                    )
                  </span>
                </p>
                <p className="font-semibold ">
                  ⏰ {courseDetail?.beginingClass} - {courseDetail?.endingClass}
                </p>
                {role == ROLES.STUDENT && (
                  <div className="flex justify-end">
                    <Button
                      variant={"outline"}
                      disabled={isPending}
                      onClick={handleBuyCourse}
                      className="flex items-center gap-2 text-xl font-semibold shadow-lg border-2 "
                    >
                      <ShoppingCart /> Buy
                    </Button>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <Textarea onChange={(e) => setComment(e.target.value)} value={comment} placeholder="Leave a comment" />
        <div className="flex flex-col justify-end items-end gap-4">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className={`cursor-pointer flex items-center gap-2 ${
                  rate >= index + 1 ? "text-yellow-500" : "text-gray-400"
                }`}
                onClick={() => setRate(index + 1)}
              >
                <Star />
              </div>
            ))}
          </div>
          <Button
            variant={"outline"}
            disabled={isPendingComment}
            onClick={handleComment}
            className="flex items-center gap-2 text-xl font-semibold shadow-lg border-2 "
          >
            <Send /> Send
          </Button>
        </div>
      </section>
      <Suspense fallback={<div>Loading feedbacks...</div>}>
        <FeedbacksList courseId={courseId} />
      </Suspense>
    </div>
  );
};

export default InfoCourse;
