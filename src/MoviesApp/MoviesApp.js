import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "./routes";

import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";

const MoviesApp = () => (
  <>
    <Header />
    <Main>
      <Suspense fallback={<Loader />}>
        <Switch>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </Main>
  </>
);

export default MoviesApp;
