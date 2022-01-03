/** @format */

import ReactTestUtils from "react-dom/test-utils";
import React from "react";
import Spinner from "../../components/Spinner";

describe("Spinner component test", () => {
  it("Spinner test", () => {
    let wrapper = ReactTestUtils.renderIntoDocument(<Spinner />);
    ReactTestUtils.scryRenderedDOMComponentsWithClass(wrapper, "spinner");
  });
});
