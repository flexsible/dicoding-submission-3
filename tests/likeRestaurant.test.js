import likeButtonInitiator from '../src/scripts/utils/like-button.initiator';
import favoriteRestaurant from '../src/public/data/favorite-restaurant';

describe('Liking A Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the like button when the restaurant has not been liked before', async () => {
    await likeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        restaurant: {
          id: 1,
        },
      },
    });

    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeTruthy();
  });

  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    await likeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        restaurant: {
          id: 1,
        },
      },
    });
    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeFalsy();
  });

  it('should be able to like the restaurant', async () => {
    await likeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        restaurant: {
          id: 1,
        },
      },
    });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    const restaurant = await favoriteRestaurant.getRestaurant(1);
    expect(restaurant).toEqual({ id: 1 });

    await favoriteRestaurant.deleteRestaurant(1);
  });

  it('should not add a movie again when its already liked', async () => {
    await likeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        restaurant: {
          id: 1,
        },
      },
    });

    // Tambahkan film dengan ID 1 ke daftar film yang disukai
    await favoriteRestaurant.putRestaurant({ id: 1 });

    // Simulasikan pengguna menekan tombol suka film
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    // Tidak ada film yang ganda
    expect(await favoriteRestaurant.getAllRestaurant()).toEqual([{ id: 1 }]);
    await favoriteRestaurant.deleteRestaurant(1);
  });

  it('should not add a movie when it has no id', async () => {
    await likeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        restaurant: {
          id: 1,
        },
      },
    });
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await favoriteRestaurant.getAllRestaurant()).toEqual([]);
  });
});
