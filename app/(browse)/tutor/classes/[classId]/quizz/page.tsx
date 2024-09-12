import Link from "next/link";

const TutorQuizPage = () => {
  return (
    <div className="container flex flex-col gap-4 min-h-[100vh] pt-4">
      <section className="py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <Link
              href={`/tutor/classes/${index + 1}/quizz/${index + 1}`}
              key={index}
              className="text-sm bg-white p-4 rounded-md shadow-lg cursor-pointer"
            >
              <p className="font-semibold">Quiz Name {index + 1}</p>
              <p className="text-sm text-green-500">
                {1 + Math.floor(Math.random() * 50)} questions - {1 + Math.floor(Math.random() * 50)} minutes
              </p>
              <p>Done: {1 + Math.floor(Math.random() * 50)} / 50 students </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TutorQuizPage;
