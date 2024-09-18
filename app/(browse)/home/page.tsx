import React from "react";
import Banner from "./_components/banner";
import BrowseFooter from "@/layouts/browse/browse-footer";
import SubjectsList from "./_components/subjects-list";

const HomePage = () => {
  return (
    <div>
      <div className="container min-h-[100vh]">
        <Banner />
        <SubjectsList />
      </div>
      <BrowseFooter />
    </div>
  );
};

export default HomePage;
