/** @format */
import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import Footer from "../../components/Footer/Footer";

describe("Footer component test", () => {
  it("Footer tag h4 test", () => {
    let wrapper = ReactTestUtils.renderIntoDocument(<Footer />);
    ReactTestUtils.scryRenderedDOMComponentsWithTag(wrapper, "h4");
  });
});
