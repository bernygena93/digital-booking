/** @format */

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import ConfirmDeleteImage from "../../components/Product/ConfirmDeleteImage";
import listProducts from "../../json/listProducts.json";

describe("Description component test", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = ReactTestUtils.renderIntoDocument(
      <ConfirmDeleteImage image={listProducts[0].images[0]} />
    );
  });

  it("h2 component test", () => {
    ReactTestUtils.scryRenderedDOMComponentsWithTag(wrapper, "h3");
  });
});
