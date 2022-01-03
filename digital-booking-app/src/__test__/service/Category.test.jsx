/** @format */
import axios from "axios";
import {
  getAllCategories,
  getCategoryById,
} from "../../service/categoryService";

jest.mock("axios");

describe("getCategoryById test", () => {
  it("get one category test", async () => {
    const data = {
      id: 1,
      name: "Hotel",
      description: "5 estrellas",
      urlImage:
        "https://previews.123rf.com/images/vladru/vladru1706/vladru170600013/80940168-hotel-cinco-estrellas-construyendo-ilustraci%C3%B3n-3d.jpg",
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(data));
    await expect(getCategoryById(1)).resolves.toEqual(data);
  });
  it("get all categories test", async () => {
    const dataList = [
      {
        id: 1,
        name: "Hotel",
        description: "5 estrellas",
        urlImage:
          "https://previews.123rf.com/images/vladru/vladru1706/vladru170600013/80940168-hotel-cinco-estrellas-construyendo-ilustraci%C3%B3n-3d.jpg",
      },
      {
        id: 2,
        name: "Hostel",
        description: "Para jipis",
        urlImage:
          "https://www.reportur.com/wp-content/uploads/2019/11/hostel2.jpg",
      },
      {
        id: 3,
        name: "Cuarto compartido",
        description: "Raaaaro",
        urlImage:
          "https://www.bowerpowerblog.com/wp-content/uploads/2017/01/boysbedroom-2-1.jpg",
      },
      {
        id: 4,
        name: "Cuarta categoria random",
        description: "salame con queso",
        urlImage:
          "https://www.laminasyposters.com.ar/upload1/Salame%20y%20queso%20100112447%20WEB%20II.jpg",
      },
    ];
    axios.get.mockImplementationOnce(() => Promise.resolve(dataList));
    await expect(getAllCategories()).resolves.toEqual(dataList);
  });
  it("get id categories test", async () => {
    const id = 1;
    axios.get.mockImplementationOnce(() => Promise.resolve(id));
    await expect(getCategoryById.call);
  });
});
