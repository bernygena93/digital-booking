/** @format */
import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import SidePanel from "../../components/SidePanel";
import styles from "../../pages/styles/administrationPanel.module.css";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: 1,
  }),
}));

describe("Footer component test", () => {
  it("Footer tag h4 test", () => {
    let wrapper = ReactTestUtils.renderIntoDocument(
      <SidePanel labelProduct={"Alojamiento"} styles={styles} />
    );
  });
});
