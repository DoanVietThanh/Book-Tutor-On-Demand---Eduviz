type TutorClassDetailProps = {
  params: { classId: string };
};

const TutorClassDetail = ({ params }: TutorClassDetailProps) => {
  return (
    <div className="pt-4 overflow-y-auto">
      <div>Class ID {params.classId}</div>
      <div>Table students</div>
    </div>
  );
};

export default TutorClassDetail;
