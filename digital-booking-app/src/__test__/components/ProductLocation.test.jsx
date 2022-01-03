/** @format */

import React from "react";
import ReactTestUtils, { act } from "react-dom/test-utils";
import listProducts from "../../json/listProducts.json";
import Maps from "../../components/Product/Maps";
import ProductLocation from "../../components/Product/ProductLocation";

describe("Description component test", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = ReactTestUtils.renderIntoDocument(
      <ProductLocation product={listProducts[0]} />
    );
  });
  it("Maps component test", () => {
    ReactTestUtils.scryRenderedDOMComponentsWithTag(
      wrapper,
      <Maps location={{ lat: -34.606938029112975, lng: -58.3918721446864 }} />
    );
  });
});
