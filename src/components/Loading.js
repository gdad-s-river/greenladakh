import React from 'react';
import styled from 'styled-components';
import verticalAlign from '../commonStyles/VerticalAlign';

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

export default Loading;
