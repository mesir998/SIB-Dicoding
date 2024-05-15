import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import { createRestaurantListTemplate } from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
        <div class="content">
            <div class="content-header">
                <h1 class="content_label">Your Favorite Restaurants</h1>
            </div>
            <div id="listRestaurant" class="restaurant-list">
            </div>
        </div>
        `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    const restaurantsContainer = document.querySelector('#listRestaurant');

    if (restaurants.length === 0) {
      restaurantsContainer.innerHTML = '<p >Daftar Masih Kosong</p>';
    } else {
      restaurants.forEach((restaurant) => {
        restaurantsContainer.innerHTML += createRestaurantListTemplate(restaurant);
      });
    }
  },
};

export default Favorite;
