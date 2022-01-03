/** @format */

import axios from "axios";
import { endpointBooking } from "../config/endpoints";

export const createBooking = (requestInit, config) => {
  return axios.post(`${endpointBooking}create/`, requestInit, config);
};

export const getBookingsByUser = (userId) => {
  return axios.get(`${endpointBooking}userbookings/${userId}`);
};

export const getBookingById = (id) => {
  return axios.get(`${endpointBooking}read/${id}`);
};
export const deleteBookingById = (id, config) => {
  return axios.delete(`${endpointBooking}${id}`, config);
};
