import React from "react";
import PropTypes from "prop-types";
import styles from "./PageControl.module.css";

export default class PageControl extends React.Component {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    isLastPage: PropTypes.bool.isRequired,
    isNoMovies: PropTypes.bool.isRequired,
  };

  handleClick = (e) => {
    if (e.target.nodeName !== "BUTTON") {
      return;
    }
    this.props.onChangePage(Number(e.target.dataset.step));
  };

  render() {
    const { currentPage, isLastPage, isNoMovies } = this.props;
    return (
      <div className={styles.container} onClick={this.handleClick}>
        <button
          className={styles.btn}
          type="button"
          data-step="-1"
          disabled={isNoMovies || currentPage < 2}
        >
          Prev
        </button>
        <button
          className={styles.btn}
          type="button"
          data-step="1"
          disabled={isNoMovies || isLastPage}
        >
          Next
        </button>
      </div>
    );
  }
}
