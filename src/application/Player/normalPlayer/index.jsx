//normalPlayer/index.js
import React from 'react';
import { getName, prefixStyle } from '../../../api/utils';
import { NormalPlayerContainer, Top, Middle, Bottom, Operators, CDWrapper, ProgressWrapper } from './style';
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import useKeyframeAnimation from './hooks';
import ProgressBar from '../../../baseUI/progress-bar';

function NormalPlayer(props) {
  const { song, fullScreen } = props;
  const { toggleFullScreen } = props;
  const nodeRef = useRef(null);
  const cdWrapperRef = useRef(null);

  const { enter, afterEnter, leave, afterLeave } = useKeyframeAnimation(nodeRef, cdWrapperRef);

  const ctConfig = {
    nodeRef,
    classNames: 'normal',
    in: fullScreen,
    timeout: 400,
    mountOnEnter: true,
    onEnter: enter,
    onEntered: afterEnter,
    onExit: leave,
    onExited: afterLeave,
  };

  return (
    <CSSTransition {...ctConfig}>
      <NormalPlayerContainer ref={nodeRef}>
        <div className='background'>
          <img src={song.al.picUrl + '?param=300x300'} width='100%' height='100%' alt='歌曲图片' />
        </div>
        <div className='background layer'></div>
        <Top className='top'>
          <div className='back' onClick={() => toggleFullScreen(false)}>
            <i className='iconfont icon-back'>&#xe662;</i>
          </div>
          <h1 className='title'>{song.name}</h1>
          <h1 className='subtitle'>{getName(song.ar)}</h1>
        </Top>
        <Middle ref={cdWrapperRef}>
          <CDWrapper>
            <div className='cd'>
              <img className='image play' src={song.al.picUrl + '?param=400x400'} alt='' />
            </div>
          </CDWrapper>
        </Middle>
        <Bottom className='bottom'>
          <ProgressWrapper>
            <span className='time time-l'>0:00</span>
            <div className='progress-bar-wrapper'>
              <ProgressBar precent={0.2} percentChange={() => {}}></ProgressBar>
            </div>
            <span className='time time-r'>3:24</span>
          </ProgressWrapper>
          <Operators>
            <div className='icon i-left'>
              <i className='iconfont'>&#xe625;</i>
            </div>
            <div className='icon i-left'>
              <i className='iconfont'>&#xe6e1;</i>
            </div>
            <div className='icon i-center'>
              <i className='iconfont'>&#xe723;</i>
            </div>
            <div className='icon i-right'>
              <i className='iconfont'>&#xe718;</i>
            </div>
            <div className='icon i-right'>
              <i className='iconfont'>&#xe640;</i>
            </div>
          </Operators>
        </Bottom>
      </NormalPlayerContainer>
    </CSSTransition>
  );
}
export default React.memo(NormalPlayer);
