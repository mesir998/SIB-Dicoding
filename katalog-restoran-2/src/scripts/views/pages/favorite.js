import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import { createListRestaurantTemplate } from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
        <div class="content">
            <div class="content-header">
                <h1 class="content_label">Favorite Restoran Kamu</h1>
            </div>
            <div id="listRestaurant" class="list-restaurant">
            </div>
        </div>
        `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    const restaurantsContainer = document.querySelector('#listRestaurant');

    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createListRestaurantTemplate(restaurant);
    });
  },
};

export default Favorite;
