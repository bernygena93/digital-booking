/** @format */

import style from "./styles/register.module.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { registerUser } from "../service/userService";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SpinnerButton from "../components/SpinnerButton";

// Validaciones inputs registro
const schema = yup.object().shape({
  name: yup.string().required("El nombre es requerido").max(50, "El número máximo son 50 caracteres"),
  lastName: yup.string().required("El apellido es requerido").max(50, "El número máximo son 50 caracteres"),
  email: yup
    .string()
    .email("Debe ser un email válido")
    .required("El email es requerido"),
  password: yup
    .string()
    .required("La contraseña es requerida")
    .min(6, "El número minimo debe ser 6 caracteres")
    .matches(/[0-9]/, "La contraseña debe contener un número")
    .matches(
      /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
      "La contraseña debe contener una letra mayúsculas y al menos una minúscula"
    ),
  passwordConfirmation: yup
    .string()
    .required("La confirmacion es requerida")
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden"),
});

export default function Register() {
  const [loadingClickClass, setLoadingClickClass] = useState(
    style.createAccountButton
  );
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [iconsEye, seticonsEye] = useState(true);
  const [typePass, settypePass] = useState("password");
  const [registerError, setRegisterError] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const handleRegisterError = () => {
    setRegisterError(true);
  };

  const onSubmit = async (data) => {
    setLoadingClickClass(style.createAccountButtonClicked);
    setLoading(true);
    try {
      const dataUser = await registerUser(data);
      history.push("/verification");
    } catch (e) {
      setLoading(false);
      setLoadingClickClass(style.createAccountButton);
      handleRegisterError();
      console.log(e);
    }
  };

  const handleClick = () => {
    if (iconsEye) {
      seticonsEye(false);
      settypePass("text");
    } else {
      seticonsEye(true);
      settypePass("password");
    }
  };

  const handleLogin = () => {
    history.push("/login");
  };

  return (
    <div className={style.registerContainer}>
      <h2 className={style.title}> Crear Cuenta </h2>
      <section className={style.formContainer}>
        <form className={style.registerForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={style.nameAndLastNameInput}>
              <label className={style.inputLabelRegister} htmlFor="name">
                {" "}
                Nombre
                <input
                  className={style.inputRegister}
                  id="name"
                  type="text"
                  
                  {...register("name")}
                />
                {errors.name && (
                  <p className={style.errorMessage}>{errors.name.message}</p>
                )}
              </label>
              <label className={style.inputLabelRegister} htmlFor="lastName">
                {" "}
                Apellido
                <input
                  className={style.inputRegister}
                  id="lastName"
                  type="text"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className={style.errorMessage}>{errors.lastName.message}</p>
                )}
              </label>
          </div>

          <label className={style.inputLabelRegister} htmlFor="email ">
            {" "}
            Correo Electrónico
            <input
              className={style.inputRegister}
              id="email"
              type="email"
              {...register("email")}
            />
          </label>
          {errors.email && (
            <p className={style.errorMessage}>{errors.email.message}</p>
          )}

          <label className={style.inputLabelRegister} htmlFor="password">
            {" "}
            Contraseña
            <div className={style.eyeContainer}>
              <input
                className={style.inputRegister}
                id="password"
                type={typePass}
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

          <label className={style.inputLabelRegister} htmlFor="password">
            {" "}
            Confirmar Contraseña
            <input
              className={style.inputRegister}
              id="password2"
              type="password"
              {...register("passwordConfirmation")}
            />
          </label>
          {errors.passwordConfirmation && (
            <p className={style.errorMessage}>
              {errors.passwordConfirmation.message}
            </p>
          )}

          <button type="submit" className={loadingClickClass}>
            Crear Cuenta{" "}
            {loading && <SpinnerButton className={style.spinnerHidden} />}
          </button>
          {registerError && (
            <p className={style.errorMessage}>
              Lamentablemente no ha podido registrarse. Por favor intentelo más
              tarde.
            </p>
          )}

          <p className={style.alreadyHaveAccount}>
            ¿Ya tienes una cuenta? &nbsp;
            <small onClick={handleLogin} className={style.loginLink}>
              Iniciar Sesión
            </small>
          </p>
        </form>
      </section>
    </div>
  );
}
