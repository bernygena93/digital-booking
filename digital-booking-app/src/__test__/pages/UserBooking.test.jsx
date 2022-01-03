/** @format */

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import UserBookings from "../../pages/UserBookings";

describe("Description component test", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = ReactTestUtils.renderIntoDocument(<UserBookings />);
  });
  it("Maps component test", () => {
    ReactTestUtils.scryRenderedDOMComponentsWithTag(wrapper, "h3");
  });
});
