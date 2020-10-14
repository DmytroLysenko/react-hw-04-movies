import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "./utils/routes";

import Layout from "./components/layout";
import Loader from "./components/Loader";

const MoviesApp = () => (
  <Layout>
    <Suspense fallback={<Loader />}>
      <Switch>
        {routes.map((route) => (
          <Route key={route.path} {...route} />
        ))}
        <Redirect to="/" />
      </Switch>
    </Suspense>
  </Layout>
);

export default MoviesApp;
