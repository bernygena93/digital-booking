/** @format */

import axios from "axios";
import { endpointFeature } from "../config/endpoints";

export const getAllFeatures = () => {
  return axios.get(`${endpointFeature}read/all`);
};

export const getFeature = (id) => {
    return axios.get(`${endpointFeature}read/${id}`);
  };