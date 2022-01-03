/** @format */

import { fireEvent, render } from "@testing-library/react";
import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import AdminProduct from "../../pages/AdminProduct";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: 1,
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

const mockHandleSubmit = jest.fn();

describe("Description component test", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = ReactTestUtils.renderIntoDocument(<AdminProduct />);
  });

  it("h2 component test", () => {
    ReactTestUtils.scryRenderedDOMComponentsWithTag(wrapper, "h3");
  });
});
