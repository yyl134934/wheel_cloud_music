//normalPlayer/index.js
import React, { useState } from 'react';
import { formatPlayTime, getName, prefixStyle } from '../../../api/utils';
import { NormalPlayerContainer, Top, Middle, Bottom, Operators, CDWrapper, ProgressWrapper } from './style';
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import useKeyframeAnimation from './hooks';
import ProgressBar from '../../../baseUI/progress-bar';
import { playMode } from '../../../api/config';

function NormalPlayer(props) {
  const { song, fullScreen, playing, percent, duration, currentTime, mode } = props;
  const { toggleFullScreen, clickPlaying, onProgressChange, handlePrev, handleNext, changeMode } = props;
  const nodeRef = useRef(null);
  const cdWrapperRef = useRef(null);

  const { enter, afterEnter, leave, afterLeave } = useKeyframeAnimation(nodeRef, cdWrapperRef);

  //getPlayMode方法
  const getPlayMode = () => {
    let content;
    if (mode === playMode.sequence) {
      content = '&#xe625;';
    } else if (mode === playMode.loop) {
      content = '&#xe653;';
    } else {
      content = '&#xe61b;';
    }
    return content;
  };

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
          <img src={song.al?.picUrl + '?param=300x300'} width='100%' height='100%' alt='歌曲图片' />
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
              <img className='image play' src={song.al?.picUrl + '?param=400x400'} alt='' />
            </div>
          </CDWrapper>
        </Middle>
        <Bottom className='bottom'>
          <ProgressWrapper>
            <span className='time time-l'>{formatPlayTime(currentTime)}</span>
            <div className='progress-bar-wrapper'>
              <ProgressBar percent={percent} percentChange={onProgressChange}></ProgressBar>
            </div>
            <span className='time time-r'>{formatPlayTime(duration)}</span>
          </ProgressWrapper>
          <Operators>
            <div className='icon i-left' onClick={changeMode}>
              <i className='iconfont' dangerouslySetInnerHTML={{ __html: getPlayMode() }}></i>
            </div>
            <div className='icon i-left' onClick={handlePrev}>
              <i className='iconfont'>&#xe6e1;</i>
            </div>
            <div className='icon i-center' onClick={(e) => clickPlaying(e, !playing)}>
              {playing ? <i className='iconfont'>&#xe723;</i> : <i className='iconfont'>&#xe731;</i>}
            </div>
            <div className='icon i-right' onClick={handleNext}>
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
