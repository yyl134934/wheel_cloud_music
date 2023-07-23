import React from 'react';
import { getName } from '../../../api/utils';
import ProgressCircle from '../../../baseUI/progress-circle';
import { MiniPlayerContainer } from './style';
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import { HotSong } from 'Src/application/Singer/entity';

interface MiniPlayerProps {
  song: HotSong;
  fullScreen: boolean;
  playing: boolean;
  percent: number;
  toggleFullScreen: (fullScreen: boolean) => void;
  clickPlaying: (e: React.MouseEvent<HTMLElement>, playing: boolean) => void;
  togglePlayList: (open: boolean) => void;
}
function MiniPlayer(props: MiniPlayerProps) {
  const { song, fullScreen, playing, percent } = props;
  const { toggleFullScreen, clickPlaying, togglePlayList } = props;
  const nodeRef = useRef<any>(null);

  const handleTogglePlayList = (e: React.MouseEvent<HTMLElement>) => {
    togglePlayList(true);
    console.log('🚀🐍 ~ file: index.tsx:25 ~ handleTogglePlayList ~ true:', true);
    e.stopPropagation();
  };

  const ctConfig = {
    nodeRef,
    in: !fullScreen,
    timeout: 400,
    classNames: 'mini',
    onEnter: () => {
      nodeRef.current.style.display = 'flex';
    },
    onExited: () => {
      nodeRef.current.style.display = 'none';
    },
  };

  return (
    <CSSTransition {...ctConfig}>
      <MiniPlayerContainer ref={nodeRef}>
        <div className='icon'>
          <div className='imgWrapper' onClick={() => toggleFullScreen(true)}>
            <img className={`${playing ? 'play' : 'pause'}`} src={song.al?.picUrl} width='40' height='40' alt='img' />
          </div>
        </div>
        <div className='text'>
          <h2 className='name'>{song.name}</h2>
          <p className='desc'>{getName(song.ar)}</p>
        </div>
        <div className='control'>
          <ProgressCircle radius={32} percent={percent}>
            {playing ? (
              <i className='icon-mini iconfont icon-pause' onClick={(e) => clickPlaying(e, false)}>
                &#xe650;
              </i>
            ) : (
              <i className='icon-mini iconfont icon-play' onClick={(e) => clickPlaying(e, true)}>
                &#xe61e;
              </i>
            )}
          </ProgressCircle>
        </div>
        <div className='control' onClick={handleTogglePlayList}>
          <i className='iconfont'>&#xe640;</i>
        </div>
      </MiniPlayerContainer>
    </CSSTransition>
  );
}

export default React.memo(MiniPlayer);
