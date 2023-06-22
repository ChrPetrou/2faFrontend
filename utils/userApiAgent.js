import axios from "axios";

const userApiAxios = axios.create({
  baseURL: process.env.NEXT_ENVIRONMENT_URL,
});

export const userApiAgent = {
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
