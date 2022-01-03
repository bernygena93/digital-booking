/** @format */

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import ResultMessage from "../../pages/ResultMessage";
import MessageTemplate from "../../pages/MessageTemplate";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    type: "failedCreation",
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
    wrapper = ReactTestUtils.renderIntoDocument(<ResultMessage />);
  });

  it("h2 component test", () => {
    ReactTestUtils.scryRenderedDOMComponentsWithTag(
      wrapper,
      <MessageTemplate
        title="Titulo"
        text="Texto"
        icon=""
        color="red"
        label="label"
        path=""
      />
    );
  });
});
