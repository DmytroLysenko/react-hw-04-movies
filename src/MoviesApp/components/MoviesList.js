import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import makeImgURL from "../utils/makeImgURL";
import styles from "./MoviesList.module.css";

import PageControl from "./PageControl";

const MoviesList = ({
  movies,
  currentPage,
  onChangePage,
  isLastPage,
  location,
}) =>
  movies.length === 0 ? (
    <h2>No data for this query</h2>
  ) : (
    <>
      <ul className={styles.list}>
        {movies.map((movie) => (
          <li className={styles.item} key={movie.id}>
            <Link
              className={styles.itemLink}
              to={{
                pathname: `/movies/${movie.id}`,
                state: { from: location },
              }}
            >
              <img src={makeImgURL(movie.poster_path)} alt={movie.title} />
              <p>
                {movie.title} ({new Date(movie.release_date).getFullYear()})
              </p>
            </Link>
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
  location: PropTypes.object,
};
