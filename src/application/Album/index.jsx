import React, { useState, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';
import { CSSTransition } from 'react-transition-group';
import { useQuery } from '@tanstack/react-query';
import Header from '../../baseUI/header';
import Scroll from '../../baseUI/scroll';
import globalStyle from '../../assets/global-style';
import { getCount } from '../../api/utils';
import { HEADER_HEIGHT } from '../../api/config';
import { Container, TopDesc, Menu } from './style';
import { EnterLoading } from '../../baseUI/loading';
import SongsList from '../SongsList';
import MusicalNote from '../../baseUI/musical-note';
import { getAlbumDetailRequest } from '../../api/requst';

function Album() {
  const [title, setTitle] = useState('歌单');
  const [isMarquee, setIsMarquee] = useState(false); // 是否跑马灯
  const [showStatus, setShowStatus] = useState(true);
  const navigate = useNavigate();
  const nodeRef = useRef(null); //进出动画ref
  const headerEl = useRef(); //头部标题ref
  const musicalNoteRef = useRef(); //音符动画ref

  const { id } = useParams();

  const {
    isLoading,
    data: { playlist: currentAlbum = [] },
  } = useQuery({
    queryKey: ['album', id],
    queryFn: () => getAlbumDetailRequest(id),
    initialData: { playlist: [] },
    refetchOnWindowFocus: false,
  });

  const handleScroll = (pos) => {
    let minScrollY = -HEADER_HEIGHT;
    let percent = Math.abs(pos.y / minScrollY);
    let headerDom = headerEl.current;
    // 滑过顶部的高度开始变化
    if (pos.y < minScrollY) {
      headerDom.style.backgroundColor = globalStyle['theme-color'];
      headerDom.style.opacity = Math.min(1, (percent - 1) / 2);
      setTitle(currentAlbum.name);
      setIsMarquee(true);
    } else {
      headerDom.style.backgroundColor = '';
      headerDom.style.opacity = 1;
      setTitle('歌单');
      setIsMarquee(false);
    }
  };

  const goback = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleBack = useCallback(() => {
    setShowStatus(false);
  }, []);

  const renderTopDesc = () => {
    return (
      <TopDesc background={currentAlbum.coverImgUrl}>
        <div className='background'>
          <div className='filter'></div>
        </div>
        <div className='img_wrapper'>
          <div className='decorate'></div>
          <img src={currentAlbum.coverImgUrl} alt='' />
          <div className='play_count'>
            <i className='iconfont play'>&#xe885;</i>
            <span className='count'>{getCount(currentAlbum.subscribedCount)}</span>
          </div>
        </div>
        <div className='desc_wrapper'>
          <div className='title'>{currentAlbum.name}</div>
          <div className='person'>
            <div className='avatar'>
              <img src={currentAlbum.creator?.avatarUrl} alt='' />
            </div>
            <div className='name'>{currentAlbum.creator?.nickname}</div>
          </div>
        </div>
      </TopDesc>
    );
  };

  const renderMenu = () => {
    return (
      <Menu>
        <div>
          <i className='iconfont'>&#xe6ad;</i>
          评论
        </div>
        <div>
          <i className='iconfont'>&#xe86f;</i>
          点赞
        </div>
        <div>
          <i className='iconfont'>&#xe62d;</i>
          收藏
        </div>
        <div>
          <i className='iconfont'>&#xe606;</i>
          更多
        </div>
      </Menu>
    );
  };

  const musicAnimation = (x, y) => {
    musicalNoteRef.current.startAnimation({ x, y });
  };

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={showStatus}
      timeout={300}
      classNames='fly'
      appear={true}
      unmountOnExit
      onExited={goback}
    >
      <Container ref={nodeRef}>
        <Header ref={headerEl} title={title} handleClick={handleBack} isMarquee={isMarquee}></Header>
        {isLoading ? <EnterLoading></EnterLoading> : null}
        <Scroll bounceTop={false} onScroll={handleScroll}>
          <div>
            {renderTopDesc()}
            {renderMenu()}
            <SongsList
              songs={currentAlbum.tracks}
              collectCount={currentAlbum.subscribedCount}
              showCollect
              musicAnimation={musicAnimation}
            ></SongsList>
            <MusicalNote ref={musicalNoteRef}></MusicalNote>
          </div>
        </Scroll>
      </Container>
    </CSSTransition>
  );
}

export default Album;
