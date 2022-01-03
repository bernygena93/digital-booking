/** @format */

import ReactTestUtils from "react-dom/test-utils";
import { render, fireEvent } from "@testing-library/react";
import React from "react";
import ProductRating from "../../components/Product/ProductRating";
import listProduct from "../../json/listProducts.json";

const handleAcceptClick = jest.fn();

describe("Spinner component test", () => {
  let wrapper;
  it("Spinner test", () => {
    wrapper = ReactTestUtils.renderIntoDocument(
      <ProductRating product={listProduct[0]} />
    );
  });
  it("", () => {
    ReactTestUtils.scryRenderedDOMComponentsWithClass(wrapper, "spinnerButtin");
  });
});
