/** @format */

import axios from "axios";
import { endpointCategory } from "../config/endpoints";

export const getAllCategories = () => {
  return axios.get(`${endpointCategory}read/all`);
};
export const getCategoryById = (id) => {
  return axios.get(`${endpointCategory}read/${id}`);
};
export const saveCategory = (requestInit) => {
  return axios.post(`${endpointCategory}create/`, requestInit);
};
export const updateCategory = (requestInit) => {
  return axios.put(`${endpointCategory}update/`, requestInit);
};
export const deleteCategoryById = async (id) => {
  return axios.delete(`${endpointCategory}delete/${id}`);
};
