/** @format */

import axios from "axios";
import { endpointUser } from "../config/endpoints";

export const registerUser = (userData) => {
  return axios.post(`${endpointUser}signup/`, userData);
};

export const loginUser = (userData) => {
  return axios.post(`${endpointUser}signin/`, userData);
};

export const validationEmail = (code) => {
  return axios.get(`${endpointUser}verifycode/${code}`);
};
