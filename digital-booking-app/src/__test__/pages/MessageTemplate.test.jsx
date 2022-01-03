/** @format */

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import SuccessfulBooking from "../../pages/MessageTemplate";

describe("Description component test", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = ReactTestUtils.renderIntoDocument(
      <SuccessfulBooking
        title="Titulo"
        text="Texto"
        icon=""
        color="red"
        label="label"
        path=""
      />
    );
  });

  it("h2 component test", () => {
    ReactTestUtils.scryRenderedDOMComponentsWithTag(wrapper, "h2");
  });
});
