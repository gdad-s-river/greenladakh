import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';
import verticalAlign from '../commonStyles/VerticalAlign';

const StyledHeaderWrapper = styled(verticalAlign('div'))`
  background: #dcedc8;
  opacity: 0.5;
`;

const StyledHeading = styled.h1`
  margin: 0;
  text-align: center;
  padding: 1.45rem 1.0875rem;
`;

const Header = ({ siteTitle }) => (
  <StyledHeaderWrapper>
    <StyledHeading>
      <Link
        to="/"
        style={{
          color: 'black',
          textDecoration: 'none',
        }}
      >
        {siteTitle}
      </Link>
    </StyledHeading>
  </StyledHeaderWrapper>
);

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
};

export default Header;
