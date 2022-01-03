/** @format */
import axios from "axios";
import { getAllProducts, getProductById } from "../../service/productService";

jest.mock("axios");

describe("getProductById test", () => {
  it("get one product test", async () => {
    const data = {
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
      images: [],
      features: [],
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(data));
    await expect(getProductById(1)).resolves.toEqual(data);
  });
  it("get all products test", async () => {
    const dataList = [
      {
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
            id: 2,
            title: "tequendama_01",
            url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Bogot%C3%A1_carrera_10_Hotel_Tequendama.JPG/1200px-Bogot%C3%A1_carrera_10_Hotel_Tequendama.JPG",
          },
          {
            id: 1,
            title: "tequendama_02",
            url: "https://media-cdn.tripadvisor.com/media/photo-s/17/ba/e8/26/hotel-tequendama-bogota.jpg",
          },
        ],
        features: [],
      },
      {
        id: 2,
        name: "Hotel Ariston",
        description: "Hotel de 4 estrellas",
        city: {
          id: 7,
          name: "Rosario",
          country: "Argentina",
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
            id: 3,
            title: "ariston_02",
            url: "https://x.cdrst.com/foto/hotel-sf/543b/granderesp/ariston-rosario-general-99f9ce2.jpg",
          },
          {
            id: 4,
            title: "ariston_01",
            url: "https://cdn0.casamientos.com.ar/vendor/3462/3_2/960/jpg/01_7_113462.jpeg",
          },
        ],
        features: [
          {
            id: 2,
            name: "WiFi",
            icon: "<i class='fas fa-wifi'></i>",
          },
          {
            id: 1,
            name: "Pileta",
            icon: "<i class='fas fa-swimming-pool'></i>",
          },
        ],
      },
      {
        id: 4,
        name: "Masaya Hostel",
        description: "Hostel",
        city: {
          id: 2,
          name: "Medeshín",
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
            id: 5,
            title: "masaya_02",
            url: "https://q-xx.bstatic.com/xdata/images/hotel/max500/277939724.jpg?k=1281baba1953a2ff7264b923c396f997a8f3f8609e42451173d84eda5417330d&o=",
          },
          {
            id: 6,
            title: "masaya_01",
            url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/294695278.jpg?k=2d900d848eaaec89b7ff0dd7e90b8cb11bf62562faa5998261089a47ccc47191&o=&hp=1",
          },
        ],
        features: [
          {
            id: 4,
            name: "WiFi",
            icon: "<i class='fas fa-wifi'></i>",
          },
          {
            id: 3,
            name: "Pileta",
            icon: "<i class='fas fa-swimming-pool'></i>",
          },
        ],
      },
      {
        id: 5,
        name: "Aldea Hostel",
        description: "Hostel",
        city: {
          id: 6,
          name: "Córdoba",
          country: "Argentina",
        },
        category: {
          id: 2,
          name: "Hostels",
          description: "Hostels de alojamiento compartido",
          urlImage:
            "https://www.reportur.com/wp-content/uploads/2019/11/hostel2.jpg",
        },
        images: [
          {
            id: 8,
            title: "aldea_02",
            url: "https://media-cdn.tripadvisor.com/media/photo-m/1280/17/d5/e4/1f/aldea-hostel-cordoba.jpg",
          },
          {
            id: 7,
            title: "aldea_01",
            url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/283982812.jpg?k=0590b15fedf0c341cdb49f545cedbd4c12abba707dd689a0e0a1c72251aec537&o=&hp=1",
          },
        ],
        features: [
          {
            id: 6,
            name: "WiFi",
            icon: "<i class='fas fa-wifi'></i>",
          },
          {
            id: 5,
            name: "Mascotas",
            icon: "<i class='fas fa-paw'></i>",
          },
        ],
      },
      {
        id: 6,
        name: "Loft en Cali",
        description: "Departamento Loft",
        city: {
          id: 3,
          name: "Cali",
          country: "Colombia",
        },
        category: {
          id: 3,
          name: "Departamentos",
          description: "Departamentos para alojamiento privado",
          urlImage:
            "https://www.hogares.cl/wp-content/uploads/2018/06/SLA_3734.jpg",
        },
        images: [
          {
            id: 9,
            title: "loft_cali_02",
            url: "https://media-cdn.tripadvisor.com/media/vr-splice-j/0b/cc/02/49.jpg",
          },
          {
            id: 10,
            title: "loft_cali_01",
            url: "https://www.greatsmallhotels.com/photos/51397_acquasanta-lofts-hotel_.jpg",
          },
        ],
        features: [
          {
            id: 7,
            name: "WiFi",
            icon: "<i class='fas fa-wifi'></i>",
          },
        ],
      },
      {
        id: 7,
        name: "Departamento 2 ambientes",
        description: "Departamento a 100m de la playa",
        city: {
          id: 8,
          name: "Mar del Plata",
          country: "Argentina",
        },
        category: {
          id: 3,
          name: "Departamentos",
          description: "Departamentos para alojamiento privado",
          urlImage:
            "https://www.hogares.cl/wp-content/uploads/2018/06/SLA_3734.jpg",
        },
        images: [
          {
            id: 12,
            title: "depto_mdq_04",
            url: "https://a0.muscache.com/im/pictures/miso/Hosting-52086888/original/623a599f-f9d5-4c1e-8cb9-e530905650c5.jpeg?im_w=1440",
          },
          {
            id: 11,
            title: "depto_mdq_01",
            url: "https://a0.muscache.com/im/pictures/miso/Hosting-52086888/original/c6460043-6954-46f9-84aa-10d0962d6677.jpeg?im_w=1200",
          },
          {
            id: 13,
            title: "depto_mdq_02",
            url: "https://a0.muscache.com/im/pictures/miso/Hosting-52086888/original/a3bb203a-76d1-479d-8fca-8d3065c420ff.jpeg?im_w=1440",
          },
          {
            id: 14,
            title: "depto_mdq_03",
            url: "https://a0.muscache.com/im/pictures/miso/Hosting-52086888/original/b2d8a249-de85-4543-b547-87ff4728024f.jpeg?im_w=1440",
          },
        ],
        features: [
          {
            id: 8,
            name: "WiFi",
            icon: "<i class='fas fa-wifi'></i>",
          },
          {
            id: 9,
            name: "Alojamiento entero",
            icon: "<i class='fas fa-home'></i>",
          },
        ],
      },
      {
        id: 8,
        name: "Vestigium",
        description: "Departamento a 100m de la playa",
        city: {
          id: 4,
          name: "Barranquilla",
          country: "Colombia",
        },
        category: {
          id: 4,
          name: "Bed and Breakfast",
          description: "Asentamiento sencillo y económico",
          urlImage:
            "https://www.hogares.cl/wp-content/uploads/2018/06/SLA_3734.jpg",
        },
        images: [
          {
            id: 16,
            title: "vestigium_02",
            url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/160603986.jpg?k=dddd549ff661fa5794e8a962ed4b2c0566af70b4f92f06ec473905ba9a17b045&o=&hp=1",
          },
          {
            id: 15,
            title: "vestigium_01",
            url: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/226527270.jpg?k=cf74fc8fdf87d52950712e59038f1a9af75096426b476b750b0d3fa4ef8e2ae5&o=&hp=1",
          },
        ],
        features: [
          {
            id: 10,
            name: "WiFi",
            icon: "<i class='fas fa-wifi'></i>",
          },
        ],
      },
      {
        id: 9,
        name: "La querencia",
        description: "Bed and breakfast",
        city: {
          id: 5,
          name: "Buenos Aires",
          country: "Argentina",
        },
        category: {
          id: 4,
          name: "Bed and Breakfast",
          description: "Asentamiento sencillo y económico",
          urlImage:
            "https://www.hogares.cl/wp-content/uploads/2018/06/SLA_3734.jpg",
        },
        images: [
          {
            id: 18,
            title: "la_querencia_01",
            url: "https://cf.bstatic.com/xdata/images/hotel/max500/36224314.jpg?k=61d047bdb625748e64cab2393ee09575fcfabc65d78495c3bd267137ea6199bd&o=&hp=1",
          },
          {
            id: 17,
            title: "la_querencia_02",
            url: "https://q-xx.bstatic.com/images/hotel/max1024x768/362/36224367.jpg",
          },
        ],
        features: [
          {
            id: 12,
            name: "Desayuno",
            icon: "<i class='fas fa-coffee'></i>",
          },
          {
            id: 11,
            name: "WiFi",
            icon: "<i class='fas fa-wifi'></i>",
          },
        ],
      },
    ];
    axios.get.mockImplementationOnce(() => Promise.resolve(dataList));
    await expect(getAllProducts()).resolves.toEqual(dataList);
  });
});
