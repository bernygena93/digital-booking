/** @format */

import ReactTestUtils from "react-dom/test-utils";
import React from "react";
import SpinnerButton from "../../components/SpinnerButton";

describe("Spinner component test", () => {
  it("Spinner test", () => {
    let wrapper = ReactTestUtils.renderIntoDocument(<SpinnerButton />);
    ReactTestUtils.scryRenderedDOMComponentsWithClass(wrapper, "spinnerButtin");
  });
});
