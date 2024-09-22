import { getRelatedCourses } from "@/actions/course/get-related-courses";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import React from "react";

type TutorInfoProps = {
  courseDetail: any;
};

const InfoCourse = async ({ courseDetail }: TutorInfoProps) => {
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
                  <div>ahihi</div>
                  {/* {packagesTutor.map((packageItem: any, index: number) => (
                    <CarouselItem key={index} className="my-4 md:basis-1/2 lg:basis-1/3">
                      <div>
                        <Image
                          src={
                            packageItem.image || `https://images.viblo.asia/1d949589-afdd-4a1e-b77f-c53fdaf8af13.png`
                          }
                          alt="Avatar"
                          width={60}
                          height={60}
                          className="rounded-md"
                        />
                        <div className="mx-2 overflow-auto">
                          <p className="whitespace-nowrap">{packageItem.subject.name}</p>
                          <div className="flex items-center gap-2">
                            <Image src="/icons/coin.png" width={16} height={16} className="object-cover" alt="coin" />
                            {packageItem.pricePerHour} / hour
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))} */}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            <div className="flex gap-4 rounded-xl border p-4 shadow-lg">
              <Image
                src={`https://images.viblo.asia/1d949589-afdd-4a1e-b77f-c53fdaf8af13.png`}
                alt="Avatar"
                width={120}
                height={100}
                className="rounded-md"
              />
              <div className="mx-2 flex flex-col gap-2 font-semibold">
                {/* <p className="text-3xl font-bold">{selectedPackage.subject.name}</p> */}
                <div className="flex items-center gap-2 text-coin">
                  <Image src="/icons/coin.png" width={16} height={16} className="object-cover" alt="coin" />
                  {/* {selectedPackage.pricePerHour} / hour */}
                </div>
              </div>
            </div>
          </div>
          {/* {role !== "Admin" && <TutorBooking tutorInfo={tutorInfo} selectedPackage={selectedPackage} />} */}
        </div>
      </section>

      {/* <FeedbackList selectedPackage={selectedPackage} /> */}
    </div>
  );
};

export default InfoCourse;
