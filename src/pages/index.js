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
import { usePrevious } from '../customHooks';

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

// const AnimatedStyledHeader = verticalAlign(animated.h1);

const AnimatedStyledHeader = ({onHeaderMount, ...restProps}) => {
  const ReturnValue = verticalAlign(animated.h1);
  const headerRef = useRef(null);

  useEffect(() => {
    const { height } = headerRef.current.getBoundingClientRect();
    onHeaderMount(height);
    
    // middleWare((previousHeaderDs) =>  console.log('YEAH SCIENCE!', previousHeaderDs));

    // I want here to update to and from props as well
    // for that I also need previous props

    // TOTRY: https://usehooks.com/#usePrevious
    // to store animation props
  }, [])

  return  <ReturnValue ref={headerRef} {...restProps}/>;
}

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

// function useElDs(ref) {
//   const { width, height } = ref.getBoundingClientRect();
//   return { width, height };
// }

const GreenLadakhHome = () => {
  const [p5Mounted, setp5Mounted] = useState(false);
  const [mountainsPainted, setMountainsPainted] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(null);
  const [{from, to}, setHeaderAnimatedTimeline] = useState({
    from: headerAnimatedFrom,
    to: headerAnimatedTo
  });

  const animationConstructionObject = {
    from,
    to,
    delay: 1000
  }

  const mountainRef = useRef(null);
  const previousHeaderHeight = usePrevious(headerHeight);
  const [animatingHeaderProps, updateAnimatingHeaderProps] = useSpring(animationConstructionObject);

  // const [animeProps, setAnimeProps] = useState({
  //   headerAnimatedFrom,
  //   headerAnimatedTo
  // })

  function onHeaderMount(calculatedHeaderHeight){
    setHeaderHeight(calculatedHeaderHeight);
    // return function middleWareFor(func){
    //   return func(previousHeaderDs);
    // }
    // return function someFactory() {
    //   const prevProps = previousAnimationProps;
    //   return manipulationFunction(prevProps) {
    //     updateAnimatingHeaderProps(newProps);
    //   }
    // }
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
    if (!!headerHeight !== !!previousHeaderHeight) {
      
      updateAnimatingHeaderProps({
        ...animationConstructionObject,
        to: {...to, transform: `translateY(${-100})`},
      })

      setTimeout(() => {
        console.log(animatingHeaderProps);
      }, 3000)
    }
  }, [headerHeight]);
  // console.log(headerDs);

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
                <Header onMount={onHeaderMount}>
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
