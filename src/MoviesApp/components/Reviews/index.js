import React from "react";
import PropTypes from "prop-types";

import API from "../../utils/MoviesAPI";

import styles from "./Reviews.module.css";

import Loader from "../Loader";
import Error from "../Error";

export default class Reviews extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }),
    }),
  };

  state = {
    reviews: [],
    isLoading: false,
    isError: false,
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.setState({ isLoading: true });
    API.getReviews(id)
      .then((data) => this.setState({ reviews: data.results }))
      .catch((err) => this.setState({ isError: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { reviews, isError, isLoading } = this.state;
    return (
      <>
        {isLoading && <Loader />}
        {!isError ? (
          reviews.length !== 0 ? (
            <ul className={styles.list}>
              {reviews.map((item) => (
                <li className={styles.item} key={item.id}>
                  <p className={styles.author}>{item.author}</p>
                  <p className={styles.content}>{item.content}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>We don`t have any reviews for this movie.</p>
          )
        ) : null}
        {isError && <Error message={isError} />}
      </>
    );
  }
}
