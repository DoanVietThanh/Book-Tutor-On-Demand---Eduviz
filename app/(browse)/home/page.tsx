import BrowseFooter from "@/layouts/browse/browse-footer";
import Banner from "./_components/banner";
import CoursesList from "./_components/courses-list";

const HomePage = () => {
  return (
    <div>
      <div className="container min-h-[100vh]">
        <Banner />
        <CoursesList />
      </div>
      <BrowseFooter />
    </div>
  );
};

export default HomePage;
