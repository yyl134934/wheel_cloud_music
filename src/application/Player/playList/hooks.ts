import { prefixStyle } from '../../../api/utils';
import { useCallback, useRef, useState } from 'react';

export const useCSSTransition = (listWrapperRef: any) => {
  const [isShow, setIsShow] = useState(false);

  const transform = prefixStyle('transform');

  const onEnterCB = useCallback(() => {
    // 让列表显示
    setIsShow(true);
    // 最开始是隐藏在下面
    listWrapperRef.current.style[transform] = 'translate3d(0, 100%, 0)';
  }, [transform]);

  const onEnteringCB = useCallback(() => {
    // 让列表展现
    listWrapperRef.current.style['transition'] = 'all 0.3s';
    listWrapperRef.current.style[transform] = 'translate3d(0, 0, 0)';
  }, [transform]);

  const onExitingCB = useCallback(() => {
    listWrapperRef.current.style['transition'] = 'all 0.3s';
    listWrapperRef.current.style[transform] = 'translate3d(0px, 100%, 0px)';
  }, [transform]);

  const onExitedCB = useCallback(() => {
    setIsShow(false);
    listWrapperRef.current.style[transform] = 'translate3d(0px, 100%, 0px)';
  }, [transform]);

  return { isShow, onEnterCB, onEnteringCB, onExitingCB, onExitedCB };
};

export const useSlideDown = (wrapperRef: any, handleClose: (isShow: boolean) => void) => {
  // 是否允许滑动事件生效
  const canTouch = useRef(true);
  const listContentRef = useRef<HTMLDivElement | null>(null);

  //touchStart 后记录 y 值
  const startY = useRef(0);
  //touchStart 事件是否已经被触发
  const initialed = useRef(false);
  // 用户下滑的距离
  const distance = useRef(0);

  const handleScroll = (pos: any) => {
    // 只有当内容偏移量为 0 的时候才能下滑关闭 PlayList。否则一边内容在移动，一边列表在移动，出现 bug
    let state = pos.y === 0;
    canTouch.current = state;
  };

  const handleTouchStart = (e: any) => {
    if (!canTouch.current || initialed.current) {
      return;
    }
    distance.current = 0;
    wrapperRef.current.style['transition'] = '';
    startY.current = e.nativeEvent.touches[0].pageY; // 记录 y 值
    initialed.current = true;
  };

  const handleTouchMove = (e: any) => {
    if (!canTouch.current || !initialed.current) {
      return;
    }
    let curDistance = e.nativeEvent.touches[0].pageY - startY.current;
    if (curDistance < 0) {
      return;
    }
    distance.current = curDistance; // 记录下滑距离
    wrapperRef.current.style.transform = `translate3d(0, ${curDistance}px, 0)`;
  };

  const handleTouchEnd = (e: any) => {
    initialed.current = false;
    // 这里设置阈值为 150px
    if (distance.current >= 150) {
      // 大于 150px 则关闭 PlayList
      handleClose(false);
    } else {
      // 否则反弹回去
      wrapperRef.current.style['transition'] = 'all 0.3s';
      wrapperRef.current.style['transform'] = 'translate3d(0px, 0px, 0px)';
    }
  };

  return { ref: listContentRef, handleScroll, handleTouchStart, handleTouchMove, handleTouchEnd };
};
