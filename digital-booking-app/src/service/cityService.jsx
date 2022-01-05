/** @format */

import axios from "axios";
import { endpointCity } from "../config/endpoints";

export const getAllCities = () => {
  return axios.get(`${endpointCity}read/all`);
};

export const getCityById = (id) => {
  return axios.get(`${endpointCity}/${id}`);
};
export const saveCity = (requestInit) => {
  return axios.post(`${endpointCity}/`, requestInit);
};
export const updateCity = (requestInit) => {
  return axios.put(`${endpointCity}/`, requestInit);
};
export const deleteCityById = (id) => {
  return axios.delete(`${endpointCity}/${id}`);
};
