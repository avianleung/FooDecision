import React, { useState, useEffect } from "react";
import DataService from "./services/service";
import "./App.css";
import Swiper from "./components/Swiper"

export const ContextLatLng = React.createContext()

function App() {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [swiper, setSwiper] = useState(false)

  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  };

  const success = (pos) => {
    setLat(pos.coords.latitude);
    setLng(pos.coords.longitude);
    console.log(`Latitude : ${pos.coords.latitude}`);
    console.log(`Longitude: ${pos.coords.longitude}`);
    setSwiper(true)
  };

  const error = (err) => {
    console.log(`ERROR(${err.code}): ${err.message}`);
  };

  return (
    <div>
      <div className="container" style={{ height: "100vh" }}>
        <div className="row" style={{ marginTop: "30%" }}>
          <button
            className="btn btn-dark col"
            onClick={() =>
              navigator.geolocation.getCurrentPosition(success, error, options)
            }
          >
            Use Current Location
          </button>
        </div>

        {swiper && (
          <div className="row mt-5">
            <div className="col">latitude: {lat}</div>
            <div className="col">longitude: {lng}</div>
            {lat && lng && (
              <ContextLatLng.Provider value={{lat, lng}}>
                <Swiper />
              </ContextLatLng.Provider>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
