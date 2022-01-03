/** @format */
import React from "react";
import HeaderBelow from "../../components/Navbar/HeaderBelow";
import ReactTestUtils from "react-dom/test-utils";

describe("Navbar component test", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = ReactTestUtils.renderIntoDocument(<HeaderBelow />);
  });

  it("Header test", () => {
    ReactTestUtils.scryRenderedDOMComponentsWithTag(wrapper, "h2");
  });
  it("Header ClassName test", () => {
    ReactTestUtils.scryRenderedDOMComponentsWithClass(wrapper, "header_slogan");
  });
});
