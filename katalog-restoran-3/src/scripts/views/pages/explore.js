import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantListTemplate } from '../templates/template-creator';

const ExploreRestaurants = {
  async render() {
    return `
        <div class="content">
            <div class="content-header">
                <h1 class="content_label">Explore Restaurants</h1>
            </div>
            <div id="restaurantsList" class="restaurant-list"">
            </div>
        </div>
        `;
  },

  async afterRender() {
    const restaurants = await RestaurantSource.exploreRestaurants();
    const restaurantsContainer = document.querySelector('#restaurantsList');
    restaurants.forEach((restaurant) => {
      const restaurantListTemplate = createRestaurantListTemplate(restaurant);
      restaurantsContainer.innerHTML += restaurantListTemplate;
    });
  },
};

export default ExploreRestaurants;