/** @format */

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import Spinner from "../../components/Spinner";
import ProductDetail from "../../pages/ProductDetail";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: 1,
  }),
}));

describe("Description component test", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = ReactTestUtils.renderIntoDocument(<ProductDetail />);
  });
  it("Maps component test", () => {
    ReactTestUtils.scryRenderedDOMComponentsWithTag(wrapper, <Spinner />);
  });
});
