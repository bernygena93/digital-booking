/** @format */
import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import App from "../App";
import Drawer from "../components/Navbar/Drawer";

describe("Drawer component test", () => {
  it("Drawer test with App component", () => {
    let wrapper = ReactTestUtils.renderIntoDocument(<App />);
    ReactTestUtils.scryRenderedDOMComponentsWithTag(
      wrapper,
      <Drawer drawerOpen={false} drawerToggle={() => false} />
    );
  });
});
