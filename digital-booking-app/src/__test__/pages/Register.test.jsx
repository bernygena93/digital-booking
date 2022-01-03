/** @format */

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import Register from "../../pages/Register";

describe("Register component test", () => {
  let handleChange;
  let wrapper;

  beforeEach(() => {
    handleChange = jest.fn();
    wrapper = ReactTestUtils.renderIntoDocument(
      <Register handleChange={handleChange} />
    );
  });

  it("Input test with Register component", () => {
    ReactTestUtils.scryRenderedDOMComponentsWithTag(
      wrapper,
      <input
        className="inputReg"
        id="password"
        type="password"
        name="password"
        required="required"
        onChange={handleChange}
      ></input>
    );
  });
  it("Validate input test Register component", () => {
    ReactTestUtils.scryRenderedDOMComponentsWithTag(
      wrapper,
      <input
        className="inputReg"
        id="password2"
        type="password"
        name="passwordConfirmation"
        required="required"
        onChange={handleChange}
      />
    );
  });
  it("Validate button test Register component", () => {
    const handleSubmit = jest.fn();
    const wrapper = ReactTestUtils.renderIntoDocument(
      <Register handleSubmit={handleSubmit} />
    );
    ReactTestUtils.scryRenderedDOMComponentsWithTag(
      wrapper,
      <input
        onClick={handleSubmit}
        type="submit"
        className="boton_crear"
        value="Crear Cuenta"
      />
    );
  });
});
