import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

const FeedbacksList = () => {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className={`flex flex-col gap-2 rounded-2xl border p-4 shadow-lg hover:bg-slate-100`}>
          <section className="flex items-center justify-between gap-4 px-4">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="/assets/avatar-student.jpg" alt="@shadcn" />
                <AvatarFallback>User</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="flex items-center gap-4">
                  <div className="font-serif text-xl font-semibold">Student Name</div>
                  <div className="font-semibold">
                    {new Date().toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </div>
                </div>
                <div className="italic">
                  Ratings{" "}
                  {Array.from({
                    length: 5,
                  }).map(() => "⭐️")}
                </div>
              </div>
            </div>
          </section>
          <section className="flex gap-4 p-4 font-medium">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi sapiente delectus excepturi eius nostrum
            ducimus, voluptate quia maxime error, nam eveniet minima labore vel consequuntur earum sunt fugit voluptates
            impedit.
          </section>
        </div>
      ))}
    </div>
  );
};

export default FeedbacksList;
