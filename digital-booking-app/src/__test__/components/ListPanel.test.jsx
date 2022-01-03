/** @format */
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import ListPanel from "../../components/List/ListPanel";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: 1,
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

const handleAcceptClick = jest.fn();
describe("Footer component test", () => {
  let wrapper;
  let product;
  beforeEach(() => {
    (product = {
      id: 1,
      name: "Hotel Tequendama",
      description: "Hotel de 5 estrellas",
      city: {
        id: 1,
        name: "Bogotá",
        country: "Colombia",
      },
      category: {
        id: 1,
        name: "Hoteles",
        description: "Hoteles de alojamiento",
        urlImage:
          "https://storage.googleapis.com/static-content-hc/sites/default/files/cataloina_porto_doble_balcon2_2.jpg",
      },
      images: [
        {
          id: 1,
          title: "tequendama_02",
          url: "https://media-cdn.tripadvisor.com/media/photo-s/17/ba/e8/26/hotel-tequendama-bogota.jpg",
        },
        {
          id: 2,
          title: "tequendama_01",
          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Bogot%C3%A1_carrera_10_Hotel_Tequendama.JPG/1200px-Bogot%C3%A1_carrera_10_Hotel_Tequendama.JPG",
        },
      ],
      features: [],
    }),
      (wrapper = ReactTestUtils.renderIntoDocument(
        <ListPanel product={product} data="booking" />
      ));
  });
  it("h2 component test", () => {
    ReactTestUtils.scryRenderedDOMComponentsWithTag(wrapper, "h2");
  });
  it("", () => {
    const { container } = render(
      <ListPanel product={product} data="booking" />
    );
    let button = container.querySelectorAll("button");
    fireEvent.click(button[0]);
    expect(handleAcceptClick.mock.calls).toHaveLength(0);
  });
});
