import BrowseHeader from "@/layouts/browse/browse-header";
import React, { ReactNode } from "react";

const BrowseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative">
      <BrowseHeader />
      <div className="flex h-screen flex-col pt-12">{children}</div>
    </div>
  );
};

export default BrowseLayout;
