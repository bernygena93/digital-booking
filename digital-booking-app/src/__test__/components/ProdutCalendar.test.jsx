/** @format */

import React, { useContext } from "react";
import ReactTestUtils from "react-dom/test-utils";
import { renderHook } from "@testing-library/react-hooks";
import BookingContext from "../../context/BookingContext";
import ProductCalendar from "../../components/Product/ProductCalendar";
import { useLocation } from "react-router";

const BookingContextProvider = (children) => {
  <BookingContext.Provider>{children}</BookingContext.Provider>;
};
const wrapperContext = (children) => {
  <BookingContextProvider>{children}</BookingContextProvider>;
};

let contextValue = {};

const mockSetContext = jest.fn().mockImplementation(() => {
  const mockFilter = jest.fn();
  const context = {
    filterType: mockFilter,
  };
  contextValue = [...context];
});

const mockUseContext = jest.fn().mockImplementation(() => ({
  setContext: mockSetContext,
}));
React.useContext = mockUseContext;

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useLocation: () => ({
    pathname: "localhost:3000/example/path",
  }),
}));

describe("Login component test", () => {
  let context;
  let wrapper;
  beforeEach(() => {
    context = renderHook(() => useContext(), { wrapperContext });
    wrapper = ReactTestUtils.renderIntoDocument(<ProductCalendar />);
  });

  it("ListProduct component test", () => {
    ReactTestUtils.scryRenderedDOMComponentsWithTag(
      wrapper,
      <h4>Agregá tus fechas de viaje para obtener precios exactos</h4>
    );
  });
});
