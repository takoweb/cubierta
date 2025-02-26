const STAFF_CREDENTIALS = {
  username: "admin",
  password: "admin123",
};

export const login = (username: string, password: string) => {
  return (
    username === STAFF_CREDENTIALS.username &&
    password === STAFF_CREDENTIALS.password
  );
};
