import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledHeading = styled.h1`
  margin: 0;
  text-align: center;
  padding: 1.45rem 1.0875rem;
`;

const Header = ({ siteTitle, color }) => {
  return (
    <StyledHeading>
      {/* TODO: shift to styled-components */}
      <Link
        to="/"
        style={{
          color,
          textDecoration: 'none',
        }}
      >
        {siteTitle}
      </Link>
    </StyledHeading>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  // style: PropTypes.shape({
  //   color: PropTypes.string.isRequired,
  // }).isRequired,
};

export default Header;
