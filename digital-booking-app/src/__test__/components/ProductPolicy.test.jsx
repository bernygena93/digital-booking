/** @format */

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import ProductPolicy from "../../components/Product/ProductPolicy";
import Title from "../../components/Product/Title";

describe("Description component test", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = ReactTestUtils.renderIntoDocument(<ProductPolicy />);
  });

  it("h2 component test", () => {
    ReactTestUtils.scryRenderedDOMComponentsWithTag(
      wrapper,
      <Title title="¿Qué tenés que saber?" />
    );
  });
});
