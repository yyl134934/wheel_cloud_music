import React, { useRef, useState, useCallback } from 'react';
import { Container, ImgWrapper, CollectButton, SongListWrapper, BgLayer } from './style';
import { CSSTransition } from 'react-transition-group';
import { useNavigate, useParams } from 'react-router';
import Header from '../../baseUI/header';
import Scroll from '../../baseUI/scroll';
import { EnterLoading } from '../../baseUI/loading';
import SongsList from '../SongsList';
import { useEffect } from 'react';
import { HEADER_HEIGHT } from '../../api/config';
import MusicalNote from '../../baseUI/musical-note';
import { useQuery } from '@tanstack/react-query';
import { isEmptyObject } from '../../api/utils';
import { usePlayingStore } from '../../store';
import { getSingerInfoRequest } from './api';
import { HotSong } from './entity';

function Singer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showStatus, setShowStatus] = useState(true);
  const nodeRef = useRef<any>(null);
  const collectButton = useRef<any>(null);
  const imageWrapper = useRef<any>(null);
  const songScrollWrapper = useRef<any>(null);
  const songScroll = useRef<any>(null);
  const header = useRef<any>(null);
  const layer = useRef<any>(null);
  const musicNoteRef = useRef<any>(null);
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

  const { isLoading, data: { artist, hotSongs: songsOfArtist } = { artist: { picUrl: '' }, hotSongs: [] } } = useQuery({
    queryKey: ['singer', id],
    queryFn: () => getSingerInfoRequest(id),
    refetchOnWindowFocus: false,
  });

  const { currentSong } = usePlayingStore((state) => state.state);

  const handleBack = useCallback(() => {
    setShowStatus(false);
  }, [setShowStatus]);

  const goback = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleScroll = useCallback((pos: any) => {
    let height = initialHeight.current;
    const newY = pos.y;
    const imageDOM = imageWrapper.current;
    const buttonDOM = collectButton.current;
    const headerDOM = header.current;
    const layerDOM = layer.current;
    const minScrollY = -(height - OFFSET) + HEADER_HEIGHT;

    //指的是滑动距离占图片高度的百分比
    const percent = Math.abs(newY / height);

    if (newY > 0) {
      imageDOM.style['transform'] = `scale(${1 + percent})`;
      buttonDOM.style['transform'] = `translate3d(0, ${newY}px, 0)`;
      layerDOM.style.top = `${height - OFFSET + newY}px`;
    } else if (newY >= minScrollY) {
      layerDOM.style.top = `${height - OFFSET - Math.abs(newY)}px`;
      //这时候保证遮罩的层叠优先级比图片高，不至于被图片挡住
      layerDOM.style.zIndex = 1;
      imageDOM.style.paddingTop = '75%';
      imageDOM.style.height = 0;
      imageDOM.style.zIndex = -1;
      //按钮跟着移动且渐渐变透明
      buttonDOM.style['transform'] = `translate3d(0, ${newY}px, 0)`;
      buttonDOM.style['opacity'] = `${1 - percent * 2}`;
    } else if (newY < minScrollY) {
      //往上滑动，但是超过Header部分
      layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`;
      layerDOM.style.zIndex = 1;
      //防止溢出的歌单内容遮住Header
      headerDOM.style.zIndex = 100;
      //此时图片高度与Header一致
      imageDOM.style.height = `${HEADER_HEIGHT}px`;
      imageDOM.style.paddingTop = 0;
      imageDOM.style.zIndex = 99;
    }
  }, []);

  const musicAnimation = (x: number, y: string) => {
    musicNoteRef.current.startAnimation({ x, y });
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
        <ImgWrapper ref={imageWrapper} bgurl={artist.picUrl}>
          <div className='filter'></div>
        </ImgWrapper>
        <CollectButton ref={collectButton}>
          <i className='iconfont'>&#xe62d;</i>
          <span className='text'>收藏</span>
        </CollectButton>
        <BgLayer ref={layer}></BgLayer>
        <SongListWrapper ref={songScrollWrapper} $notPlaying={isEmptyObject(currentSong)}>
          <Scroll ref={songScroll} onScroll={handleScroll}>
            <SongsList
              songs={songsOfArtist as HotSong[]}
              showCollect={false}
              musicAnimation={musicAnimation}
            ></SongsList>
          </Scroll>
        </SongListWrapper>
        <EnterLoading show={isLoading} />
        <MusicalNote ref={musicNoteRef}></MusicalNote>
      </Container>
    </CSSTransition>
  );
}

export default Singer;
