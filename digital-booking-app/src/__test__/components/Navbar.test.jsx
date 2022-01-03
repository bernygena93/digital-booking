/** @format */

import ReactTestUtils from "react-dom/test-utils";
import { render, fireEvent } from "@testing-library/react";
import React from "react";
import Navbar from "../../components/Navbar/Navbar";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/example/path",
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

const handleAcceptClick = jest.fn();

describe("Spinner component test", () => {
  it("Spinner test", () => {
    let wrapper = ReactTestUtils.renderIntoDocument(<Navbar />);
    ReactTestUtils.scryRenderedDOMComponentsWithClass(wrapper, "spinnerButtin");
  });
  it("", () => {
    const { container } = render(<Navbar />);
    let button = container.querySelectorAll("button");
    fireEvent.click(button[0]);
    expect(handleAcceptClick.mock.calls).toHaveLength(0);
  });
});
