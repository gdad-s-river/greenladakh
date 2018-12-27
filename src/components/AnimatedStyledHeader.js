import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { animated } from 'react-spring';
import verticalAlign from '../commonStyles/VerticalAlign';

const AnimatedStyledHeader = ({onHeaderMount, ...restProps}) => {
  const ReturnValue = verticalAlign(animated.h1);
  const headerRef = useRef(null);

  useEffect(() => {
    const headerEl = headerRef.current
    /**
     * TODO: NEED TO UNDERSTAND THIS
     * https://stackoverflow.com/questions/11805955/how-to-get-the-distance-from-the-top-for-an-element
     */
    const heightFromViewPort = headerEl.offsetTop - headerEl.scrollTop + headerEl.clientTop;
    onHeaderMount(heightFromViewPort);
  }, [])

  return  <ReturnValue ref={headerRef} {...restProps}/>;
}

AnimatedStyledHeader.propTypes = {
  onHeaderMount: PropTypes.func.isRequired
};

export default AnimatedStyledHeader;