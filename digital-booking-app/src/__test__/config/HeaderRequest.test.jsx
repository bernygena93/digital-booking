/** @format */
import { header } from "../../config/HeadersRequest";

describe("Config test", () => {
  it("headerRequest test", () => {
    const config = {
      headers: {
        Authorization: `Bearer token`,
      },
    };
    const headerReq = header("token");
    expect(config).toEqual(headerReq);
  });
});
