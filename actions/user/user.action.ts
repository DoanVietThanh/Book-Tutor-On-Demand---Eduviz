const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: "Thanh Đoàn",
        role: {
          id: 1,
          roleName: "admin",
        },
      });
    }, 1000);
  });
};

export { getCurrentUser };
