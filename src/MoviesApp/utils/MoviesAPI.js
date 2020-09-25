class MoviesAPI {
  options = {
    BASE_URL: "https://api.themoviedb.org/3",
    KEY: "ca2c7e773cf6fefdb841fee8ddd31808",
  };

  getData = (URL) => {
    return fetch(URL).then((j) => j.json());
  };

  getTrendingByDay = (page = 1) => {
    const { BASE_URL, KEY } = this.options;
    const URL = `${BASE_URL}/trending/movie/day?api_key=${KEY}&page=${page}`;
    return this.getData(URL);
  };

  getByQuery = (query, page = 1) => {
    const { BASE_URL, KEY } = this.options;
    const URL = `${BASE_URL}/search/movie?api_key=${KEY}&query=${query}&page=${page}`;
    return this.getData(URL);
  };

  getById = (id) => {
    const { BASE_URL, KEY } = this.options;
    const URL = `${BASE_URL}/movie/${id}?api_key=${KEY}`;
    return this.getData(URL);
  };

  getCredits = (id) => {
    const { BASE_URL, KEY } = this.options;
    const URL = `${BASE_URL}/movie/${id}/credits?api_key=${KEY}`;
    return this.getData(URL);
  };
  getReviews = (id) => {
    const { BASE_URL, KEY } = this.options;
    const URL = `${BASE_URL}/movie/${id}/reviews?api_key=${KEY}`;
    return this.getData(URL);
  };
}

export default new MoviesAPI();
