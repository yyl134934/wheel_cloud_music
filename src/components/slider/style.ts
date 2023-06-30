import styled from 'styled-components';
import globalStyle from '../../assets/global-style';

export const SliderContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: auto;
  background: white;
  .before {
    position: absolute;
    top: -18.75rem;
    height: 25rem;
    width: 100%;
    background-color: ${globalStyle['theme-color']};
  }
  .slider-container {
    position: relative;
    width: 98%;
    height: 10rem;
    overflow: hidden;
    margin: auto;
    border-radius: 6px;
    .slider-nav {
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
    }
    .swiper-pagination-bullet-active {
      background: ${globalStyle['theme-color']};
    }
  }
`;
