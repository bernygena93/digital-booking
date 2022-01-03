/** @format */
import axios from "axios";
import { getAllCities, getCityById } from "../../service/cityService";

jest.mock("axios");

describe("get Cities test", () => {
  it("get all cities test", async () => {
    const dataList = [
      {
        id: 1,
        name: "Bogotá",
        country: "Colombia",
      },
      {
        id: 2,
        name: "Medellín",
        country: "Colombia",
      },
      {
        id: 3,
        name: "Cali",
        country: "Colombia",
      },
      {
        id: 4,
        name: "Barranquilla",
        country: "Colombia",
      },
      {
        id: 5,
        name: "Buenos Aires",
        country: "Argentina",
      },
      {
        id: 6,
        name: "Córdoba",
        country: "Argentina",
      },
      {
        id: 7,
        name: "Rosario",
        country: "Argentina",
      },
      {
        id: 8,
        name: "Mar del Plata",
        country: "Argentina",
      },
    ];
    axios.get.mockImplementationOnce(() => Promise.resolve(dataList));
    await expect(getAllCities()).resolves.toEqual(dataList);
  });
});
