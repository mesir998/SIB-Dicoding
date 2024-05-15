const assert = require('assert');

// eslint-disable-next-line no-undef
Feature('Liking Restaurants');

// eslint-disable-next-line no-undef
Before(({ I }) => {
  I.amOnPage('#/favorite');
});

// eslint-disable-next-line no-undef
Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('.restaurant-list');
  I.see('Daftar Masih Kosong', '.restaurant-list');
});

// eslint-disable-next-line no-undef
Scenario('liking one restaurant', async ({ I }) => {
  I.seeElement('.restaurant-list');
  I.see('Daftar Masih Kosong', '.restaurant-list');

  I.amOnPage('#/home');
  I.wait(5);

  I.seeElement('.restaurant-item-content h3 a');
  // eslint-disable-next-line no-undef
  const firstRestaurant = locate('.restaurant-item-content h3 a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);
  I.wait(5);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('#/favorite');
  I.wait(5);
  I.seeElement('.restaurant-title');
  const likedRestaurantName = await I.grabTextFrom('.restaurant-name');

  assert.strictEqual(firstRestaurantName, likedRestaurantName);
});

// eslint-disable-next-line no-undef
Scenario('unliking one restaurant', async ({ I }) => {
  I.seeElement('.restaurant-list');
  I.see('Daftar Masih Kosong', '.restaurant-list');

  I.amOnPage('#/home');
  I.wait(5);

  I.waitForElement('.restaurant-item-content h3 a');
  // eslint-disable-next-line no-undef
  const firstRestaurant = locate('.restaurant-item-content h3 a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.clickLink(firstRestaurant);
  I.wait(5);

  I.waitForElement('#likeButton.like');
  I.click('#likeButton.like');

  I.amOnPage('#/favorite');
  I.wait(5);
  I.seeElement('.restaurant-title');
  const likedRestaurantName = await I.grabTextFrom('.restaurant-name');

  assert.strictEqual(firstRestaurantName, likedRestaurantName);

  I.click(likedRestaurantName);
  I.wait(5);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('#/favorite');
  I.dontSee(likedRestaurantName);
});
