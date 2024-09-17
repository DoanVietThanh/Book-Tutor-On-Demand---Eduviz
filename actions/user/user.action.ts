import { ROLES } from "@/enum";

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: "Thanh Đoàn",
        role: {
          id: 1,
          // roleName: ROLES.ADMIN,
          roleName: ROLES.TUTOR,
          // roleName: ROLES.STUDENT,
        },
      });
    }, 1000);
  });
};

export { getCurrentUser };
