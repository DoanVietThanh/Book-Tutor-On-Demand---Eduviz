import axios from "axios";
const ServerURL = process.env.NEXT_PUBLIC_API_URL;

export const axiosClient = axios.create({
  baseURL: ServerURL,
  headers: {
    "Content-Type": "application/json",
  },
});
