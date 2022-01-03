/** @format */

import React, { useRef, useState, useEffect } from "react";
import HeaderBelow from "../components/Navbar/HeaderBelow";
import InputDescription from "../components/Product/InputDescription";
import styles from "./styles/adminProduct.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAllCategories } from "../service/categoryService";
import { getAllCities } from "../service/cityService";
import { getAllFeatures } from "../service/featureService";
import { deleteImage } from "../service/imageService";
import Select from "../components/Search/Select";
import { useOutsideSelect } from "../hooks/useOutsideSelect";
import Spinner from "../components/Spinner";
import Icon from "../components/Icon";
import { useHistory } from "react-router-dom";
import {
  getProductById,
  saveProduct,
  updateProduct,
} from "../service/productService";
import { useParams } from "react-router-dom";
import ConfirmDeleteImage from "../components/Product/ConfirmDeleteImage";
import ConfirmCreateUpdate from "../components/Product/ConfirmCreateUpdate";
import { header } from "../config/HeadersRequest";
export default function AdminProduct() {
  const token = localStorage.getItem("Token");
  const history = useHistory();
  const { id } = useParams();
  const [citiesList, setCitiesList] = useState([]);
  const [categoriesList, setCategoriesList] = useState();
  const { visible, setVisible, invisible } = useOutsideSelect();
  const [loading, setLoading] = useState(true);
  const [featuresList, setFeaturesList] = useState();
  const [selectedCategory, setSelectedCategory] = useState(false);
  const [selectedCity, setSelectedCity] = useState(false);
  const [error, setError] = useState(false);
  const [confirmDeleteImagePopUp, setConfirmDeleteImagePopUp] = useState(false);
  const [imagesList, setImagesList] = useState([]);
  const [confirmCreateUpdatePopUp, setConfirmCreateUpdatePopUp] =
    useState(false);
  const [imageDelete, setImageDelete] = useState(false);
  const [newProduct] = useState(id === "new-product" ? true : false);
  const [errorFields, setErrorFields] = useState({});
  const containerRef = useRef();
  const [image, setImage] = useState({
    title: "",
    image: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    city: {},
    category: {},
    features: [],
    images: imagesList,
    address: {
      address: "",
      latitude: "-31.034894686023375",
      longitude: "-64.500324402775",
    },
    houseRules: "",
    healthAndSecurity: "",
    cancelPolicy: "",
  });

  useEffect(() => {
    const userRole = localStorage.getItem("User")
      ? JSON.parse(localStorage.getItem("User")).authority[0].authority
      : null;
    if (userRole === "ROLE_USER") {
      history.push("/");
    } else if (!userRole) {
      history.push("/login");
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    async function fetchApi() {
      if (!newProduct) {
        const product = await getProductById(id);
        setFormData({
          id: product.data.id,
          name: product.data.name,
          description: product.data.description,
          city: product.data.city,
          category: product.data.category,
          features: product.data.features,
          images: product.data.images,
          address: product.data.address,
          houseRules: product.data.houseRules,
          healthAndSecurity: product.data.healthAndSecurity,
          cancelPolicy: product.data.cancelPolicy,
        });
        setImagesList(product.data.images);
      }
      try {
        const categories = await getAllCategories();
        await setCategoriesList(categories.data);
        const cities = await getAllCities();
        await setCitiesList(cities.data);
        const features = await getAllFeatures();
        await setFeaturesList(features.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    fetchApi();
  }, []);

  const inputsHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCityFilter = (city) => {
    setFormData((prevState) => ({
      ...prevState,
      city: city,
    }));
  };

  const handleCategoryFilter = (category) => {
    setFormData((prevState) => ({
      ...prevState,
      category: category,
    }));
  };

  const inputCheckboxHandler = (feature) => {
    if (feature.target.checked) {
      setFormData((prevState) => ({
        ...prevState,
        features: [
          ...prevState.features,
          {
            id: feature.target.id,
          },
        ],
      }));
    } else {
      const newListFeatures = formData.features.filter((featureDate) => {
        return featureDate.id !== feature.target.id;
      });
      setFormData((prevState) => ({
        ...prevState,
        features: newListFeatures,
      }));
    }
  };

  const handleInputImage = (valueInput) => {
    setImage((prevState) => ({
      ...prevState,
      [valueInput.target.name]: valueInput.target.value,
    }));
  };

  const inputAddressHandler = (valueInput) => {
    setFormData((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        address: valueInput.target.value,
      },
    }));
  };

  const handleClickUploadImageButton = (e) => {
    e.preventDefault();
    setImagesList((prevState) => [...prevState, image]);
    setFormData((prevState) => ({
      ...prevState,
      images: [
        ...prevState.images,
        {
          title: image.title,
          image: image.image,
        },
      ],
    }));
  };

  const handleConfirmDelete = (image) => {
    setConfirmDeleteImagePopUp(true);
    setImageDelete(image);
  };

  const handleConfirmDeleteImage = () => {
    const newImagesList = imagesList.filter(
      (image) => image.image !== imageDelete.image
    );
    setImagesList(newImagesList);
    setFormData((prevState) => ({
      ...prevState,
      images: newImagesList,
    }));
    if (!newProduct) {
      try {
        deleteImage(imageDelete.id);
      } catch (e) {
        console.log(e);
      }
    }
    setConfirmDeleteImagePopUp(false);
  };

  /*   const checkValidatedFields = () => {

  } */

  /*   useEffect(() => {
    if (checkValidatedFields()) {
      setConfirmCreateUpdatePopUp(true); 
    }
  }, [clickedSubmit]); */

  const validateFields = () => {
    let formIsValid = true;
    if (formData.name === "") {
      formIsValid = false;
      setErrorFields((prevState) => ({
        ...prevState,
        name: "Este campo es obligatorio",
      }));
    }
    if (formData.category.id === undefined) {
      formIsValid = false;
      setErrorFields((prevState) => ({
        ...prevState,
        category: "Este campo es obligatorio",
      }));
    }
    if (formData.address.address === "") {
      formIsValid = false;
      setErrorFields((prevState) => ({
        ...prevState,
        address: "Este campo es obligatorio",
      }));
    }
    if (formData.city.id === undefined) {
      formIsValid = false;
      setErrorFields((prevState) => ({
        ...prevState,
        city: "Este campo es obligatorio",
      }));
    }
    if (formData.description === "") {
      formIsValid = false;
      setErrorFields((prevState) => ({
        ...prevState,
        description: "Este campo es obligatorio",
      }));
    }
    if (formData.features[0] === undefined) {
      formIsValid = false;
      setErrorFields((prevState) => ({
        ...prevState,
        features: "Este campo es obligatorio",
      }));
    }
    if (formData.houseRules === "") {
      formIsValid = false;
      setErrorFields((prevState) => ({
        ...prevState,
        houseRules: "Este campo es obligatorio",
      }));
    }
    if (formData.healthAndSecurity === "") {
      formIsValid = false;
      setErrorFields((prevState) => ({
        ...prevState,
        healthAndSecurity: "Este campo es obligatorio",
      }));
    }
    if (formData.cancelPolicy === "") {
      formIsValid = false;
      setErrorFields((prevState) => ({
        ...prevState,
        cancelPolicy: "Este campo es obligatorio",
      }));
    }
    if (formData.images[4] === undefined) {
      formIsValid = false;
      setErrorFields((prevState) => ({
        ...prevState,
        images: "Este campo es obligatorio, debes subir al menos 5 imágenes",
      }));
    }
    return formIsValid;
  };

  const handleConfirmCreateUpdate = (e) => {
    e.preventDefault();
    if (validateFields()) {
      setConfirmCreateUpdatePopUp(true);
    } else {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newProduct) {
      updateProduct(formData, header(token))
        .then((response) => {
          history.push(`/administration-panel/accommodation`);
        })
        .catch((e) => {
          setConfirmCreateUpdatePopUp(false);
          setError(true);
          console.log(e);
        });
    }
    if (newProduct) {
      saveProduct(formData, header(token))
        .then((response) => {
          history.push(`/administration-panel/accommodation`);
        })
        .catch((e) => {
          setConfirmCreateUpdatePopUp(false);
          setError(true);
          console.log(e);
        });
    }
  };

  const handleCancelClick = () => {
    setConfirmDeleteImagePopUp(false);
    setConfirmCreateUpdatePopUp(false);
  };

  return (
    <>
      {loading ? (
        <div className={styles.spinnerContainer}>
          <Spinner /> Cargando...
        </div>
      ) : (
        <>
          <HeaderBelow label="Administración" />

          <section className={styles.containerAdminProduct} ref={containerRef}>
            <h3 className={styles.containerAdminProductTitle}>
              {newProduct ? "Crear nuevo alojamiento" : "Modificar alojamiento"}
            </h3>
            <form className={styles.formAdminProduct}>
              <div className={styles.firstData}>
                <label htmlFor="nameProduct" className={styles.labelName}>
                  {" "}
                  Nombre del alojamiento
                  <input
                    className={styles.inputAdminProduct}
                    type="text"
                    id="nameProduct"
                    name="name"
                    placeholder="Ingresa el nombre"
                    value={formData.name}
                    onChange={inputsHandler}
                  />
                  <small className={styles.inputErrorMessage}>
                    {errorFields.name}
                  </small>
                </label>
                <label htmlFor="categoryProduct" className={styles.labelName}>
                  {" "}
                  Categoría
                  <Select
                    id={styles.categorySelect}
                    list={categoriesList}
                    onFilter={handleCategoryFilter}
                    visible={visible}
                    setVisible={setVisible}
                    placeholder="Selecciona una categoría"
                    selected={selectedCategory}
                    setSelected={setSelectedCategory}
                    invisible={invisible}
                    className={styles.selectCategory}
                    iconArrowDownTrue
                    valueDefault={!newProduct ? formData.category : null}
                    relative={true}
                  />
                  <small className={styles.inputErrorMessage}>
                    {errorFields.category}
                  </small>
                </label>
                <label htmlFor="address" className={styles.labelName}>
                  {" "}
                  Dirección
                  <input
                    className={styles.inputAdminProduct}
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address?.address}
                    placeholder="Ingresa la dirección"
                    onChange={inputAddressHandler}
                  />
                  <small className={styles.inputErrorMessage}>
                    {errorFields.address}
                  </small>
                </label>
                <label htmlFor="cityProduct" className={styles.labelName}>
                  {" "}
                  Ciudad
                  <Select
                    id={styles.citySelect}
                    list={citiesList}
                    onFilter={handleCityFilter}
                    visible={visible}
                    setVisible={setVisible}
                    placeholder="Selecciona una ciudad"
                    selected={selectedCity}
                    setSelected={setSelectedCity}
                    invisible={invisible}
                    className={styles.selectCity}
                    iconArrowDownTrue
                    valueDefault={!newProduct ? formData.city : null}
                    relative={true}
                  />
                  <small className={styles.inputErrorMessage}>
                    {errorFields.city}
                  </small>
                </label>
                <InputDescription
                  labelInput="Descripción"
                  placeholder="Escribe aquí..."
                  className={styles.firstDataDescription}
                  onChange={inputsHandler}
                  value={formData.description}
                  name="description"
                />
                <small className={styles.inputErrorMessage}>
                  {errorFields.description}
                </small>
              </div>

              <div className={styles.addData}>
                <h3 className={styles.divDataTitle}>Agregar atributos</h3>
                <div className={styles.divInputCheckboxFeature}>
                  <div className={styles.divInputUpload}>
                    {featuresList &&
                      featuresList.map((feature, index) => (
                        <label
                          htmlFor={feature.id}
                          className={styles.inputCheckbox}
                        >
                          <div
                            className={styles.divCheckbox}
                            key={feature.name + index}
                          >
                            {" "}
                            <div className={styles.iconAndTitleFeature}>
                              <Icon
                                className={styles.featureIcon}
                                icon={feature.icon}
                              />
                              <h4 className={styles.featureName}>
                                {feature.name}
                              </h4>
                            </div>
                            <input
                              type="checkbox"
                              name={feature.name}
                              id={feature.id}
                              onChange={inputCheckboxHandler}
                            />
                          </div>
                        </label>
                      ))}
                    <small className={styles.inputErrorMessage}>
                      {errorFields.features}
                    </small>
                  </div>
                </div>
              </div>

              <div className={styles.policyData}>
                <h3 className={styles.divDataTitle}>
                  Políticas del alojamiento
                </h3>
                <InputDescription
                  generalLabel="Normas de la casa"
                  labelInput="Descripción"
                  placeholder="Escribe aquí..."
                  className={styles.houseRules}
                  onChange={inputsHandler}
                  value={formData.houseRules}
                  name="houseRules"
                />
                <small className={styles.inputErrorMessage}>
                  {errorFields.houseRules}
                </small>
                <InputDescription
                  generalLabel="Salud y seguridad"
                  labelInput="Descripción"
                  placeholder="Escribe aquí..."
                  className={styles.healthAndSecurity}
                  onChange={inputsHandler}
                  value={formData.healthAndSecurity}
                  name="healthAndSecurity"
                />
                <small className={styles.inputErrorMessage}>
                  {errorFields.healthAndSecurity}
                </small>
                <InputDescription
                  generalLabel="Política de cancelación"
                  labelInput="Descripción"
                  placeholder="Escribe aquí..."
                  className={styles.cancelPolicy}
                  onChange={inputsHandler}
                  value={formData.cancelPolicy}
                  name="cancelPolicy"
                />
                <small className={styles.inputErrorMessage}>
                  {errorFields.cancelPolicy}
                </small>
              </div>

              <div className={styles.divUpload}>
                <h3 className={styles.divDataTitle}>Cargar imágenes</h3>
                <div className={styles.containerInputImgAndImages}>
                  <div className={styles.divInputUploadImg}>
                    <div className={styles.divInputUploadUrlImg}>
                      <label htmlFor="title" className={styles.uploadImg}>
                        <input
                          className={`${styles.inputAdminProduct} ${styles.inputUpload}`}
                          type="text"
                          name="title"
                          id="title"
                          placeholder="Título de la imagen"
                          onChange={handleInputImage}
                        />
                      </label>
                      <label htmlFor="image" className={styles.uploadImg}>
                        <input
                          className={`${styles.inputAdminProduct} ${styles.inputUpload}`}
                          type="url"
                          name="image"
                          id="image"
                          placeholder="Insertar https://"
                          onChange={handleInputImage}
                        />
                        <small className={styles.inputErrorMessage}>
                          {errorFields.images}
                        </small>
                      </label>
                    </div>
                    <div
                      className={styles.buttonAddAdminProduct}
                      name="buttonAddImage"
                      onClick={handleClickUploadImageButton}
                    >
                      <FontAwesomeIcon icon={["fas", "plus"]} />
                    </div>
                  </div>
                  {imagesList &&
                    imagesList.map((image, index) => (
                      <div
                        key={image.title + index}
                        className={styles.divImagesList}
                      >
                        <div className={styles.divImageList}>
                          <img
                            src={image.image}
                            alt={image.title}
                            className={styles.imageList}
                          />
                        </div>
                        <h4>{image.title} </h4>
                        <div
                          className={styles.buttonDeleteAdminProduct}
                          name="buttonAddImage"
                          onClick={() => handleConfirmDelete(image)}
                        >
                          <FontAwesomeIcon icon={["fas", "times"]} />
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className={styles.divSubmitAdminProduct}>
                {error && (
                  <h4 className={styles.submitErrorMessage}>
                    Lo sentimos, no se ha podido enviar el formulario. Por favor
                    revise los campos o intente más tarde.
                  </h4>
                )}
                <button
                  type="submit"
                  label={newProduct ? "Crear" : "Modificar"}
                  className={styles.buttonSubmitAdminProduct}
                  onClick={handleConfirmCreateUpdate}
                >
                  {newProduct ? "Crear" : "Modificar"}
                </button>
              </div>
            </form>
          </section>
        </>
      )}
      {confirmDeleteImagePopUp && (
        <>
          <div className={styles.overlay} id="overlay"></div>
          <ConfirmDeleteImage
            handleCancelClick={handleCancelClick}
            handleConfirmClick={handleConfirmDeleteImage}
            image={imageDelete}
          />
        </>
      )}
      {confirmCreateUpdatePopUp && (
        <>
          <div className={styles.overlay} id="overlay"></div>
          <ConfirmCreateUpdate
            handleCancelClick={handleCancelClick}
            handleConfirmClick={handleSubmit}
            product={imageDelete}
          />
        </>
      )}
    </>
  );
}
