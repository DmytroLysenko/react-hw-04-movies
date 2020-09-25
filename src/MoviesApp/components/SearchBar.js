import React from "react";
import styles from "./SearchBar.module.css";

export default class SearchBar extends React.Component {
  state = {
    inputValue: "",
  };

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.inputValue.split(" ").join("-"));
  };

  render() {
    const { inputValue } = this.state;
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <input
          className={styles.input}
          type="text"
          value={inputValue}
          placeholder="Enter keyword for search movies"
          onChange={this.handleChange}
        />
        <button className={styles.submitBtn} type="submit">
          Search
        </button>
      </form>
    );
  }
}
