import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import styled, { createGlobalStyle } from 'styled-components';
import globalStyles from '../utils/globalStyles';

const GlobalStyles = createGlobalStyle`
	${globalStyles}
`;

const AppWrapper = styled.div`
  position: relative;
`;

const Layout = ({ children }) => (
  // TODO: duplicate query names are not allowed.
  // since this query is being used in pages/index.js as well.
  // until we used fragments to reuse, renaming it to 'SiteTitleQuery2'
  // instead of 'SiteTitleQuery'
  <StaticQuery
    query={graphql`
      query SiteTitleQuery2 {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <AppWrapper>
        <GlobalStyles />
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <div>{children}</div>
      </AppWrapper>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
