import React from 'react';
import { filterIndex, isEmptyObject } from '../../api/utils';
import Scroll from '../../baseUI/scroll';
import { EnterLoading, PullLoading } from '../../baseUI/loading';
import { Container, List, ListItem, SongList } from './style';
import { Outlet, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getRankListRequest } from '../../api/requst';
import { usePlayingStore } from '../../store';

function Rank() {
  const navigate = useNavigate();
  const { isLoading, data: { list: rankList = [] } = { list: [] } } = useQuery({
    queryKey: ['rank'],
    queryFn: getRankListRequest,
    initialData: { list: [] },
    refetchOnWindowFocus: false,
  });

  const { currentSong } = usePlayingStore((state) => state.state);

  const globalStartIndex = filterIndex(rankList);
  const officialList = rankList.slice(0, globalStartIndex);
  const globalList = rankList.slice(globalStartIndex);

  /**
   * 专辑详情
   * @param {*} id
   */
  const enterDetail = (id) => {
    navigate(`${id}`);
  };

  // 这是渲染榜单列表函数，传入 global 变量来区分不同的布局方式
  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
        {list.map((item, index) => {
          return (
            <ListItem key={`${item.coverImgId}${index}`} tracks={item.tracks} onClick={() => enterDetail(item.id)}>
              <div className='img_wrapper'>
                <img src={item.coverImgUrl} alt='' />
                <div className='decorate'></div>
                <span className='update_frequecy'>{item.updateFrequency}</span>
              </div>
              {renderSongList(item.tracks)}
            </ListItem>
          );
        })}
      </List>
    );
  };

  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {list.map((item, index) => {
          return (
            <li key={index}>
              {index + 1}. {item.first} - {item.second}
            </li>
          );
        })}
      </SongList>
    ) : null;
  };

  // 榜单数据未加载出来之前都给隐藏
  let displayStyle = isLoading ? { display: 'none' } : { display: '' };

  return (
    <Container notPlaying={isEmptyObject(currentSong)}>
      <Scroll>
        <div>
          <h1 className='offical' style={displayStyle}>
            官方榜
          </h1>
          {renderRankList(officialList)}
          <h1 className='global' style={displayStyle}>
            全球榜
          </h1>
          {renderRankList(globalList, true)}
          {isLoading ? (
            <EnterLoading>
              <PullLoading></PullLoading>
            </EnterLoading>
          ) : null}
        </div>
      </Scroll>
      <Outlet></Outlet>
    </Container>
  );
}

export default React.memo(Rank);
