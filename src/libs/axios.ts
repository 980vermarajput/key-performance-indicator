import axios from "axios";

export const axiosHandler = axios.create({
  baseURL: "https://sundial-fe-interview.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});
