import styled from 'styled-components';

export default function verticalAlign(tag) {
  return styled(tag)`
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  `;
}
