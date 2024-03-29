import React from 'react';
import { SongList, SongItem } from './style';
import { getCount, getName } from '../../api/utils';
import { useCallback } from 'react';
import { usePlayingStore } from '../../store';
import { HotSong } from '../Singer/entity';

interface SongsListProps {
  collectCount?: number;
  showCollect: boolean;
  songs: HotSong[];
  musicAnimation: Function;
  showBackground?: boolean;
}
const SongsList = React.forwardRef((props: SongsListProps, refs: any) => {
  const { collectCount = 0, showCollect, songs = [], showBackground } = props;
  const { musicAnimation } = props;
  const { updatePlayList, updateSequencePlayList, updateCurrentIndex } = usePlayingStore((state) => state.actions);
  const totalCount = songs.length;

  const selectItem = useCallback(
    (e: React.MouseEvent<HTMLLIElement>, index: number) => {
      const {
        nativeEvent: { clientX, clientY },
      } = e;

      e.preventDefault();
      e.stopPropagation();

      updatePlayList(songs);
      updateSequencePlayList(songs);
      updateCurrentIndex(index);
      musicAnimation(clientX, clientY);
    },
    [songs, musicAnimation],
  );

  let songList = (list: any) => {
    let res = [];
    for (let i = 0; i < list.length; i++) {
      let item = list[i];
      res.push(
        <li key={item.id} onClick={(e) => selectItem(e, i)}>
          <span className='index'>{i + 1}</span>
          <div className='info'>
            <span>{item.name}</span>
            <span>
              {item.ar ? getName(item.ar) : getName(item.artists)} - {item.al ? item.al.name : item.album.name}
            </span>
          </div>
        </li>,
      );
    }
    return res;
  };

  const collect = (count: number) => {
    return (
      <div className='add_list'>
        <i className='iconfont'>&#xe62d;</i>
        <span> 收藏 ({getCount(count)})</span>
      </div>
    );
  };
  return (
    <SongList ref={refs} showBackground={showBackground}>
      <div className='first_line'>
        <div className='play_all'>
          <i className='iconfont'>&#xe6e3;</i>
          <span>
            播放全部 <span className='sum'>(共 {totalCount} 首)</span>
          </span>
        </div>
        {showCollect ? collect(collectCount) : null}
      </div>
      <SongItem>{songList(songs)}</SongItem>
    </SongList>
  );
});

export default React.memo(SongsList);
