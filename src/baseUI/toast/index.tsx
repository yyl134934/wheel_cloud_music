import React from 'react';
import { styled } from 'styled-components';
import globalStyle from '../../assets/global-style';
import { useState } from 'react';
import { forwardRef } from 'react';
import { useImperativeHandle } from 'react';
import { CSSTransition } from 'react-transition-group';

const ToastWrapper = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  height: 50px;
  background: ${globalStyle['highlight-background-color']};
  &.drop-enter {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  &.drop-enter-active {
    opacity: 1;
    transition: all 0.3s;
    transform: translate3d(0, 0, 0);
  }
  &.drop-exit-active {
    opacity: 0;
    transition: all 0.3s;
    transform: translate3d(0, 100%, 0);
  }
  .text {
    line-height: 50px;
    text-align: center;
    color: ${globalStyle['font-color-desc']};
    font-size: ${globalStyle['font-size-l']};
    font-weight: ${globalStyle['font-weight-l']};
  }
`;

const Toast = forwardRef((props: { text: string }, ref) => {
  const [show, setShow] = useState(false);
  const [timer, setTimer] = useState<any>();
  const { text } = props;

  useImperativeHandle(ref, () => ({
    show: () => {
      if (timer) clearTimeout(timer);
      setShow(true);
      setTimer(
        setTimeout(() => {
          setShow(false);
        }, 3000),
      );
    },
  }));

  return (
    <CSSTransition in={show} timeout={300} classNames='drop' unmountOnExit>
      <ToastWrapper>
        <div className='text'>{text}</div>
      </ToastWrapper>
    </CSSTransition>
  );
});

export default React.memo(Toast);
