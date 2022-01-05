/** @format */

import axios from "axios";
import { endpointImage } from "../config/endpoints";

export const deleteImage = (id) => {
  return axios.delete(`${endpointImage}/${id}`);
};
