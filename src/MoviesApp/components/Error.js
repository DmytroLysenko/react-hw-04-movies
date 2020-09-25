import React from "react";
import PropTypes from "prop-types";

const Error = ({ message }) => (
  <>
    <h2>Ooops... something went wrong :(</h2>
    <p>{message}</p>
  </>
);

export default Error;

Error.propTypes = {
  message: PropTypes.string,
};
