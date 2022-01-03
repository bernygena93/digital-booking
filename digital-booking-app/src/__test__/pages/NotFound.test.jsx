/** @format */

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import NotFound from "../../pages/NotFound";

test("h2 component test", () => {
  ReactTestUtils.renderIntoDocument(<NotFound />);
});
