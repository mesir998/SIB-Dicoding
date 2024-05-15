// eslint-disable-next-line import/extensions
import API_ENDPOINT from '../api-endpoint.js';

class RestaurantSource {
  static async exploreRestaurants() {
    const response = await fetch(API_ENDPOINT.EXPLORE_RESTAURANTS);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurants(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const responseData = await response.json();
    return responseData.restaurant;
  }
}

export default RestaurantSource;
