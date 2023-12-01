const { async } = require("regenerator-runtime");
const assert = require('assert');

Feature('Liking Restaurant');

Before(({ I }) => {
    //root http:localhost:8080
  I.amOnPage('/#/like');
});

Scenario('showing empty favorite Restaurant', ({ I }) => {
    I.seeElement('#restaurantList');
    I.see('Tidak ada restaurant untuk ditampilkan', '#restaurantList');
});

Scenario('liking one restaurant', async ({ I }) => {
    I.see('Tidak ada restaurant untuk ditampilkan', '#restaurantList');
   
    I.amOnPage('/');
    I.seeElement('#card a .card-body');
    const firstRestaurant = locate('.card-title').first()
    const firstRestaurantTitle = await I.grabTextFrom(locate(firstRestaurant));
    I.click('#card a');

    I.seeElement('#likeButton');
    I.click('#likeButton');
    I.amOnPage('/#/like');
    I.seeElement('#card a .card-body');
    const likedRestaurantTitle = await I.grabTextFrom('.card-title');
    assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
  });

  Scenario('Unlike one restaurant', async ({ I }) => {
    I.see('Tidak ada restaurant untuk ditampilkan', '#restaurantList');
   
    I.amOnPage('/');
    I.seeElement('#card a .card-body');
    I.click('#card a');

    I.seeElement('#likeButton');
    I.click('#likeButton');
    I.amOnPage('/#/like');
    I.seeElement('#card a .card-body');
    const likedRestaurantTitle = await I.grabTextFrom('.card-title');
    I.click(likedRestaurantTitle);
    I.seeElement('#likeButton');
    I.click('#likeButton');
    I.amOnPage('/#/like');
    I.seeElement('.restaurantList')
    I.dontSeeElement('.card');
    I.dontSeeElement('.card-title');

  })
