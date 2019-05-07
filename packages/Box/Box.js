import React from "react";
import PropTypes from "prop-types";

import styles from "./Box.scss";

const Box = ({ children, onClick }) => {
  return (
    <div onClick={onClick} className={styles.header}>
      {children}
    </div>
  );
};

Box.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

Box.defaultProps = {
  onClick: () => {}
};

export default Box;
