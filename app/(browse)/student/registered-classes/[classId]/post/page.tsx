"use client";

import CreatePost from "./create-post";
import PostsList from "./posts-list";

type TutorPostPageProps = {
  params: {
    classId: string;
  };
};

const TutorPostPage = ({ params }: TutorPostPageProps) => {
  return (
    <div className="container bg-slate-100 flex flex-col gap-4 min-h-[100vh] pt-4 pb-10">
      <CreatePost />
      <PostsList />
    </div>
  );
};

export default TutorPostPage;
