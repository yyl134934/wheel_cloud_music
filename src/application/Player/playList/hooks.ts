import { prefixStyle } from '../../../api/utils';
import { useCallback, useState } from 'react';

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
