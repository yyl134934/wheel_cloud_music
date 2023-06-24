import React, { useMemo, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import Scroll from '../../baseUI/scroll';
import Horizon from '../../baseUI/horizon-item';
import { categoryTypes, alphaTypes } from '../../api/config';
import { NavContainer, List, ListContainer, ListItem, Content } from './style';
import { EnterLoading } from '../../baseUI/loading';
import { Outlet, useNavigate } from 'react-router';
import { getSingerListRequest } from '../../api/requst';
import { isEmptyObject } from '../../api/utils';
import { usePlayingStore } from '../../store';

/* 
  歌手查询：
  【热门歌手查询】：进入页面时查询（/top/artists?offset=${count}）
  【歌手分类筛选】：点击分类标签时触发（/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}）
  【下拉刷新】：分两种情况：1.没有选分类标签，触发【热门歌手查询】；
  2.有选分类标签，触发【歌手分类筛选】。两种情况offset均传0。
  【上拉查下一页】：分两种情况：1.没有选分类标签，触发【热门歌手查询】；
  2.有选分类标签，触发【歌手分类筛选】。两种情况offset均传n-1。
*/
function Singers(params) {
  const navigate = useNavigate();

  const [category, setCategory] = useState(''); // 首字母
  const [alpha, setAlpha] = useState(''); // 歌手分类

  const {
    data: { pages } = { pages: [] },
    isLoading,
    fetchNextPage,
    fetchPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
  } = useInfiniteQuery({
    queryKey: ['singer', { category, alpha }],
    queryFn: ({ pageParam = 0 }) => getSingerListRequest(category, alpha, pageParam),
    initialData: { pages: [] },
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.artists?.length === 0) {
        return undefined;
      }
      return allPages.length;
    },
    getPreviousPageParam: (firstPage, allPages) => 0,
  });

  const { currentSong } = usePlayingStore((state) => state.state);

  const singerList = useMemo(() => pages?.map(({ artists }) => artists).flat() ?? [], [pages]);

  const handleUpdateAlpha = (val) => {
    setAlpha(val);
  };

  const handleUpdateCatetory = (val) => {
    setCategory(val);
  };

  //下拉刷新
  const handlePullDown = () => {
    console.info('【歌手列表】下拉刷新');
    fetchPreviousPage();
  };

  //上拉查询下一页
  const handlePullUp = () => {
    console.info('【歌手列表】上拉查询下一页');
    fetchNextPage();
  };

  /**
   * 歌手详情
   * @param {*} id
   */
  const enterDetail = (id) => {
    navigate(`${id}`);
  };

  // 渲染函数，返回歌手列表
  const renderSingerList = () => {
    return (
      <List>
        {singerList.map((item, index) => {
          return (
            <ListItem key={item.accountId + '' + index} onClick={() => enterDetail(item.id)}>
              <div className='img_wrapper'>
                <img src={`${item.picUrl}?param=300x300`} width='100%' height='100%' alt='music' />
              </div>
              <span className='name'>{item.name}</span>
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <>
      <NavContainer>
        <Horizon
          list={categoryTypes}
          title={'分类 (默认热门):'}
          handleClick={handleUpdateCatetory}
          oldVal={category}
        ></Horizon>
        <Horizon list={alphaTypes} title={'首字母:'} handleClick={handleUpdateAlpha} oldVal={alpha}></Horizon>
      </NavContainer>
      <ListContainer notPlaying={isEmptyObject(currentSong)}>
        <Scroll
          direction={'vertical'}
          pullDown={handlePullDown}
          pullUp={handlePullUp}
          pullUpLoading={isFetchingPreviousPage}
          pullDownLoading={isFetchingNextPage}
        >
          {renderSingerList()}
        </Scroll>
      </ListContainer>
      <Outlet></Outlet>
      {isLoading ? <EnterLoading></EnterLoading> : null}
    </>
  );
}

export default React.memo(Singers);
