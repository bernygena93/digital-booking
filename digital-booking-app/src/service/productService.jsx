/** @format */

import axios from "axios";
import { endpointProduct } from "../config/endpoints";

export const getAllProducts = () => {
  return axios.get(`${endpointProduct}read/all`);
};
export const getProductByCategory = (id) => {
  return axios.get(`${endpointProduct}read/category/${id}`);
};
export const getProductByCity = (id) => {
  return axios.get(`${endpointProduct}read/city/${id}`);
};
export const getProductById = (id) => {
  return axios.get(`${endpointProduct}read/${id}`);
};
export const saveProduct = (requestInit, config) => {
  return axios.post(`${endpointProduct}create/`, requestInit, config);
};
export const updateProduct = (requestInit, config) => {
  return axios.put(`${endpointProduct}update/`, requestInit, config);
};
export const deleteProductById = (id, config) => {
  return axios.delete(`${endpointProduct}${id}`, config);
};
export const getProductByDateAndCity = (checkIn, checkOut, cityId) => {
  return axios.get(
    `${endpointProduct}search?checkInDate=${checkIn}&checkOutDate=${checkOut}&cityId=${cityId}`
  );
};
