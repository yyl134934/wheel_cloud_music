//normalPlayer/index.js
import React, { useEffect, useState } from 'react';
import { formatPlayTime, getName } from '../../../api/utils';
import {
  NormalPlayerContainer,
  Top,
  Middle,
  Bottom,
  Operators,
  CDWrapper,
  ProgressWrapper,
  LyricContainer,
  LyricWrapper,
} from './style';
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import useKeyframeAnimation from './hooks';
import ProgressBar from '../../../baseUI/progress-bar';
import { playMode } from '../../../api/config';
import LyricParser from '../../../utils/lyric-parser';
import Scroll from '../../../baseUI/scroll';
import { HotSong } from '../../Singer/entity';

interface Props {
  song: HotSong;
  fullScreen: boolean;
  playing: boolean;
  percent: number;
  duration: number;
  currentTime: number;
  mode: any;
  currentLineNum: number;
  currentPlayingLyric: string;
  currentLyric: LyricParser | null;
  toggleFullScreen: (fullScreen: boolean) => void;
  clickPlaying: (e: React.MouseEvent, playing: boolean) => void;
  onProgressChange: (percent: number) => void;
  handlePrev: () => void;
  handleNext: () => void;
  changeMode: () => void;
  togglePlayList: (open: boolean) => void;
}

const NormalPlayer: React.FC<Props> = (props) => {
  const {
    song,
    fullScreen,
    playing,
    percent,
    duration,
    currentTime,
    mode,
    currentLineNum,
    currentPlayingLyric,
    currentLyric,
  } = props;
  const { toggleFullScreen, clickPlaying, onProgressChange, handlePrev, handleNext, changeMode, togglePlayList } =
    props;

  const nodeRef = useRef<any>(null);
  const cdWrapperRef = useRef<any>(null);

  const [isShowLyric, setShowLyric] = useState(false);

  const lyricScrollRef = useRef<any>();
  const lyricLineRefs = useRef<any[]>([]);
  const cdWrapperNodeRef = useRef<any>(null);
  const lyricContainerNodeRef = useRef<any>(null);

  const { enter, afterEnter, leave, afterLeave } = useKeyframeAnimation(nodeRef, cdWrapperRef);

  const toggleCurrentState = () => {
    setShowLyric(!isShowLyric);
  };

  const handleTogglePlayList = (e: React.MouseEvent<HTMLElement>) => {
    togglePlayList(true);
    e.stopPropagation();
  };

  // getPlayMode方法
  const getPlayMode = (): string => {
    let content: string;
    if (mode === playMode.sequence) {
      content = '&#xe625;';
    } else if (mode === playMode.loop) {
      content = '&#xe653;';
    } else {
      content = '&#xe61b;';
    }
    return content;
  };

  useEffect(() => {
    if (!lyricScrollRef.current) return;
    let bScroll = lyricScrollRef.current.getBScroll();
    if (currentLineNum > 5) {
      // 保持当前歌词在第 5 条的位置
      let lineEl = lyricLineRefs.current[currentLineNum - 5].current;
      bScroll.scrollToElement(lineEl, 1000);
    } else {
      // 当前歌词行数 <=5, 直接滚动到最顶端
      bScroll.scrollTo(0, 0, 1000);
    }
  }, [currentLineNum]);

  const ctConfig = {
    nodeRef,
    classNames: 'normal',
    in: fullScreen,
    timeout: 400,
    mountOnEnter: true,
    onEnter: enter,
    onEntered: afterEnter,
    onExit: leave,
    onExited: () => {
      afterLeave();
      setShowLyric(false);
    },
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
        <Middle ref={cdWrapperRef} onClick={toggleCurrentState}>
          <CSSTransition nodeRef={cdWrapperNodeRef} timeout={400} classNames='fade' in={!isShowLyric}>
            <CDWrapper ref={cdWrapperNodeRef}>
              <div className='cd'>
                <img className='image play' src={song.al?.picUrl + '?param=400x400'} alt='' />
              </div>
              <p className='playing_lyric'>{currentPlayingLyric}</p>
            </CDWrapper>
          </CSSTransition>
          <CSSTransition nodeRef={lyricContainerNodeRef} timeout={400} classNames='fade' in={isShowLyric}>
            <LyricContainer ref={lyricContainerNodeRef}>
              <Scroll ref={lyricScrollRef}>
                <LyricWrapper style={{ visibility: isShowLyric ? 'visible' : 'hidden' }} className='lyric_wrapper'>
                  {currentLyric ? (
                    currentLyric?.lyricList.map((item, index) => {
                      // 拿到每一行歌词的 DOM 对象，后面滚动歌词需要！
                      lyricLineRefs.current[index] = React.createRef();
                      return (
                        <p
                          className={`text ${currentLineNum === index ? 'current' : ''}`}
                          key={item.time + index}
                          ref={lyricLineRefs.current[index]}
                        >
                          {item.txt}
                        </p>
                      );
                    })
                  ) : (
                    <p className='text pure'> 纯音乐，请欣赏。</p>
                  )}
                </LyricWrapper>
              </Scroll>
            </LyricContainer>
          </CSSTransition>
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
            <div className='icon i-right' onClick={handleTogglePlayList}>
              <i className='iconfont'>&#xe640;</i>
            </div>
          </Operators>
        </Bottom>
      </NormalPlayerContainer>
    </CSSTransition>
  );
};
export default React.memo(NormalPlayer);
