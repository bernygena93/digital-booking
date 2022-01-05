/** @format */

import axios from "axios";
import { endpointFeature } from "../config/endpoints";

export const getAllFeatures = () => {
  return axios.get(`${endpointFeature}/`);
};

export const getFeature = (id) => {
  return axios.get(`${endpointFeature}/${id}`);
};
