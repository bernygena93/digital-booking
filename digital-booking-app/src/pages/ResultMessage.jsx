/** @format */

import { useParams, useLocation } from "react-router-dom";
import MessageTemplate from "./MessageTemplate";
import { useEffect, useState } from "react";

export default function ResultMessage() {
  const [message, setMessage] = useState({
    title: "",
    text: "",
    icon: [],
    subtitle: "",
    color: "",
    label: "Ir a la Home",
    path: "/",
    buttonVisible: true
  });

  const { type } = useParams();
  const location = useLocation()



  useEffect(() => {
    if (type === "successfulBooking") {
      setMessage({
        ...message,
        title: "Muchas gracias!",
        text: "La reserva se ha realizado con éxito.",
        icon: ["fas", "check-circle"],
        color: "#fbc02d",
      });
    } else if (type === "failedBooking") {
      setMessage({
        ...message,
        title: "Ups! Ha ocurrido un error al realizar su reserva.",
        text: "Por favor intente más tarde.",
        icon: ["fas", "exclamation-circle"],
        color: "#B00020",
      });
    } else if (type === "successfulCreation") {
      setMessage({
        ...message,
        text: "La propiedad se ha creado con éxito.",
        icon: ["fas", "check-circle"],
        color: "#fbc02d",
      });
    } else if (type === "failedCreation") {
      setMessage({
        ...message,
        text: "Ups! Ha ocurrido un error al crear el producto.",
        icon: ["fas", "exclamation-circle"],
        color: "#B00020",
      });
    } else if (location.pathname === "/verification") {
      setMessage({
        ...message,
        title: "¡Gracias por registrarte en Digital Booking!",
        text: "Por favor, revisa tu casilla de correo para terminar la validación",
        icon:["far", "envelope"],
        color: "#fbc02d",
        buttonVisible: false
      })
    } 
  }, []);

  return (
    <MessageTemplate
      title={message.title}
      text={message.text}
      icon={message.icon}
      color={message.color}
      label={message.label}
      path={message.path}
      button={message.buttonVisible}
    />
  );
}
