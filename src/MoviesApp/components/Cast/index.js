import React from "react";
import PropTypes from "prop-types";

import API from "../../utils/MoviesAPI";
import makeImgURL from "../../utils/makeImgURL";

import styles from "./Cast.module.css";

import Loader from "../Loader";
import Error from "../Error";

export default class Cast extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }),
    }),
  };

  state = {
    castList: [],
    isLoading: false,
    isError: false,
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.setState({ isLoading: true });
    API.getCredits(id)
      .then((data) => this.setState({ castList: data.cast }))
      .catch((err) => this.setState({ isError: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { castList, isLoading, isError } = this.state;
    return (
      <>
        {isLoading && <Loader />}
        {castList.length !== 0 && !isError && (
          <ul className={styles.list}>
            {castList.map((item) => (
              <li className={styles.item} key={item.id}>
                <img
                  src={makeImgURL(item.profile_path)}
                  alt={item.name}
                  width="50"
                />
                <p className={styles.name}>{item.name}</p>
              </li>
            ))}
          </ul>
        )}
        {isError && <Error message={isError} />}
      </>
    );
  }
}

// Cast.propTypes = {
//   match: PropTypes.shape({
//     params: PropTypes.shape({
//       id: PropTypes.string.isRequired,
//     }),
//   }),
// };
