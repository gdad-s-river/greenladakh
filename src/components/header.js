import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

const Header = ({ children }) => {

  return (
      <Link
        to="/"
        style={{
          textDecoration: 'none',
        }}
      >
        {children}

      </Link>
  );
};

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ]).isRequired
};

export default Header;
