import React, { useRef, useState, useCallback } from 'react';
import { Container, ImgWrapper, CollectButton, SongListWrapper, BgLayer } from './style';
import { CSSTransition } from 'react-transition-group';
import { useNavigate } from 'react-router';
import Header from '../../baseUI/header';
import Scroll from '../../baseUI/scroll';
import SongList from '../SongerList';
import { useEffect } from 'react';

function Singer() {
  const navigate = useNavigate();
  const [showStatus, setShowStatus] = useState(true);
  const nodeRef = useRef(null);
  const collectButton = useRef(null);
  const imageWrapper = useRef(null);
  const songScrollWrapper = useRef(null);
  const songScroll = useRef(null);
  const header = useRef(null);
  const layer = useRef(null);
  // 图片初始高度
  const initialHeight = useRef(0);
  // 往上偏移的尺寸，露出圆角
  const OFFSET = 5;

  useEffect(() => {
    let imgHeight = imageWrapper.current.offsetHeight;
    songScrollWrapper.current.style.top = `${imgHeight - OFFSET}px`;
    initialHeight.current = imgHeight;
    // 把遮罩先放在下面，以裹住歌曲列表
    layer.current.style.top = `${imgHeight - OFFSET}px`;
    songScroll.current.refresh();
  }, []);

  const handleBack = useCallback(() => {
    setShowStatus(false);
  }, [setShowStatus]);

  const goback = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const artist = {
    picUrl: 'https://p2.music.126.net/W__FCWFiyq0JdPtuLJoZVQ==/109951163765026271.jpg',
    name: '薛之谦',
    hotSongs: [
      {
        name: '我好像在哪见过你',
        ar: [{ name: '薛之谦' }],
        al: {
          name: '薛之谦专辑',
        },
      },
      {
        name: '我好像在哪见过你',
        ar: [{ name: '薛之谦' }],
        al: {
          name: '薛之谦专辑',
        },
      },
    ],
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
        <Header title={'歌手'} ref={header} handleClick={handleBack}></Header>
        <ImgWrapper ref={imageWrapper} bgUrl={artist.picUrl}>
          <div className='filter'></div>
        </ImgWrapper>
        <CollectButton ref={collectButton}>
          <i className='iconfont'>&#xe62d;</i>
          <span className='text'>收藏</span>
        </CollectButton>
        <BgLayer ref={layer}></BgLayer>
        <SongListWrapper ref={songScrollWrapper}>
          <Scroll ref={songScroll}>
            <SongList songs={artist.hotSongs} showCollect={false}></SongList>
          </Scroll>
        </SongListWrapper>
      </Container>
    </CSSTransition>
  );
}

export default Singer;
