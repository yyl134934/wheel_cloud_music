import styled from 'styled-components';

// 配合better-scroll组件, 使容器高度固定, 当子元素高度超过容器元素高度时，
// 通过 transfrom 动画产生滑动效果，因此它的使用原则就是外部容器必须是固定高度，不然没法滚动。
export const Content = styled.div`
  position: fixed;
  top: 90px;
  bottom: 0;
  width: 100%;
`;
