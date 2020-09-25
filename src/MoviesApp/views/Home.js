import React from "react";
import API from "../utils/MoviesAPI";
import styles from "./Home.module.css";

import MoviesList from "../components/MoviesList";
import Error from "../components/Error";

export default class Home extends React.Component {
  state = {
    movies: null,
    isError: false,
    page: 1,
    isLastPage: false,
  };

  componentDidMount() {
    this.getMovies(this.state.page);
  }

  componentDidUpdate(props, state) {
    const prevPage = state.page;
    const nextPage = this.state.page;
    if (prevPage !== nextPage) {
      this.getMovies(nextPage);
    }
  }

  handleChangePage = (step) =>
    this.setState((state) => ({
      page: state.page + step,
    }));

  getMovies = (page) =>
    API.getTrendingByDay(page)
      .then((data) => {
        this.setState((state) => ({
          isLastPage: state.page === data.total_pages,
          movies: data.results,
        }));
      })
      .catch((err) => this.setState({ isError: err.message }));

  render() {
    const { movies, isError, page, isLastPage } = this.state;
    return (
      <>
        {movies && !isError && (
          <>
            <h1 className={styles.title}>Tranding today</h1>
            <MoviesList
              movies={movies}
              currentPage={page}
              onChangePage={this.handleChangePage}
              isLastPage={isLastPage}
              location={this.props.location}
            />
          </>
        )}

        {isError && <Error message={isError} />}
      </>
    );
  }
}
