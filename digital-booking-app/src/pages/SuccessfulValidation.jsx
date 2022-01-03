/** @format */

import React, { useEffect, useState } from "react";
import MessageTemplate from "./MessageTemplate";
import styles from "./styles/verificationEmail.module.css";
import { useParams } from "react-router-dom";
import { validationEmail } from "../service/userService";
import Spinner from "../components/Spinner";

export default function SuccessfulValidation() {
  const { code } = useParams();
  const [message, setMessage] = useState({
    title: "¡La cuenta se ha validado exitosamente!",
    text: "",
    icon: ["fas", "check-circle"],
    color: "#fbc02d",
    label: "Iniciar sesión",
    path: "/login",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchApi() {
      try {
        await validationEmail(code);
        setLoading(true);
      } catch (e) {
        console.log(e);
        setMessage({
          title: "Ups! Ha ocurrido un error al validar el email.",
          icon: ["fas", "exclamation-circle"],
          color: "#B00020",
        });
      }
    }
    fetchApi();
  }, [code]);

  return (
    <>
      {loading ? (
        <MessageTemplate
          title={message.title}
          text={message.text}
          icon={message.icon}
          color={message.color}
          label={message.label}
          path={message.path}
          buttonVisible={true}
        />
      ) : (
        <div className={styles.containerCardVerification}>
          <Spinner /> <span className={styles.loading}>Cargando...</span>
        </div>
      )}
    </>
  );
}
