import { getSubjects } from "@/actions/subject/get-subjects";
import React from "react";
import PackageList from "./package-list";

const SubjectsList = async () => {
  const subjects = await getSubjects();
  if (!subjects) return null;

  return (
    <div>
      {subjects?.map((subject: any) => (
        <PackageList key={subject.id} subjectName={subject.name} subject={subject} />
      ))}
    </div>
  );
};

export default SubjectsList;
