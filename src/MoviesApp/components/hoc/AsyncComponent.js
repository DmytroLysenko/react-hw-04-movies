import React from "react";

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
