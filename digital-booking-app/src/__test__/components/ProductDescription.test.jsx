/** @format */

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import ProductDescription from "../../components/Product/ProductDescription";
import listProducts from "../../json/listProducts.json";

describe("Description component test", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = ReactTestUtils.renderIntoDocument(
      <ProductDescription product={listProducts[0]} />
    );
  });

  it("h2 component test", () => {
    ReactTestUtils.scryRenderedDOMComponentsWithTag(wrapper, "h2");
  });
});
