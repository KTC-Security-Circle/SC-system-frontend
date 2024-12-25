import axios from "axios";
import { axiosInstance } from "./BaseApi";


export const SchoolInfoAPI = {
  // 学校情報を作成する関数
  createSchoolInfo: async (data: any) => {
    const response = await axiosInstance.post("/input/schoolinfo/", data);
    return response.data;
  },

  // 学校情報を取得する関数
  fetchSchoolInfo: async (params: any) => {
    const response = await axiosInstance.get("/view/schoolinfo/", { params });
    return response.data;
  },

  // 学校情報を更新する関数
  updateSchoolInfo: async (id: number, data: any) => {
    const response = await axiosInstance.put(`/update/schoolinfo/${id}/`, data);
    return response.data;
  },

  // 学校情報を削除する関数
  deleteSchoolInfo: async (id: number) => {
    const response = await axiosInstance.delete(`/delete/schoolinfo/${id}/`);
    return response.data;
  },
};
