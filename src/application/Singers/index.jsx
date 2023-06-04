import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Scroll from '../../baseUI/scroll';
import Horizon from '../../baseUI/horizon-item';
import { categoryTypes, alphaTypes } from '../../api/config';
import { NavContainer, List, ListContainer, ListItem } from './style';
import { actionCreators as actionTypes } from './store';
import { EnterLoading } from '../../baseUI/loading';
import { Outlet, useNavigate } from 'react-router';

/* 
  歌手查询：
  【热门歌手查询】：进入页面时查询（/top/artists?offset=${count}）
  【歌手分类筛选】：点击分类标签时触发（/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}）
  【下拉刷新】：分两种情况：1.没有选分类标签，触发【热门歌手查询】；
  2.有选分类标签，触发【歌手分类筛选】。两种情况offset均传0。
  【上拉查下一页】：分两种情况：1.没有选分类标签，触发【热门歌手查询】；
  2.有选分类标签，触发【歌手分类筛选】。两种情况offset均传n-1。
  【页面加载能不能放到hook里管理？】
*/
function Singers(params) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const singer = useSelector((state) => state.singers);
  const { singerList, enterLoading, pullDownLoading, pullUpLoading } = singer;
  const [category, setCategory] = useState('');
  const [alpha, setAlpha] = useState('');

  useEffect(() => {
    // 热门歌手
    dispatch(actionTypes.initRefresh());
  }, [dispatch]);

  const handleUpdateAlpha = (val) => {
    setAlpha(val);
    // 歌手
    dispatch(actionTypes.filterSinger(category, val));
  };

  const handleUpdateCatetory = (val) => {
    setCategory(val);
    // 歌手
    dispatch(actionTypes.filterSinger(val, alpha));
  };

  //下拉刷新
  const handlePullDown = () => {
    console.info('【歌手列表】下拉刷新');
    dispatch(actionTypes.getPullDownSingerList());
  };

  //上拉查询下一页
  const handlePullUp = () => {
    console.info('【歌手列表】上拉查询下一页');
    dispatch(actionTypes.getPullUpSingerList(category, alpha));
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
      <ListContainer>
        <Scroll
          direction={'vertical'}
          pullDown={handlePullDown}
          pullUp={handlePullUp}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
        >
          {renderSingerList()}
        </Scroll>
      </ListContainer>
      <Outlet></Outlet>
      {enterLoading ? <EnterLoading></EnterLoading> : null}
    </>
  );
}

export default React.memo(Singers);
