import React from 'react';
import { getName } from '../../../api/utils';
import ProgressCircle from '../../../baseUI/process-circle';
import { MiniPlayerContainer } from './style';
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';

function MiniPlayer(props) {
  const { song, fullScreen } = props;
  const { toggleFullScreen } = props;
  const nodeRef = useRef(null);

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
      <MiniPlayerContainer ref={nodeRef} onClick={() => toggleFullScreen(true)}>
        <div className='icon'>
          <div className='imgWrapper'>
            <img className='play' src={song.al.picUrl} width='40' height='40' alt='img' />
          </div>
        </div>
        <div className='text'>
          <h2 className='name'>{song.name}</h2>
          <p className='desc'>{getName(song.ar)}</p>
        </div>
        <div className='control'>
          <ProgressCircle radius={32} percent={0.2}>
            <i className='icon-mini iconfont icon-pause'>&#xe650;</i>
          </ProgressCircle>
        </div>
        <div className='control'>
          <i className='iconfont'>&#xe640;</i>
        </div>
      </MiniPlayerContainer>
    </CSSTransition>
  );
}

export default React.memo(MiniPlayer);
