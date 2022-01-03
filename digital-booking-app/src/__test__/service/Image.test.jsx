/** @format */
import axios from "axios";
import { deleteImage } from "../../service/imageService";

jest.mock("axios");

describe("get Cities test", () => {
  it("get all cities test", async () => {
    axios.delete.mockImplementationOnce(() => Promise.resolve());
    await expect(deleteImage.call);
  });
});
