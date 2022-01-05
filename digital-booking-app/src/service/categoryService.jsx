/** @format */

import axios from "axios";
import { endpointCategory } from "../config/endpoints";

export const getAllCategories = () => {
  return axios.get(`${endpointCategory}/`);
};
export const getCategoryById = (id) => {
  return axios.get(`${endpointCategory}/${id}`);
};
export const saveCategory = (requestInit) => {
  return axios.post(`${endpointCategory}/`, requestInit);
};
export const updateCategory = (requestInit) => {
  return axios.put(`${endpointCategory}/`, requestInit);
};
export const deleteCategoryById = async (id) => {
  return axios.delete(`${endpointCategory}/${id}`);
};
