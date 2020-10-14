import React from "react";
import routes from "../../../../utils/routes";
import styles from "./Navigation.module.css";

import { NavLink } from "react-router-dom";

const Navigation = () => (
  <nav className={styles.header__nav}>
    <ul className={styles.nav__list}>
      {routes
        .filter((route) => route.label !== null)
        .map((route) => {
          return (
            <li key={route.label} className={styles.list__item}>
              <NavLink
                to={route.path}
                exact={route.exact}
                className={styles.item__link}
                activeClassName={styles.item_linkActive}
              >
                {route.label}
              </NavLink>
            </li>
          );
        })}
    </ul>
  </nav>
);

export default Navigation;
