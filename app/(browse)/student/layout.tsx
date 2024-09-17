import BrowserSidebar from "@/layouts/browse/browser-sidebar";
import { ReactNode } from "react";

const StudentLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-full">
      <div className="w-1/6 border-r-2">
        <BrowserSidebar />
      </div>
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
};

export default StudentLayout;
