export const getSubjects = () => [
  {
    id: 1,
    name: "English",
  },
  {
    id: 2,
    name: "Math",
  },
  {
    id: 3,
    name: "Science",
  },
];

export const getSubject = (id: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: "English",
      });
    }, 1000);
  });
};
