export const getPackagesBySubjectName = async (subjectName: string) => {
  return [
    {
      id: "1", // Convert number to string
      subjectId: "1",
      tutorId: "1",
      pricePerHour: 300,
      images: [],
      video: null,
      createdAt: "2022-12-01T00:00:00.000Z",
      subject: {
        id: "1", // Convert number to string
        name: "English",
        image: "",
        description: "",
      },
      tutor: {
        id: "1", // Convert number to string
        roleId: "1",
        clerkId: "1",
        email: "tqQpU@example.com",
        fullName: "Nguyen Van A",
        avatar: "",
        balance: 0,
        lockPayment: false,
      },
      totalReservations: 0,
      averageFeedbacksValue: 0,
    },
  ];
};
