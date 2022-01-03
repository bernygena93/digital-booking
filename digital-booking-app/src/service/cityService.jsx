/** @format */

import axios from "axios";
import { endpointCity } from "../config/endpoints";

export const getAllCities = () => {
  return axios.get(`${endpointCity}read/all`);
};

export const getCityById = (id) => {
  return axios.get(`${endpointCity}read/${id}`);
};
export const saveCity = (requestInit) => {
  return axios.post(`${endpointCity}create/`, requestInit);
};
export const updateCity = (requestInit) => {
  return axios.put(`${endpointCity}update/`, requestInit);
};
export const deleteCityById = (id) => {
  return axios.delete(`${endpointCity}delete/${id}`);
};
