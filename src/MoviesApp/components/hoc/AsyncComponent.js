import React from "react";

/**
 * Dinamic loader of Component for code splitting.
 *
 * @param {async function} loader = () => import("path/to/Component").
 *  * @returns {Component} - as a result of new query in XHR
 */
const AsyncComponent = (loader) => {
  return class AsyncComponent extends React.Component {
    state = {
      component: null,
    };

    componentDidMount() {
      loader().then((module) =>
        this.setState({
          component: module.default,
        })
      );
    }

    render() {
      const { component: LoadedComponent } = this.state;
      return LoadedComponent && <LoadedComponent />;
    }
  };
};

export default AsyncComponent;
