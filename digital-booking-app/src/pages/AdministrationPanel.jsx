/** @format */

import React, { useEffect, useState } from "react";
import styles from "./styles/administrationPanel.module.css";
import ListPanel from "../components/List/ListPanel";
import { getAllProducts, getProductById } from "../service/productService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSearch,
/*   faHotel,
  faCalendarCheck, */
} from "@fortawesome/free-solid-svg-icons";
import ListPanelProduct from "../components/List/ListPanelProduct";
import SidePanel from "../components/SidePanel";
import { useParams } from "react-router-dom";
import { getBookingById } from "../service/bookingService";
import { useWindowResize } from "../hooks/useWindowResize";
import { useHistory } from "react-router-dom";

export default function AdministrationPanel() {
  const history = useHistory();
  const { viewType/* , viewTablet */ } = useWindowResize();
  const [products, setProducts] = useState([]);
/*   const [list, setList] = useState([]); */
  const { data } = useParams();
/*   const [booking, setBooking] = useState({}); */
  const [loading, setLoading] = useState(true);
/*   const [fill, setFill] = useState([]) */
  const [title, setTitle] = useState("");
  const [placeholder, setPlaceholder] = useState("Buscar por Id");
  const [valueInput, setValueInput] = useState({ id: "" });

  useEffect(() => {
    const userRole = localStorage.getItem("User") ? JSON.parse(localStorage.getItem('User')).authority[0].authority : null;
    if (userRole === "ROLE_USER") {
      history.push("/");
    } else if (!userRole) {
      history.push("/login");
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    async function fetchApi() {
      if (data === "accommodation") {
        try {
          const data = await getAllProducts();
          setProducts(data.data);
          setLoading(false);
          setTitle("Alojamientos");
        } catch (e) {
          console.log(e, "Product not found");
        }
      } else {
        setProducts([]);
        setLoading(false);
        setTitle("Reservas");
        setPlaceholder("Buscar por id de alojamiento")
      }
    }
    fetchApi();
  }, [data]);



  const handleChange = (e) => {
    const value = e.target.value;
    setValueInput({ id: value });
  };

  const handleClick = async () => {
    setLoading(true);
    if (data === "accommodation") {
      const info = await getProductById(valueInput.id);
      setProducts([info.data]);
      setLoading(false);
    } else {
      const info = await getBookingById(valueInput.id);
      setProducts(info.data);
      setLoading(false);
    }
  };

  const handleClickCreateNew = () => {
    history.push(`/admin-product/new-product`)
  }

  return (
    <>
      <div className={styles.containerAdmin}>
        <SidePanel
          styles={styles}
          labelBooking={"Reservas"}
          labelProduct={"Alojamientos"}
        />
          <div className={styles.containerPanel}>
            <div className={styles.containerHeader}>
              <div className={styles.titlePanel}>
                <h3>{title}</h3>
              </div>
              <div className={styles.header}>
                {data === "accommodation" && (
                  <button className={styles.buttonCreate} onClick={handleClickCreateNew}>
{/*                     <Link
                      to="/admin-product/new-product"
                      className={styles.linkButtonCreate}
                    > */}
                      <FontAwesomeIcon icon={faPlus} size="lg" />
                      Crear alojamiento
{/*                     </Link> */}
                  </button>
                )}
                <div className={styles.inputSearchId}>
                  <FontAwesomeIcon icon={faSearch} color={"#BEBEBE"} />
                  <input
                    type="text"
                    name="search"
                    placeholder={placeholder}
                    className={styles.inputPanel}
                    value={valueInput.id}
                    onChange={handleChange}
                  />
                </div>
                <button className={styles.buttonSearchId} onClick={handleClick}>
                  Buscar
                </button>
              </div>
            </div>
            {viewType !== "mobile" ? (
              <ListPanelProduct products={products} data={data} loading={loading}/>
            ) : (
              products.map((product, index) => (
                <ListPanel
                  product={product}
                  key={product.name + index}
                  data={data}
                />
              ))
            )}

          </div>
      </div>
    </>
  );
}
