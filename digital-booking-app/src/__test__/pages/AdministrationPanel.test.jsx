/** @format */

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import { fireEvent, getByText, render } from "@testing-library/react";
import AdministrationPanel from "../../pages/AdministrationPanel";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    data: "accommodation",
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

const mockHandleClick = jest.fn();
describe("Description component test", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = ReactTestUtils.renderIntoDocument(<AdministrationPanel />);
  });

  it("h2 component test", () => {
    ReactTestUtils.scryRenderedDOMComponentsWithTag(wrapper, "h3");
  });
  it("", () => {
    const { container } = render(<AdministrationPanel />);
    let button = container.querySelector("button");
    fireEvent.click(button);
    expect(mockHandleClick.mock.calls).toHaveLength(0);
  });
});
