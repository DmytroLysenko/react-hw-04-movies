import React from "react";
import queryString from "query-string";
import API from "../utils/MoviesAPI";

import SearchBar from "../components/SearchBar";
import MoviesList from "../components/MoviesList";
import Error from "../components/Error";

export default class Movies extends React.Component {
  state = {
    movies: null,
    isError: false,
    isLastPage: false,
  };

  componentDidMount() {
    const { query, page } = queryString.parse(this.props.location.search);

    if (!query) {
      return;
    }

    if (!page) {
      this.props.history.push({
        search: `?query=${query}&page=1`,
      });
      return;
    }

    this.getMovies(query, page);
  }

  componentDidUpdate(props, state) {
    const prevQuery = queryString.parse(props.location.search).query;
    const prevPage = queryString.parse(props.location.search).page;
    const nextQuery = queryString.parse(this.props.location.search).query;
    const nextPage = queryString.parse(this.props.location.search).page;

    if (prevQuery !== nextQuery) {
      this.getMovies(nextQuery, nextPage);
      return;
    }
    if (prevPage !== nextPage) {
      this.getMovies(prevQuery, nextPage);
    }
  }

  handleChangeQuery = (query) => {
    if (query !== queryString.parse(this.props.location.search).query) {
      this.props.history.push({
        search: `?query=${query}&page=1`,
      });
    }
  };

  handleChangePage = (step) => {
    const { query, page } = queryString.parse(this.props.location.search);
    this.props.history.push({
      search: `?query=${query}&page=${Number(page) + step}`,
    });
  };

  getMovies = (query, page) =>
    API.getByQuery(query, page)
      .then((data) => {
        this.setState({
          isLastPage: data.page === data.total_pages,
          movies: data.results,
        });
      })
      .catch((err) => this.setState({ isError: err.message }));

  render() {
    const { movies, isError, isLastPage } = this.state;
    const { page } = queryString.parse(this.props.location.search);
    return (
      <>
        <SearchBar onSubmit={this.handleChangeQuery} />
        {movies && !isError && (
          <MoviesList
            movies={movies}
            currentPage={Number(page)}
            onChangePage={this.handleChangePage}
            isLastPage={isLastPage}
            location={this.props.location}
          />
        )}
        {isError && <Error massage={isError} />}
      </>
    );
  }
}
