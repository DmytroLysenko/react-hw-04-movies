import React from "react";
import API from "../../utils/MoviesAPI";
import makeImgURL from "../../utils/makeImgURL";
import styles from "./MovieDetails.module.css";
import { Link, Route } from "react-router-dom";

import Loader from "../../components/Loader";
import Error from "../../components/Error";
import Cast from "../../components/Cast";
import Reviews from "../../components/Reviews";

export default class MovieDetails extends React.Component {
  state = {
    movieData: {},
    isLoading: false,
    isError: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    API.getById(this.props.match.params.id)
      .then((movieData) => this.setState({ movieData }))
      .catch((e) => this.setState({ isError: e }))
      .finally(() => this.setState({ isLoading: false }));
  }

  handleClickBtn = () => {
    const { state } = this.props.location;
    if (state && state.from) {
      this.props.history.push(state.from);
      return;
    }
    this.props.history.push("/movies");
  };

  render() {
    const { movieData, isLoading, isError } = this.state;
    const { match } = this.props;
    return (
      <>
        {isLoading && <Loader />}
        {movieData.id && !isError && (
          <>
            <div>
              <div>
                <button
                  className={styles.backBtn}
                  onClick={this.handleClickBtn}
                  type="button"
                >
                  Go back
                </button>
              </div>
              <div className={styles.movieContainer}>
                <div className={styles.posterContainer}>
                  <img
                    src={makeImgURL(movieData.poster_path)}
                    alt={movieData.title}
                    width="400"
                  />
                </div>

                <div className={styles.aboutContainer}>
                  <h1 className={styles.title}>
                    {movieData.title} (
                    {new Date(movieData.release_date).getFullYear()})
                  </h1>
                  <p>User Score: {movieData.vote_average * 10}%</p>
                  <h2>Overview</h2>
                  <p>{movieData.overview}</p>
                  <h2>Genres</h2>
                  <p>
                    {movieData.genres
                      .reduce(
                        (total, item) => (total = [...total, item.name]),
                        []
                      )
                      .join(", ")}
                  </p>
                  <h2>Addition information</h2>
                  <ul className={styles.addInfo__list}>
                    <li className={styles.addInfo__item}>
                      <Link
                        className={styles.addInfo__link}
                        to={{
                          pathname: `${match.url}/cast`,
                          state: this.props.location.state,
                        }}
                      >
                        Cast
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={styles.addInfo__link}
                        to={{
                          pathname: `${match.url}/reviews`,
                          state: this.props.location.state,
                        }}
                      >
                        Reviews
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <Route path={`${match.path}/cast`} component={Cast} />
            <Route path={`${match.path}/reviews`} component={Reviews} />
          </>
        )}
        {isError && <Error error={isError} />}
      </>
    );
  }
}
