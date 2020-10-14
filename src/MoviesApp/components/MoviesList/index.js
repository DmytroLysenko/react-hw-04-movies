import React from "react";
import PropTypes from "prop-types";
import styles from "./MoviesList.module.css";

import MoviesListItem from "../MoviesListItem";
import PageControl from "../PageControl";

const MoviesList = ({
  movies,
  currentPage,
  onChangePage,
  isLastPage,
  location,
}) =>
  movies.length === 0 ? (
    <div>
      <b>There are no movies for this query...</b>
    </div>
  ) : (
    <>
      <ul className={styles.list}>
        {movies.map((movie) => (
          <li className={styles.item} key={movie.id}>
            <MoviesListItem movie={movie} location={location} />
          </li>
        ))}
      </ul>
      <PageControl
        currentPage={currentPage}
        onChangePage={onChangePage}
        isLastPage={isLastPage}
        isNoMovies={movies.length === 0}
      />
    </>
  );
export default MoviesList;

MoviesList.defaultProps = {
  movies: [],
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string,
      title: PropTypes.string.isRequired,
      release_date: PropTypes.string,
    })
  ),
  currentPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  isLastPage: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    state: PropTypes.object,
  }),
};
