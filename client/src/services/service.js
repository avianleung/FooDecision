import http from "../http-common";
const keyString = '&key=AIzaSyB1PdkAbFTaObHSPG2spOz1UJA4FxHuMOQ';

class DataService {

    getRestaurants(lat, lng) {
        return http.get(`/getrestaurants/${lat}/${lng}`)
    }
}

export default new DataService();