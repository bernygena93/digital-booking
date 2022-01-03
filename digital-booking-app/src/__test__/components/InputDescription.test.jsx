/** @format */

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import InputDescription from "../../components/Product/InputDescription";
import listProducts from "../../json/listProducts.json";

const mockOnChange = jest.fn();
describe("Description component test", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = ReactTestUtils.renderIntoDocument(
      <InputDescription
        generalLabel="TextTarea"
        labelInput="Descripcion"
        className="firstDataDescription"
        placeholder="Escriba algo aqui..."
        onChange={mockOnChange}
        name="description"
        value="description"
      />
    );
  });

  it("h2 component test", () => {
    ReactTestUtils.scryRenderedDOMComponentsWithTag(wrapper, "h4");
  });
});
