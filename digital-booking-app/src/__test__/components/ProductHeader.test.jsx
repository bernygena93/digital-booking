/** @format */

import React from "react";
import ReactTestUtils, { act } from "react-dom/test-utils";
import ProductHeader from "../../components/Product/ProductHeader";
import listProducts from "../../json/listProducts.json";

describe("Description component test", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = ReactTestUtils.renderIntoDocument(
      <ProductHeader product={listProducts[0]} />
    );
  });
  it("h2 component test", () => {
    ReactTestUtils.scryRenderedDOMComponentsWithTag(wrapper, "h2");
  });
});
