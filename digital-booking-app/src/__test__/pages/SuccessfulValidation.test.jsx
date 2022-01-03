/** @format */

import { render } from "@testing-library/react";
import SuccessfulValidation from "../../pages/SuccessfulValidation";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    code: "asdsadsadadadsadada",
  }),
}));

test("", () => {
  render(<SuccessfulValidation />);
});
