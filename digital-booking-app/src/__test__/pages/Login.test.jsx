/** @format */

/** @format */

import React, { useContext } from "react";
import ReactTestUtils from "react-dom/test-utils";
import { renderHook } from "@testing-library/react-hooks";
import BookingContext from "../../context/BookingContext";
import Login from "../../pages/Login";

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

describe("Login component test", () => {
  let context;
  let wrapper;

  beforeEach(() => {
    context = renderHook(() => useContext(), { wrapperContext });
    wrapper = ReactTestUtils.renderIntoDocument(<Login />);
  });

  it("Button component test", () => {
    ReactTestUtils.scryRenderedDOMComponentsWithTag(
      wrapper,
      <input type="submit" className="boton_ingresar" value="Ingresar" />
    );
  });
});
