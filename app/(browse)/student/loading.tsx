import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

const StudentPageLoading = () => {
  return (
    <div className="container flex flex-col space-y-3">
      <Skeleton className="h-[100px] w-full rounded-xl" />
      <Skeleton className="h-[100px] w-full rounded-xl" />
      <Skeleton className="h-[100px] w-full rounded-xl" />
      <Skeleton className="h-[100px] w-full rounded-xl" />
    </div>
  );
};

export default StudentPageLoading;
