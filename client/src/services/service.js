import http from "../http-common";

class DataService {

    getRestaurants(lat, lng) {
        return http.get(`/getrestaurants/${lat}/${lng}`)
    }
}

export default new DataService();