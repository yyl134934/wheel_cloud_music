import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import Scroll from '../../../baseUI/scroll';
import Confirm from './../../../baseUI/confirm/index';
import { ListContent, ListHeader, PlayListWrapper, ScrollWrapper } from './style';
import { useCSSTransition } from './hooks';
import { playMode } from '../../../api/config';
import { getName } from '../../../api/utils';

interface PlayListProps {
  showPlayList: boolean;
  playList: any[];
  currentSong: any;
  mode: any;
  currentIndex: number;
  togglePlayList: (open: boolean) => void;
  updatePlayList: (playList: any[]) => void;
  updateCurrentIndex: (index: number) => void;
  clearPlayList: () => void;
  deleteSong: (song: any) => void;
}

function PlayList(props: PlayListProps) {
  const { showPlayList, playList, currentSong, mode, currentIndex } = props;
  const { togglePlayList, updateCurrentIndex, clearPlayList, deleteSong } = props;

  const nodeRef = useRef<HTMLDivElement | null>(null);
  const listWrapperRef = useRef<HTMLDivElement | null>(null);
  const confirmRef = useRef<any>(null);

  const { isShow, onEnterCB, onEnteringCB, onExitingCB, onExitedCB } = useCSSTransition(nodeRef);

  const handleSwitchPlayingSong = (index: number) => {
    if (currentIndex === index) {
      return;
    }
    updateCurrentIndex(index);
  };

  const handleConfirmClear = () => {
    clearPlayList();
  };

  const handleShowClear = (e: any) => {
    e.stopPropagation();
    confirmRef.current?.show();
  };

  const handleClearItem = (e: any, song: any) => {
    e.stopPropagation();
    deleteSong(song);
  };

  const getCurrentIcon = (item: any) => {
    // 是不是当前正在播放的歌曲
    const current = currentSong.id === item.id;
    const className = current ? 'icon-play' : '';
    const content = current ? '&#xe6e3;' : '';
    return <i className={`current iconfont ${className}`} dangerouslySetInnerHTML={{ __html: content }}></i>;
  };
  const getPlayMode = () => {
    let content, text;
    if (mode === playMode.sequence) {
      content = '&#xe625;';
      text = '顺序播放';
    } else if (mode === playMode.loop) {
      content = '&#xe653;';
      text = '单曲循环';
    } else {
      content = '&#xe61b;';
      text = '随机播放';
    }
    return (
      <div>
        <i className='iconfont' onClick={(e) => changeMode(e)} dangerouslySetInnerHTML={{ __html: content }}></i>
        <span className='text' onClick={(e) => changeMode(e)}>
          {text}
        </span>
      </div>
    );
  };
  const changeMode = (e: any) => {};

  const ctConfig = {
    nodeRef,
    in: showPlayList,
    timeout: 300,
    classNames: 'list-fade',
    onEnter: onEnterCB,
    onEntering: onEnteringCB,
    onExiting: onExitingCB,
    onExited: onExitedCB,
  };

  return (
    <CSSTransition {...ctConfig}>
      <PlayListWrapper
        ref={nodeRef}
        style={isShow === true ? { display: 'block' } : { display: 'none' }}
        onClick={() => togglePlayList(false)}
      >
        <div className='list_wrapper' ref={listWrapperRef}>
          <ListHeader>
            <h1 className='title'>
              {getPlayMode()}
              <span className='iconfont clear' onClick={(e) => handleShowClear(e)}>
                &#xe63d;
              </span>
            </h1>
          </ListHeader>
          <ScrollWrapper>
            <Scroll>
              <ListContent>
                {playList.map((item, index) => {
                  return (
                    <li className='item' key={item.id} onClick={() => handleSwitchPlayingSong(index)}>
                      {getCurrentIcon(item)}
                      <span className='text'>
                        {item.name} - {getName(item.ar)}
                      </span>
                      <span className='like'>
                        <i className='iconfont'>&#xe601;</i>
                      </span>
                      <span className='delete' onClick={(e) => handleClearItem(e, item)}>
                        <i className='iconfont'>&#xe63d;</i>
                      </span>
                    </li>
                  );
                })}
              </ListContent>
            </Scroll>
          </ScrollWrapper>
        </div>
        <Confirm
          ref={confirmRef}
          text={'是否删除全部？'}
          cancelBtnText={'取消'}
          confirmBtnText={'确定'}
          handleConfirm={handleConfirmClear}
        />
      </PlayListWrapper>
    </CSSTransition>
  );
}
export default PlayList;
