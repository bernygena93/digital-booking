/** @format */

import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import BookingContext from "../../context/BookingContext";
import ReactTestUtils from "react-dom/test-utils";
import Booking from "../../pages/Booking";

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

const mockHandleSubmit = jest.fn();

describe("Description component test", () => {
  let wrapper;
  let context;
  beforeEach(() => {
    wrapper = ReactTestUtils.renderIntoDocument(<Booking />);
    context = renderHook(() => useContext(), { wrapperContext });
  });
  it("Maps component test", () => {
    ReactTestUtils.scryRenderedDOMComponentsWithTag(wrapper, "h2");
  });
});
