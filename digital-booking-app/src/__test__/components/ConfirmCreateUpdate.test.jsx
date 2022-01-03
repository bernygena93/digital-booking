/** @format */

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import ConfirmCreateUpdate from "../../components/Product/ConfirmCreateUpdate";

describe("Description component test", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = ReactTestUtils.renderIntoDocument(<ConfirmCreateUpdate />);
  });

  it("h2 component test", () => {
    ReactTestUtils.scryRenderedDOMComponentsWithTag(wrapper, "h3");
  });
});
