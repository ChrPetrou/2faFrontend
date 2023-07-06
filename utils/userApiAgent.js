import axios from "axios";

const userApiAxios = axios.create({
  baseURL: process.env.NEXT_ENVIRONMENT_URL,
});

export const userApiAgent = {
  register: async ({
    firstname,
    surname,
    email,
    password,
    confirmPassword,
    phone,
    country,
  }) => {
    return userApiAxios
      .post("/users/register", {
        firstname,
        surname,
        email,
        password,
        confirmPassword,
        phone,
        country,
      })
      .then((res) => res.data);
  },
  signIn: async ({ email, password }) => {
    return userApiAxios
      .post("/users/sign-in", {
        email,
        password,
      })
      .then((res) => res.data);
  },
  authanticate: async ({ email, code }) => {
    return userApiAxios
      .post("/users/authanticate", {
        email,
        code,
      })
      .then((res) => res.data);
  },
};
