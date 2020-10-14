import React from "react";
import Loader from "react-loader-spinner";
import styles from "./Loader.module.css";

export default class App extends React.Component {
  //other logic
  render() {
    return (
      <div className={styles.loader__container}>
        <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
        {/* <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} /> */}
      </div>
    );
  }
}
