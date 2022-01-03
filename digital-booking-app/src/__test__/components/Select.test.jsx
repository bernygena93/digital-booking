/** @format */

import { fireEvent, render } from "@testing-library/react";
import Select from "../../components/Search/Select";
import cities from "../../json/listCities.json";

const mockHandleClick = jest.fn();
const mockOnFilter = jest.fn();
const mockSelected = jest.fn();
test("", () => {
  const { getByText } = render(
    <Select
      onFilter={mockOnFilter}
      onClick={mockHandleClick}
      list={cities}
      setSelected={mockSelected}
    />
  );
  let option = getByText(/Cali/i);
  fireEvent.click(option);
  expect(mockHandleClick.mock.calls).toHaveLength(0);
});
