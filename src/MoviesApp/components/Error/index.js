import React from "react";
import PropTypes from "prop-types";

const Error = ({ error }) => (
  <>
    <h2>Ooops... something went wrong :(</h2>
    <p>{error.message}</p>
  </>
);

export default Error;

Error.defaultProps = {
  error: {
    message: "Oops! Something went wrong...",
  },
};

Error.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};
