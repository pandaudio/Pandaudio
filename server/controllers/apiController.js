const axios = require('axios');

/**
 * Controller for interactions with the Spotify API
 */
const apiController = {};

/**
 * Search for a particular song on the spotify API
 */
apiController.search = async (req, res, next) => {
  try {
    const { token } = req.body;
    let { searchQuery } = req.body;

    // Replace all spaces with '%20'
    searchQuery = searchQuery.replace(/\s/g, '%20');

    const result = await axios.get(
      `https://api.spotify.com/v1/search?q=${searchQuery}&type=track&market=US&limit=5`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(result);

    res.locals.searchResult = result.data.tracks.items;

    return next();

    // Catch errors
  } catch ({ message }) {
    return next({
      log: 'Error in apiController.search',
      message,
    });
  }
};

module.exports = apiController;
