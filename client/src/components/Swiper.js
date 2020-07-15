import React, { useState, useEffect, useContext } from "react";
import DataService from "../services/service";
import "../App.css";
import { ContextLatLng } from "../App";

function App() {
  const { lat } = useContext(ContextLatLng)
  const { lng } = useContext(ContextLatLng)

  const [restaurants, setRestaurants] = useState("");
  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState([]);

  useEffect(() => {
    DataService.getRestaurants(lat, lng)
      .then((response) => {
        console.log(response.data);
        setRestaurants(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
    {/* {restaurants.length ? (
        <div>
          {index < restaurants.length ? (
            <div className="container">
              <div className="row">
                <div className="col d-flex justify-content-center">
                  <div className="card" style={{maxWidth: "20%", height: "300px"}}>
                  <img className="card-img-top" src={restaurants[index].picture} />
                    <div className="card-body">
                      <div className="card-title">{restaurants[index].title}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <button
                  className="btn btn-sm btn-dark col ml-3 mr-3"
                  onClick={() => setIndex(index + 1)}
                >
                  Dislike
                </button>
                <button
                  className="btn btn-sm btn-dark col ml-3 mr-3"
                  onClick={() => {
                    setIndex(index + 1);
                    const likeArray = [...liked];
                    likeArray.push(restaurants[index]);
                    setLiked(likeArray);
                  }}
                >
                  Like
                </button>
              </div>
            </div>
          ) : (
            <div className="container">
              {liked.length &&
                liked.map((restaurant, index) => (
                  <div key={index}>
                    <div className="row">
                      <div className="col d-flex justify-content-center">
                        <div className="card" style={{maxWidth: "20%"}}>
                        <img className="card-img-top" src={restaurant.picture}/>
                          <div className="card-body">
                            <div className="card-title">{restaurant.title}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              <div className="row mt-3">
                {liked.length > 1 && (
                  <button
                    className="btn btn-sm btn-dark col ml-3 mr-3 mb-5"
                    onClick={() => {
                      const likedArray = [...liked];
                      var randomIndex = Math.floor(Math.random() * liked.length);
                      setLiked([likedArray[randomIndex]]);
                    }}
                  >
                    Choose For Me!
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )} */}
    </div>
  );
}

export default App;
