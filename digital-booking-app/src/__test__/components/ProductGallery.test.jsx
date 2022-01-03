/** @format */

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import { fireEvent, render } from "@testing-library/react";
import ProductGallery from "../../components/Product/ProductGallery";
import ShareIcon from "@mui/icons-material/Share";
import listProducts from "../../json/listProducts.json";
import Button from "../../components/Button";
import style from "../../components/styles/productDetail.module.css";

const mockHandleClick = jest.fn();

describe("Description component test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = ReactTestUtils.renderIntoDocument(
      <ProductGallery product={listProducts[0]} />
    );
  });
  it("Maps component test", () => {
    ReactTestUtils.scryRenderedDOMComponentsWithTag(
      wrapper,
      <ShareIcon className="shareIcon" />
    );
  });
});
