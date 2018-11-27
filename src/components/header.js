import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
// import styled from 'styled-components';

// const StyledHeading = styled.h1`
//   margin: 0;
//   text-align: center;
//   padding: 1.45rem 1.0875rem;
// `;

const Header = ({ children }) => {
  return (
    // <StyledHeading>
      <Link
        to="/"
        style={{
          textDecoration: 'none',
        }}
      >
        {children}
      </Link>
    // </StyledHeading>
  );
};

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ]).isRequired
  // style: PropTypes.shape({
  //   color: PropTypes.string.isRequired,
  // }).isRequired,
};

export default Header;
