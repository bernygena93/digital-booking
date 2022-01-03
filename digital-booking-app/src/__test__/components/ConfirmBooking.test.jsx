/** @format */

import ReactTestUtils from "react-dom/test-utils";
import { fireEvent, render } from "@testing-library/react";
import ConfirmBooking from "../../components/Booking/ConfirmBooking";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: 1,
  }),
}));

const handleAcceptClick = jest.fn();

describe("get Cities test", () => {
  let wrapper;
  let booking = {
    id: 7,
    checkInTime: "10:00:00",
    checkInDate: "2022-01-07",
    checkOutDate: "2022-01-14",
    product: {
      id: 2,
      name: "Granada Hostel",
      description:
        "El Granada Hostel se encuentra en Bogotá, a 200 metros de la biblioteca Luis Ángel Arango y a menos de 1 km del Chorro de Quevedo, y ofrece bar, salón compartido, jardín y wifi gratis. El alojamiento se encuentra a 6 km del centro internacional de exposiciones Corferias, a 7 km del estadio El Campín y a 11 km de la Zona T. Hay recepción 24 horas, cocina compartida y servicio de organización de excursiones. Cerca del alojamiento hay varios lugares de interés, como la plaza Bolívar, la iglesia de Nuestra Señora de la Candelaria y la Casa de la Independencia. El aeropuerto más cercano es el aeropuerto internacional El Dorado, ubicado a 14 km del Granada Hostel.",
      city: { id: 1, name: "Bogotá", country: "Colombia" },
      category: {
        id: 2,
        name: "Hostels",
        description:
          "Un lugar para relajarse y hacer amigos. Los hostels son ideales para viajeros inquietos.",
        urlImage:
          "https://www.reportur.com/wp-content/uploads/2019/11/hostel2.jpg",
        totalProducts: null,
      },
      images: [
        {
          id: 4,
          title: "savoy_01",
          image:
            "https://cf.bstatic.com/xdata/images/hotel/max1024x768/242546524.jpg?k=986c0aa31d928d6329de41fb29c9a916dff8397ca909b098fa2d5aacae2799d7&o=&hp=1",
        },
      ],
      features: [],
      ratings: [],
      averageRating: null,
      bookings: [],
    },
    user: {
      id: 1,
      userName: "anto.legarreta@gmail.com",
      name: "Anto",
      lastName: "Legarreta",
      email: "anto.legarreta@gmail.com",
      role: null,
      enabled: true,
      verificationCode: "9QLHyzA0yAnqxwOUd4b4M5Q3CPxnYQpc",
    },
  };

  it("get all cities test", () => {
    wrapper = ReactTestUtils.renderIntoDocument(
      <ConfirmBooking bookingData={booking} />
    );
  });
  it("get all cities test", () => {
    ReactTestUtils.scryRenderedDOMComponentsWithClass(wrapper, "h2");
  });
});
