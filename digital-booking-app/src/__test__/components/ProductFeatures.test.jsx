/** @format */

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import ProductFeatures from "../../components/Product/ProductFeatures";
import listProducts from "../../json/listProducts.json";

describe("Description component test", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = ReactTestUtils.renderIntoDocument(
      <ProductFeatures product={listProducts[0]} />
    );
  });

  it("h2 component test", () => {
    ReactTestUtils.scryRenderedDOMComponentsWithTag(wrapper, "p");
  });
});
