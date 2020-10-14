import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import makeImgURL from "../../utils/makeImgURL";
import styles from "./MoviesListItem.module.css";

const MoviesListItem = ({ movie, location }) => (
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
);

export default MoviesListItem;

MoviesListItem.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    poster_path: PropTypes.string,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string,
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    state: PropTypes.object,
  }),
};
