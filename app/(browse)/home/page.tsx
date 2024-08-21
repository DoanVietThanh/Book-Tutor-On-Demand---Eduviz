import React from "react";
import Banner from "./_components/banner";
import BrowseFooter from "@/layouts/browse/browse-footer";

const HomePage = () => {
  return (
    <div>
      <div className="container min-h-[100vh]">
        <Banner />
        <div className=""></div>
      </div>
      <BrowseFooter />
    </div>
  );
};

export default HomePage;
