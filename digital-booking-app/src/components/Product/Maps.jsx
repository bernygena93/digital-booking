/** @format */

import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  margin: "0 auto",
  height: "400px",
};

function Maps({ location }) {

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={15}>
        <Marker position={location} />
        <></>
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(Maps);
