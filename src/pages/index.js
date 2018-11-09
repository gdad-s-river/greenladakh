import { graphql, StaticQuery } from 'gatsby';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { setConfig } from 'react-hot-loader';
import { config, Spring } from 'react-spring';
import styled from 'styled-components';
import verticalAlign from '../commonStyles/VerticalAlign';
import Header from '../components/header';
import Layout from '../components/layout';
import mountainsSketch from '../utils/mountainsSketch';

const StyledHomeHeader = styled(verticalAlign('div'))`
  background: ${props => props.background};
  top: ${props => props.top};
  opacity: ${props => props.opacity};
`;

setConfig({ pureSFC: true });

const GreenLadakhHome = () => {
  const [p5Mounted, setp5Mounted] = useState(false);
  const [mountainsPainted, setMountainsPainted] = useState(false);
  const mountainRef = useRef(null);

  useEffect(async () => {
    const p5 = await import('p5');
    /** disabling 2 rules - new sideeffect and capital first letter of constructor */
    setp5Mounted(true);
    // eslint-disable-next-line
    new p5.default(mountainsSketch, mountainRef.current.id);

    setMountainsPainted(true);
  }, []); /**
	https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once
	*/

  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <Layout>
          {p5Mounted ? (
            <Fragment>
              <main
                ref={mountainRef}
                id="moving-mountains"
                style={{
                  width: '100%',
                  height: '100%',
                  // overflow: 'hidden',
                  color: 'white',
                }}
              />
              {mountainsPainted ? (
                <Spring
                  config={config.gentle}
                  from={{
                    top: '50%',
                    background: '#dcedc8',
                    opacity: 0.5,
                    color: 'black',
                  }}
                  to={{
                    top: '7%',
                    background: '#8aab71',
                    opacity: 1,
                    color: 'white',
                  }}
                  delay={1000}
                >
                  {props => {
                    return (
                      // TOTRY: useEffect for color, so that it's changes are reactive
                      <StyledHomeHeader {...props}>
                        <Header
                          siteTitle={data.site.siteMetadata.title}
                          color={props.color}
                        />
                      </StyledHomeHeader>
                    );
                  }}
                </Spring>
              ) : null}
            </Fragment>
          ) : (
            // TODO: perhaps add a spinner ?: react svg spinner https://github.com/chantastic/react-svg-spinner
            <Loading />
          )}
        </Layout>
      )}
    />
  );
};

const LoadingWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #538d4e;
  overflow: hidden;
`;

const LoadingText = styled(verticalAlign('span'))`
  text-align: center;
  padding: 1.45rem 1.0875rem;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 2.25rem;
`;

function Loading() {
  return (
    <LoadingWrapper>
      <LoadingText>Loading...</LoadingText>
    </LoadingWrapper>
  );
}

// this works
export default GreenLadakhHome;
