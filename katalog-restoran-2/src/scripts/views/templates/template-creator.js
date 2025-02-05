import CONFIG from '../../globals/config';

const createRestaurantDetailTemplate = (restaurant) => `
    <div class="detail-header">
        <h2 class="restaurant-name">${restaurant.name}</h2>
        <img class="restaurant-image" src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" />
    </div>
    <div class="detail-info">
        <h3>Information</h3>
        <div class = "alamat">
            <h4>Alamat</h4>
            <p>${restaurant.address}</p>
            <h4>Kota</h4>
            <p>${restaurant.city}</p>
        </div>
    </div>
    <div class="menu">
        <h3>Menu</h3>
        <div class="makanan">
            <h4>Menu Makanan</h4>
            <p>${restaurant.menus.foods.map((food) => `- ${food.name}`).join('<br>')}</p>
        </div>
        <div class="minuman">
            <h4>Menu Minuman</h4>
            <p>${restaurant.menus.drinks.map((drink) => `- ${drink.name}`).join('<br>')}</p>
        </div>
    </div>
    <h3 class="detail-review-header">Costumer Reviews</h3>
    <div class="judul-review">
            ${restaurant.customerReviews
    .map(
      (review) => `
                <div class="ulasan-item">
                    <div class="review-item_bold">
                        <p class="review-item_date">${review.date}</p>
                        <p class="review-item_name">${review.name}</p>
                    </div>
                    <p class="review-item_review">${review.review}</p>
                </div>
                `,
    )
    .join('')}
    </div>
    <div class="detail-description">
        <h3>Description</h3>
        <p>${restaurant.description}</p>
    </div>
`;

const createListRestaurantTemplate = (restaurant) => `
    <div id="restaurantTitle" class="restaurant-title">
        <div class="restaurant-item-header">
            <p>${restaurant.city}</p>
            <img class="restaurant-img" alt="${restaurant.name}"
            src="${restaurant.pictureId ? CONFIG.BASE_IMAGE_URL + restaurant.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}">
            <div class="restaurant-rating">
                <h2>⭐️<span class="restaurant-score">${restaurant.rating}</span></h2>
            </div>
        </div>
        <div class="restaurant-item-content">
            <a href="/#/detail/${restaurant.id}">
                <h3><b>${restaurant.name}</b></h3>
            </a>
            <p>${`${restaurant.description.slice(0, 250)} ...`}</p>
        </div>
    </div>
`;

const createLikeButtonTemplate = () => `
    <button aria-label="like this movie" id="likeButton" class="like">
        <i class="fa fa-heart-o" aria-hidden="true"></i>
    </button>
`;

const createLikedButtonTemplate = () => `
    <button aria-label="unlike this movie" id="likeButton" class="like">
        <i class="fa fa-heart" aria-hidden="true"></i>
    </button>
`;

export {
  // eslint-disable-next-line max-len
  createListRestaurantTemplate, createRestaurantDetailTemplate, createLikeButtonTemplate, createLikedButtonTemplate,
};
