import React from "react";
import Banner from "./_components/banner";
import BrowseFooter from "@/layouts/browse/browse-footer";
import CourseList from "./_components/course-list";

const HomePage = () => {
  return (
    <div>
      <div className="container min-h-[100vh]">
        <Banner />
        <CourseList />
      </div>
      <BrowseFooter />
    </div>
  );
};

export default HomePage;
