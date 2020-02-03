import React from "react";
//import PropTypes from "prop-types";
import styles from './Heading.scss';

const Heading = ({level, children}) => {
    const headerStyle = `${styles.header} ${styles[`header--${level}`]}`;
    return React.createElement(
      `h${level}`,
      { className: headerStyle },
      children
    )
}

export default Heading;
