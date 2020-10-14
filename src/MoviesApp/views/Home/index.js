import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import styles from "./Home.module.css";

import MoviesAPI from "../../utils/MoviesAPI";

import MoviesListItem from "../../components/MoviesListItem";
import Loader from "../../components/Loader";
import Error from "../../components/Error";

export default class Home extends React.Component {
  state = {
    page: 1,
    total_page: 1,
    movies: [],
    error: null,
  };

  componentDidMount() {
    MoviesAPI.getTrendingByDay(this.state.page)
      .then((data) => {
        this.setState({
          movies: data.results,
          page: 2,
          total_pages: data.total_pages,
        });
      })
      .catch((error) => this.props.onMoviesListError(error));
  }

  fetchNextData = () =>
    MoviesAPI.getTrendingByDay(this.state.page)
      .then((data) =>
        this.setState((prevState) => ({
          movies: [...prevState.movies, ...data.results],
          page: prevState.page + 1,
        }))
      )
      .catch((error) => this.props.onMoviesListError(error));

  handleMoviesListError = (error) => this.setState({ error });

  render() {
    const { movies, page, total_pages, error } = this.state;
    return (
      <>
        {movies.length > 0 && !error && (
          <>
            <h1 className={styles.title}>Tranding today</h1>
            <InfiniteScroll
              dataLength={movies.length} //This is important field to render the next data
              next={this.fetchNextData}
              hasMore={total_pages > page}
              loader={<Loader />}
              endMessage={
                this.state.movies.length !== 0 && (
                  <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                )
              }
            >
              {movies.length > 0 && (
                <ul className={styles.list}>
                  {movies.map((item) => (
                    <li className={styles.item} key={item.id}>
                      <MoviesListItem
                        movie={item}
                        location={this.props.location}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </InfiniteScroll>
          </>
        )}

        {error && <Error message={error} />}
      </>
    );
  }
}
