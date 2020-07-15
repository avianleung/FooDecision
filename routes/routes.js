module.exports = app => {
    const controller = require("../controllers/controllers.js");

    app.get("/getrestaurants/:curLat/:curLng", controller.getRestaurants)
}