/** @format */

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import DatePicker from "react-multi-date-picker";
import Button from "../../components/Button";
import Search from "../../components/Search/Search";
import listCities from "../../json/listCities.json";
describe("Navbar component test", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = ReactTestUtils.renderIntoDocument(<Search cities={listCities} />);
  });

  it("Header test", () => {
    ReactTestUtils.scryRenderedDOMComponentsWithTag(wrapper, "h1");
  });
  it("Calendar ClassName test", () => {
    ReactTestUtils.scryRenderedDOMComponentsWithClass(wrapper, <DatePicker />);
  });
  it("Button ClassName test", () => {
    ReactTestUtils.scryRenderedDOMComponentsWithClass(wrapper, <Button />);
  });
});
