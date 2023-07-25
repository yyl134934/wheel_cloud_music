import React from 'react';
import styled, { keyframes } from 'styled-components';

const marquee = keyframes`  
        0% {
                transform: translateX(100%);
        }
        100% {
                transform: translateX(-100%);
        }
`;

const MarqueeWrapper = styled.div`
  white-space: nowrap;
  overflow: hidden;
  animation: ${marquee} 5s linear infinite;
  z-index: -1;
  &:hover {
    animation-play-state: paused;
  }
`;

export const Marquee = ({ children }: { children: React.ReactNode }) => {
  return <MarqueeWrapper>{children}</MarqueeWrapper>;
};
