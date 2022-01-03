/** @format */

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import ProductInfo from "../../components/Product/ProductInfo";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import listProducts from "../../json/listProducts.json";

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useLocation: () => ({
    pathname: "localhost:3000/example/path",
  }),
}));

describe("Description component test", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = ReactTestUtils.renderIntoDocument(
      <ProductInfo product={listProducts[0]} />
    );
  });

  it("h2 component test", () => {
    ReactTestUtils.scryRenderedDOMComponentsWithTag(
      wrapper,
      <LocationOnIcon />
    );
  });
});
