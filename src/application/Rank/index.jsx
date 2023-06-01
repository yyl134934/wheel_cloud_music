import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as ActionTypes } from './store';
import { filterIndex } from '../../api/utils';
import Scroll from '../../baseUI/scroll';
import { EnterLoading, PullLoading } from '../../baseUI/loading';
import { Container, List, ListItem, SongList } from './style';
import { Outlet, useNavigate } from 'react-router';

function Rank() {
  const { rankList, loading } = useSelector((state) => state.rank);
  const dispatch = useDispatch();
  //   const navigate = useNavigate();

  const globalStartIndex = filterIndex(rankList);
  const officialList = rankList.slice(0, globalStartIndex);
  const globalList = rankList.slice(globalStartIndex);

  useEffect(() => {
    dispatch(ActionTypes.getBannerList());
  }, [dispatch]);

  /**
   * 专辑详情
   * @param {*} id
   */
  const enterDetail = (id) => {
    //     navigate(`/recommend/${id}`);
  };

  // 这是渲染榜单列表函数，传入 global 变量来区分不同的布局方式
  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
        {list.map((item, index) => {
          return (
            <ListItem key={`${item.coverImgId}${index}`} tracks={item.tracks} onClick={() => enterDetail(item.name)}>
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
  let displayStyle = loading ? { display: 'none' } : { display: '' };

  return (
    <Container>
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
          {loading ? (
            <EnterLoading>
              <PullLoading></PullLoading>
            </EnterLoading>
          ) : null}
        </div>
      </Scroll>
      {/* {renderRoutes(props.route.routes)} */}
      {/* <Outlet></Outlet> */}
    </Container>
  );
}

export default React.memo(Rank);
