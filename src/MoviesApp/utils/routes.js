import { lazy } from "react";

export default [
  {
    path: "/",
    label: "Home",
    exact: true,
    component: lazy(() =>
      import("../views/Home" /* webpackChunkName: "home" */)
    ),
  },
  {
    path: "/movies/:id",
    label: null,
    exact: false,
    component: lazy(() =>
      import("../views/MovieDetails" /* webpackChunkName: "movieDetails" */)
    ),
  },
  {
    path: "/movies",
    label: "Movies",
    exact: false,
    component: lazy(() =>
      import("../views/Movies" /* webpackChunkName: "movies" */)
    ),
  },
];
