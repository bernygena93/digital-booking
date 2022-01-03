/** @format */

import React, { useContext } from "react";
import ReactTestUtils from "react-dom/test-utils";
import { renderHook } from "@testing-library/react-hooks";
import BookingContext from "../../context/BookingContext";
import FilteredProductPage from "../../pages/FilteredProductPage";
import ListProduct from "../../components/List/ListProduct";
import listProducts from "../../json/listProducts.json";
import citiesList from "../../json/listCities.json";
import Spinner from "../../components/Spinner";
import Search from "../../components/Search/Search";

const BookingContextProvider = (children) => {
  <BookingContext.Provider>{children}</BookingContext.Provider>;
};
const wrapperContext = (children) => {
  <BookingContextProvider>{children}</BookingContextProvider>;
};

let contextValue = {};

const mockSetContext = jest.fn().mockImplementation((context) => {
  contextValue = [...context];
});

const mockUseContext = jest.fn().mockImplementation(() => ({
  setContext: mockSetContext,
}));
React.useContext = mockUseContext;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: 1,
  }),
}));

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useLocation: () => ({
    pathname: "localhost:3000/example/path",
  }),
}));

const useQuery = jest.fn();

describe("Login component test", () => {
  let context;
  let wrapper;
  beforeEach(() => {
    wrapper = ReactTestUtils.renderIntoDocument(
      <FilteredProductPage query={useQuery} />
    );

    context = renderHook(() => useContext(), { wrapperContext });
  });

  it("ListProduct component test", () => {
    ReactTestUtils.scryRenderedDOMComponentsWithTag(wrapper, <Spinner />);
  });
  it("ListProduct component test", () => {
    ReactTestUtils.scryRenderedDOMComponentsWithTag(
      wrapper,
      <ListProduct products={listProducts} title="category" />
    );
  });
  it("ListProduct component test", () => {
    ReactTestUtils.scryRenderedDOMComponentsWithTag(
      wrapper,
      <Search cities={citiesList} />
    );
  });
});
