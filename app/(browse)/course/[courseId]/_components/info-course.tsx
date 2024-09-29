"use client";
import { getRelatedCourses } from "@/actions/course/get-related-courses";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import React, { useState } from "react";
import FeedbacksList from "./feedbacks-list";
import { formatStartDate } from "@/lib/utils";

type TutorInfoProps = {
  courseDetail: any;
  relatedCourses: any[];
};

const InfoCourse = ({ courseDetail, relatedCourses }: TutorInfoProps) => {
  const [selectedPackage, setSelectedPackage] = useState(relatedCourses[0] ? relatedCourses[0] : courseDetail);
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
        <div className="overflow-hidden rounded-lg p-4 shadow-lg">
          <Image src={`/assets/avatar-tutor.png`} alt="Avatar" width={400} height={400} className="rounded-md" />
        </div>
        <div className="flex flex-1 flex-col justify-between rounded-md border bg-white p-4 shadow-md">
          <div>
            <p className="border-b-2 font-serif text-3xl">Skills</p>
            <div className="flex justify-center">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full max-w-2xl"
              >
                <CarouselContent>
                  {relatedCourses.map((relatedCourseItem: any, index: number) => (
                    <CarouselItem key={index} className="my-4 md:basis-1/2">
                      <div className="flex flex-col justify-between items-center h-full border rounded-md shadow-md">
                        <div className=" h-20 flex items-center justify-center">
                          <Image
                            src={
                              relatedCourseItem.picture ||
                              `https://images.viblo.asia/1d949589-afdd-4a1e-b77f-c53fdaf8af13.png`
                            }
                            alt="Avatar"
                            width={60}
                            height={60}
                            className="rounded-md"
                          />
                        </div>
                        <div className="flex flex-col justify-end mx-2 overflow-auto text-center">
                          <p className="whitespace-nowrap">{relatedCourseItem.courseName}</p>
                          <div className="flex items-center gap-2 text-yellow-600">
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
            </div>
            <section className="flex gap-4 rounded-xl border p-4 shadow-lg">
              <Image
                src={selectedPackage.image || `https://images.viblo.asia/1d949589-afdd-4a1e-b77f-c53fdaf8af13.png`}
                alt="Avatar"
                width={160}
                height={160}
                className="rounded-md"
              />
              <div className="mx-2 flex flex-col gap-2">
                <p className="text-3xl font-bold">{selectedPackage.courseName}</p>
                <div className="flex items-center gap-2 text-yellow-600">
                  <Image src="/icons/coin.png" width={24} height={24} className="object-cover" alt="coin" />
                  {selectedPackage.price.toLocaleString("en-US")} / {selectedPackage?.duration} months
                </div>
                <p>
                  <span>Start Date: {formatStartDate(selectedPackage.startDate)} </span>
                  <span className="text-blue-600 font-bold">
                    (
                    {selectedPackage?.monthDuration
                      ? `${selectedPackage?.monthDuration} months`
                      : `${selectedPackage?.duration} months`}
                    )
                  </span>
                </p>

                {/* <div>
                  📅{" "}
                  {selectedPackage?.weekSchedule.map((item: any, index: number) => (
                    <span>{item} </span>
                  ))}
                </div> */}
                <p className="font-semibold ">
                  ⏰ {selectedPackage?.beginingClass} - {selectedPackage?.endingClass}
                </p>
              </div>
            </section>
          </div>
          {/* {role !== "Admin" && <TutorBooking tutorInfo={tutorInfo} selectedPackage={selectedPackage} />} */}
        </div>
      </section>

      <FeedbacksList selectedPackage={relatedCourses[0]} />
    </div>
  );
};

export default InfoCourse;
