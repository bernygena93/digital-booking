/** @format */

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import Image from "../../components/Image";

describe("Icon component test", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = ReactTestUtils.renderIntoDocument(<Image />);
  });

  it("Icon component test", () => {
    ReactTestUtils.scryRenderedDOMComponentsWithTag(
      wrapper,
      <img
        src="https://lh3.googleusercontent.com/proxy/Q7UZWX4KBy-Ttx4xtBQoPdDcVvAF2TTtuLb9n1Myki9M-M96R9TshGQhCs-WC1mKbUiFAJ7s289nDNxokXctTiQFA1i4xJZhpNh6bL4HBaIMrk-iTxyLIjiqsvHhdvQPqmqRb1pEK96mKgArtUjq5ZO91VnI9A=w296-h202-n-k-rw-no-v2"
        alt="alt"
      />
    );
  });
});
