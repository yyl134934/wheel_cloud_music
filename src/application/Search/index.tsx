import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useQuery } from '@tanstack/react-query';
import LazyLoad, { forceCheck } from 'react-lazyload-v18';
import { useNavigate } from 'react-router-dom';
import SearchBox from 'src/baseUI/search-box';
import Scroll from 'src/baseUI/scroll';
import { getHotKeyWordsRequest } from './api';
import { Container, HotKey, List, ListItem, ShortcutWrapper, SongItem } from './style';
import { useSuggest, useSongDetails } from './hooks';
import { getName } from 'src/api/utils';
import { SongAbbr } from './entity';
import { usePlayingStore } from 'src/store';
import MusicalNote from 'src/baseUI/musical-note';

function Search() {
  // 搜索关键字
  const [query, setQuery] = useState('');
  const [currentSong, setCurrentSong] = useState<SongAbbr>();
  const nodeRef = useRef<any>();
  const musicNoteRef = useRef<any>();
  // 控制动画
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const { state, actions } = usePlayingStore((state) => state);
  const { playList } = state;
  const { insertSongInPlayList } = actions;

  const { albums, songs, artists } = useSuggest(query);
  useSongDetails(`${currentSong?.id}`, insertSongInPlayList);

  const { data: { result: { hots } } = { result: { hots: [] } } } = useQuery({
    queryKey: ['hotkey'],
    queryFn: getHotKeyWordsRequest,
    refetchOnWindowFocus: false,
  });

  // 由于是传给子组件的方法，尽量用 useCallback 包裹，以使得在依赖未改变，始终给子组件传递的是相同的引用
  const searchBack = useCallback(() => {
    setShow(false);
  }, []);

  const handleQuery = useCallback((q: string) => {
    setQuery(q);
  }, []);

  const navigateToAlbum = (id: number) => {
    navigate(`/album/${id}`);
  };

  const navigateToSingers = (id: number) => {
    navigate(`/singers/${id}`);
  };

  const musicAnimation = (x: number, y: string) => {
    musicNoteRef.current.startAnimation({ x, y });
  };

  const handlePlaySong = (e: any, song: SongAbbr) => {
    const {
      nativeEvent: { clientX, clientY },
    } = e;
    musicAnimation(clientX, clientY);

    setCurrentSong(song);
  };

  useEffect(() => {
    setShow(true);
  }, []);

  const renderAlbum = () => {
    if (!albums || !albums.length) {
      return;
    }
    return (
      <List>
        <h1 className='title'> 相关歌单 </h1>
        {albums.map((item, index) => {
          return (
            <ListItem key={item.id + '' + index} onClick={() => navigateToAlbum(item.id)}>
              <div className='img_wrapper'>
                <LazyLoad placeholder={<img width='100%' height='100%' src={require('./music.png')} alt='music' />}>
                  <img src={item.artist.picUrl} width='100%' height='100%' alt='music' />
                </LazyLoad>
              </div>
              <span className='name'> 歌单: {item.name}</span>
            </ListItem>
          );
        })}
      </List>
    );
  };

  const renderSingers = () => {
    if (!artists || !artists.length) {
      return;
    }
    return (
      <List>
        <h1 className='title'> 相关歌手 </h1>
        {artists.map((item, index) => {
          return (
            <ListItem key={item.id + '' + index} onClick={() => navigateToSingers(item.id)}>
              <div className='img_wrapper'>
                <LazyLoad placeholder={<img width='100%' height='100%' src={require('./singer.png')} alt='singer' />}>
                  <img src={item.picUrl} width='100%' height='100%' alt='music' />
                </LazyLoad>
              </div>
              <span className='name'> 歌手: {item.name}</span>
            </ListItem>
          );
        })}
      </List>
    );
  };

  const renderSongs = () => {
    if (!songs || !songs.length) {
      return;
    }
    return (
      <SongItem style={{ paddingLeft: '20px' }}>
        {songs.map((item) => {
          return (
            <li key={item.id} onClick={(e) => handlePlaySong(e, item)}>
              <div className='info'>
                <span>{item.name}</span>
                <span>
                  {getName(item.artists)} - {item.album.name}
                </span>
              </div>
            </li>
          );
        })}
      </SongItem>
    );
  };

  const renderHotKey = () => {
    let list = hots ?? [];
    return (
      <ul>
        {list.map((item) => {
          return (
            <li className='item' key={item.first} onClick={() => setQuery(item.first)}>
              <span>{item.first}</span>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={show}
      timeout={300}
      appear={true}
      classNames='fly'
      unmountOnExit
      onExited={() => navigate(-1)}
    >
      <Container notPlaying={!playList.length} ref={nodeRef}>
        <div className='search_box_wrapper'>
          <SearchBox back={searchBack} newQuery={query} handleQuery={handleQuery}></SearchBox>
        </div>
        <ShortcutWrapper show={!query}>
          <Scroll>
            <div>
              <HotKey>
                <h1 className='title'> 热门搜索 </h1>
                {renderHotKey()}
              </HotKey>
            </div>
          </Scroll>
        </ShortcutWrapper>
        <ShortcutWrapper show={!!query}>
          <Scroll onScorll={forceCheck}>
            <div>
              {renderSingers()}
              {renderAlbum()}
              {renderSongs()}
            </div>
          </Scroll>
        </ShortcutWrapper>
        <MusicalNote ref={musicNoteRef}></MusicalNote>
      </Container>
    </CSSTransition>
  );
}

export default React.memo(Search);
