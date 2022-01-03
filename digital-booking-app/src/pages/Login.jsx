/** @format */

import style from "./styles/login.module.css";
import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import BookingContext from "../context/BookingContext";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginUser } from "../service/userService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SpinnerButton from "../components/SpinnerButton";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [loadingClickClass, setLoadingClickClass] = useState(style.loginButton);
  const [message, setMessage] = useState("");
  const [messageActive, setMessageActive] = useState(false);
  const context = useContext(BookingContext);
  const history = useHistory();
  const [iconsEye, seticonsEye] = useState(true);
  const [typePass, settypePass] = useState("password");
  const [loginError, setLoginError] = useState(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Debe ser un email válido")
      .required("El email es requerido"),
    password: yup
      .string()
      .required("La contraseña es requerida")
  });

  useEffect(() => {
    if (context.currentRoute !== "/") {
      context.currentLocation("/");
      setMessage("Para realizar una reserva necesitás estar logueado.");
      setMessageActive(true);
    }
  }, [context]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const handleLoginError = () => {
    setLoginError(true);
  };

  const onSubmit = async (data) => {
    setLoadingClickClass(style.loginButtonClicked);
    setLoading(true);
    try {
      const dataUser = await loginUser(data);
      context.loginUser(dataUser.data);
      if(dataUser.data.authority[0].authority === "ROLE_ADMIN"){
        history.push("/administration-panel/accommodation");
      } else {
        history.push("/")
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
      setLoadingClickClass(style.loginButton);
      handleLoginError();
    }
  };

  function handleClick() {
    if (iconsEye) {
      seticonsEye(false);
      settypePass("text");
    } else {
      seticonsEye(true);
      settypePass("password");
    }
  }

  const handleRegister = () => {
    history.push("/register");
  };

  return (
    <div className={style.container}>
      {messageActive && (
        <div className={style.messageLoginContainer}>
          <div className={style.messageLogin}>
            <FontAwesomeIcon icon={["fas", "exclamation-circle"]} size="2x" />
            <p className={style.messageLoginText}>{message}</p>
          </div>
        </div>
      )}
      <h2 className={style.title}> Iniciar Sesión</h2>
      <section className={style.formSection}>
        <form className={style.loginForm} onSubmit={handleSubmit(onSubmit)}>
          <label className={style.labelForm} htmlFor="email">
            {" "}
            Correo Electrónico
            <input
              className={style.loginInput}
              id="email"
              type="email"
              placeholder="Ingresá tu correo electrónico"
              {...register("email")}
            />
          </label>
          {errors.email && (
            <p className={style.errorMessage}>{errors.email.message}</p>
          )}

          <label className={style.labelForm} htmlFor="password">
            {" "}
            Contraseña
            <div className={style.divEye}>
              <input
                className={style.loginInput}
                id="password"
                type={typePass}
                placeholder="•••••••••••••"
                {...register("password")}
              />
              {iconsEye ? (
                <div className={style.iconEye}>
                  <FontAwesomeIcon
                    onClick={handleClick}
                    icon={["far", "eye-slash"]}
                  />
                </div>
              ) : (
                <div className={style.iconEye}>
                  <FontAwesomeIcon
                    onClick={handleClick}
                    icon={["fas", "eye"]}
                  />
                </div>
              )}
            </div>
          </label>
          {errors.password && (
            <p className={style.errorMessage}>{errors.password.message}</p>
          )}

          <button type="submit" className={loadingClickClass}>
            Ingresar{" "}
            {loading && <SpinnerButton className={style.spinnerHidden} />}
          </button>
          {loginError && (
            <p className={style.errorMessage}>
              Los datos ingresados no son correctos. <br/> Inténtelo nuevamente.
            </p>
          )}

          <p className={style.dontHaveAnAccount}>
            ¿Aún no tienes cuenta?
            <small onClick={handleRegister} className={style.registerLink}>
              {" "}
              Regístrate{" "}
            </small>
          </p>
        </form>
      </section>
    </div>
  );
}
