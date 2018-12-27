import { graphql, StaticQuery } from 'gatsby';
import React, {
  Fragment,
  useEffect,
  useRef,
  useState
} from 'react';
import { setConfig } from 'react-hot-loader';
// import { config, Spring } from 'react-spring';
import { useSpring } from 'react-spring';
import Header from '../components/header';
import Layout from '../components/layout';
import mountainsSketch from '../utils/mountainsSketch';
import { usePrevious } from '../customHooks';

import {
  Loading,
  AnimatedStyledHeader 
} from '../components';

const headerAnimatedFrom = {
  background: '#dcedc8',
  color: 'black',
  fontSize: '2rem',
  textAlign: 'center',
  margin: 0,
  padding: '1.45rem 1.0875rem',
  opacity: 0.5,
  transform: `translateY(0px)`
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
  const [headerHeight, setHeaderHeight] = useState(null);

  const animationConstructionObject = {
    from: headerAnimatedFrom,
    to: headerAnimatedTo,
    delay: 1000
  }

  const mountainRef = useRef(null);
  const previousHeaderHeight = usePrevious(headerHeight);
  const [animatingHeaderProps, updateAnimatingHeaderProps] = useSpring(() => animationConstructionObject);

  /**
   * needed, because useSpring(callback) doesn't set state automatically, a manual set is needed 
   * even for initialization.
   */
  updateAnimatingHeaderProps(animationConstructionObject);  

  function onHeaderMount(calculatedHeaderHeight){
    setHeaderHeight(calculatedHeaderHeight);
  }

  useEffect(async () => {
    const p5 = await import('p5');
    /** disabling 2 rules - new sideeffect and capital firexist letter of constructor */
    setp5Mounted(true);
    // eslint-disable-next-line
    new p5.default(mountainsSketch, mountainRef.current.id);
    setMountainsPainted(true);
  }, []); /**
	https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once
  */


  useEffect(() => {
    /** none of the two below are null, and headerHeght has some value */
    if (!!headerHeight !== !!previousHeaderHeight) {
      updateAnimatingHeaderProps({
        ...animationConstructionObject,
        to: {
          ...headerAnimatedTo,
          transform: `translateY(-${headerHeight})`
        }
      });
    }
  }, [headerHeight]);

  /** I HAVE TO SOMEHOW HAVE THE 'to' AND 'from' VALUE FOR TRANSLATEY */

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
                  <AnimatedStyledHeader 
                    style={animatingHeaderProps}
                    onHeaderMount={onHeaderMount}
                  >
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

// this works
export default GreenLadakhHome;
