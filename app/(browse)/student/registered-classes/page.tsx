"use client";

import { getRegisteredClasses } from "@/actions/course/get-registered-classes copy";
import SearchClass from "@/components/search-class";
import { Badge } from "@/components/ui/badge";
import { useAuthContext } from "@/context/auth-provider";
import { formatStartDate } from "@/lib/utils";
import { Course } from "@/types/course";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const StudentRegisteredClasses = () => {
  const router = useRouter();
  const { user, accessToken } = useAuthContext();
  const [registeredClasses, setRegisteredClasses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegisteredClasses = async () => {
      try {
        const classes = await getRegisteredClasses(user?.userId, accessToken);
        setRegisteredClasses(classes);
      } catch (err) {
        setError("Failed to fetch classes.");
      } finally {
        setLoading(false);
      }
    };
    fetchRegisteredClasses();
  }, [user?.userId, accessToken]);

  if (loading) {
    return <div>Loading...</div>; // Optionally, you can add a loading spinner here
  }

  if (error) {
    return <div>{error}</div>; // Display error message if there's an error
  }

  return (
    <div className="p-4 h-full bg-slate-50 overflow-y-auto">
      <div className="flex justify-center">
        <SearchClass />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {registeredClasses.map((registeredClass, index) => (
          <div
            key={index}
            onClick={() => router.push(`/student/registered-classes/${registeredClass.courseId}`)}
            className="flex cursor-pointer rounded-md border bg-white p-4 shadow-md transition-all duration-300 ease-in-out hover:scale-105"
          >
            <img
              src={registeredClass.picture || "/assets/avatar-tutor.png"}
              alt="Avatar"
              className="rounded-md w-1/3 h-full object-cover"
            />
            <div className="flex-1 flex flex-col items-end justify-between h-full">
              <p className="font-semibold">{registeredClass.courseName}</p>
              <Badge variant={"green"}>{registeredClass.subjectName}</Badge>
              <p>{registeredClass.numOfStudents} students</p>
              <div className="text-md">
                📅 {formatStartDate(registeredClass.startDate)}
                <Badge variant={"secondary"}>{registeredClass.duration} month</Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentRegisteredClasses;
