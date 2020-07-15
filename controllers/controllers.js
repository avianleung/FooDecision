const Model = require("../models/model.js");
const cheerio = require("cheerio");
const request = require("request");

exports.getRestaurants = (req, res) => {
  const keyString = process.env.KEYSTRING;
  const restaurants = [];
  const restaurantNames = [];
  const addressNames = [];
  const addressLatLong = [];
  const photoList = [];
  const city = "Unionville";

  var ctr = 0;
  var ctr2 = 0;

  request(
    "https://maps.googleapis.com/maps/api/geocode/json?result_type=locality&latlng=" +
      req.params.curLat +
      "," +
      req.params.curLng +
      keyString,
    (error, response, html) => {
      if (!error && response.statusCode === 200) {
        const city = JSON.parse(response.body).results[0].formatted_address.split(" ").join("")
        request(
          "https://www.yelp.ca/search?find_desc=restaurants&find_loc=" + city,
          (error, response, html) => {
            if (!error && response.statusCode === 200) {
              const $ = cheerio.load(html);
              const restaurantHeader = $(
                ".lemon--div__373c0__1mboc.container__373c0__3HMKB"
              ).each((index, element) => {
                const name = $(element).find("h4").children("span").children("a").text();
                const address = $(element).find("address.lemon--address__373c0__2sPac").text();
                if (name && address) {
                  restaurantNames.push(name);
                  addressNames.push(address);
                  addressLatLong.push({});
                }
              });
      
              addressNames.forEach((address, index) => {
                request(
                  "https://maps.googleapis.com/maps/api/geocode/json?address=" +
                    address.split(" ").join("+") +
                    "," +
                    city +
                    "&language=en" +
                    keyString,
                  (error, response, html) => {
                    if (!error && JSON.parse(response.body).status === "OK") {
                      restaurants.push({});
                      photoList.push({});
                      addressLatLong[index] = {
                        name: restaurantNames[index],
                        address,
                        latlng: JSON.parse(response.body).results[0].geometry.location,
                      };
                    }
                    ctr++;
                    if (ctr === addressNames.length) {
                      addressLatLong.forEach((obj, index) => {
                        request(
                          "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" +
                            obj.name.split(" ").join("%20") +
                            "%20" +
                            city +
                            "&inputtype=textquery&language=en&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:50@" +
                            obj.latlng.lat +
                            "," +
                            obj.latlng.lng +
                            keyString,
                          (error, response, html) => {
                            if (!error && JSON.parse(response.body).status === "OK") {
                              restaurants[index] = {
                                address: JSON.parse(response.body).candidates[0]
                                  .formatted_address,
                                name: JSON.parse(response.body).candidates[0].name,
                                open_now: JSON.parse(response.body).candidates[0].opening_hours,
                                rating: JSON.parse(response.body).candidates[0].rating,
                                photos: {
                                  maxwidth: JSON.parse(response.body).candidates[0].photos[0]
                                    .width,
                                  photo_reference: JSON.parse(response.body).candidates[0]
                                    .photos[0].photo_reference,
                                },
                              };
                            }
                            ctr2++;
                            if (ctr2 === addressLatLong.length) {
                              res.send(restaurants);
                            }
                          }
                        );
                      });
                    }
                  }
                );
              });
            }
          }
        );
      }
    }
  );
};
