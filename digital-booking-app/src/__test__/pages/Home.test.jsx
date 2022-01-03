/** @format */

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import ListCategory from "../../components/List/ListCategory";
import List from "../../components/List/ListProduct";
import listProducts from "../../json/listProducts.json";
import listCategories from "../../json/listCategories.json";
import Spinner from "../../components/Spinner";
import Home from "../../pages/Home";
import Search from "../../components/Search/Search";

//=============================================================
describe("ListCategory component test", () => {
  it("Title listCategory component test", () => {
    let wrapper = ReactTestUtils.renderIntoDocument(
      <ListCategory categories={listCategories} />
    );
    ReactTestUtils.scryRenderedDOMComponentsWithTag(wrapper, "h2");
  });
});

//=============================================================
describe("List component test", () => {
  it("Title List component test", () => {
    let wrapper = ReactTestUtils.renderIntoDocument(
      <List products={listProducts} />
    );
    ReactTestUtils.scryRenderedDOMComponentsWithTag(wrapper, "h2");
  });
});

//=============================================================
describe("component rendered correctly", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = ReactTestUtils.renderIntoDocument(<Home />);
  });

  it("Render Spinner component test", () => {
    ReactTestUtils.scryRenderedDOMComponentsWithTag(wrapper, <Spinner />);
  });
  it("Render Search component test", () => {
    ReactTestUtils.scryRenderedDOMComponentsWithTag(wrapper, <Search />);
  });
});
