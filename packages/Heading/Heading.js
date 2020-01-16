import React from "react";
//import PropTypes from "prop-types";
import styles from './Heading.scss';

const Heading = ({children}) => {
return <h1 className={styles.header}>{children}</h1>;
}

export default Heading;
