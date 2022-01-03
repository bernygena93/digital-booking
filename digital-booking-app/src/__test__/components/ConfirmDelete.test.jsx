/** @format */

import { fireEvent, render } from "@testing-library/react";
import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import ConfirmDelete from "../../components/Product/ConfirmDelete";
import listProducts from "../../json/listProducts.json";

const handleAcceptClick = jest.fn();

describe("Description component test", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = ReactTestUtils.renderIntoDocument(
      <ConfirmDelete product={listProducts[0]} />
    );
  });

  it("h2 component test", () => {
    ReactTestUtils.scryRenderedDOMComponentsWithTag(wrapper, "h3");
  });
  it("", () => {
    const { container } = render(<ConfirmDelete product={listProducts[0]} />);
    let button = container.querySelectorAll("button");
    fireEvent.click(button[0]);
    expect(handleAcceptClick.mock.calls).toHaveLength(0);
  });
});
