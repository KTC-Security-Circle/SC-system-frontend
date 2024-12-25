import axios from "axios";
 
export const axiosInstance = axios.create({
  baseURL: "http://localhost:7071/api", // APIのベースURLに合わせて変更
  headers: {
    "Content-Type": "application/json",
  },
});