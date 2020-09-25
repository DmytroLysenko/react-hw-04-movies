import React from "react";
import styles from "./Header.module.css";

import Navigation from "./Navigation";

const Header = () => (
  <header className={styles.header}>
    <Navigation />
  </header>
);

export default Header;
