import { graphql, StaticQuery } from 'gatsby';
import React, {
  Fragment,
  useEffect,
  useRef,
  useState 
} from 'react';
import PropTypes from 'prop-types';
import { setConfig } from 'react-hot-loader';
// import { config, Spring } from 'react-spring';
import { useSpring, animated} from 'react-spring';
import styled from 'styled-components';
import verticalAlign from '../commonStyles/VerticalAlign';
import Header from '../components/header';
import Layout from '../components/layout';
import mountainsSketch from '../utils/mountainsSketch';
import { Link } from '@reach/router';

// const AnimatedHeader = ({ className, children, animationProps }) => (
//   <animated.div 
//     className={className}
//     style={animationProps}
//   >
//     {children}
//   </animated.div>
// );

// AnimatedHeader.propTypes = {
//   children: PropTypes.element,
//   className: PropTypes.string,
//   animationProps: PropTypes.object
// }

// useEffect(() => {
//   // console.log('yeah science ', ref);
// }, []);

// const StyledHomeHeader = styled(verticalAlign(AnimatedHeader))`
//   background: ${props => props.background};
//   top: ${props => props.top};
//   opacity: ${props => props.opacity};
// `;

// const AnimatedWrapper = (el, props) => {
//   const element = animated[el];
//   return <element {...props}>
// }

const AnimatedStyledHeader = verticalAlign(animated.h1);

const headerAnimatedFrom = {
  background: '#dcedc8',
  color: 'black',
  fontSize: '2rem',
  textAlign: 'center',
  margin: 0,
  padding: '1.45rem 1.0875rem',
  opacity: 0.5
};

const headerAnimatedTo = {
  background: '#8aab71',
  color: 'white',
  opacity: 1
};

// to use hooks with gatsbyjs
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
  
  const [animatingHeaderProps] = useSpring({
    from: headerAnimatedFrom,
    to: headerAnimatedTo,
    delay: 1000
  });

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
                <Header>
                  <AnimatedStyledHeader style={animatingHeaderProps}>
                    {data.site.siteMetadata.title}
                 </AnimatedStyledHeader>
                </Header>
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
