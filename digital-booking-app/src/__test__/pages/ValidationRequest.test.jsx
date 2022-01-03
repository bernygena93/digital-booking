/** @format */

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import VerificationRequest from "../../pages/VerificationRequest";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    type: "pepe",
  }),
}));

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useLocation: () => ({
    pathname: "localhost:3000/example/path",
  }),
}));

describe("Description component test", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = ReactTestUtils.renderIntoDocument(<VerificationRequest />);
  });
  it("Maps component test", () => {
    ReactTestUtils.scryRenderedDOMComponentsWithTag(wrapper, "h3");
  });
});
