import TutorSidebar from "@/layouts/browse/tutor-sidebar";
import { ReactNode } from "react";

const TutorLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-full">
      <div className="w-1/6 border-r-2">
        <TutorSidebar />
      </div>
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
};

export default TutorLayout;
