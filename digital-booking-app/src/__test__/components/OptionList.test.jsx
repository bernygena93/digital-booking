/** @format */

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import OptionList from "../../components/List/OptionList";
import listProducts from "../../json/listProducts.json";

describe("Description component test", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = ReactTestUtils.renderIntoDocument(
      <OptionList
        info={listProducts[0].name}
        label={"Nombre"}
        className="optionsListTwo"
      />
    );
  });

  it("h2 component test", () => {
    ReactTestUtils.scryRenderedDOMComponentsWithTag(wrapper, "h2");
  });
});
