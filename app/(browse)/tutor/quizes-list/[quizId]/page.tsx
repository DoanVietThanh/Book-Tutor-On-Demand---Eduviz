import React from "react";

const QuizDetail = () => {
  return (
    <div className="p-4 h-full bg-slate-50 overflow-y-auto container">
      <header className="p-4 flex flex-col justify-center items-center bg-white rounded-md">
        <p className="font-semibold text-xl">Kiểm tra Toán định kì lần 1</p>
        <div className="flex items-center gap-8">
          <span>30 câu hỏi</span>
        </div>
      </header>
      <div>
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="p-4 bg-white rounded-md shadow-lg my-4">
            <section className="pb-2 border-b-2">
              <span className="font-semibold text-red-500">Câu hỏi {index + 1}: </span>
              <span>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero ipsa quas modi, nemo aliquam nihil
                molestiae, laborum quisquam cupiditate, sapiente obcaecati incidunt expedita error esse delectus
                molestias? Enim ?
              </span>
            </section>
            <section className="py-4">
              {["A", "B", "C", "D"].map((letter) => (
                <div key={letter} className={`flex items-center py-2 gap-2 ${letter === "A" && "font-semibold"}`}>
                  <span>{letter}. </span> <span>Lorem ipsum dolor sit amet.</span>
                </div>
              ))}
            </section>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizDetail;
