import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Scroll from '../../baseUI/scroll';
import Horizon from '../../baseUI/horizon-item';
import { categoryTypes, alphaTypes } from '../../api/config';
import { NavContainer, List, ListContainer, ListItem } from './style';
import { actionCreators as actionTypes } from './store';
import { EnterLoading } from '../../baseUI/loading';

function Singers(params) {
  const dispatch = useDispatch();
  const singer = useSelector((state) => state.singer);
  const { singerList, enterLoading, pullDownLoading, pullUpLoading } = singer;
  const [category, setCategory] = useState('');
  const [alpha, setAlpha] = useState('');

  useEffect(() => {
    // 热门歌手
    dispatch(actionTypes.getHotSingerList());
  }, [dispatch]);

  const handleUpdateAlpha = (val) => {
    setAlpha(val);
    // 歌手
    dispatch(actionTypes.getSingerList(category, val));
  };

  const handleUpdateCatetory = (val) => {
    setCategory(val);
    // 歌手
    dispatch(actionTypes.getSingerList(val, alpha));
  };

  //下拉刷新
  const handlePullDown = () => {
    console.info('【歌手列表】下拉刷新');
    dispatch(actionTypes.changePullDownLoading(true));
    dispatch(actionTypes.resetPageCount());
    dispatch(actionTypes.getHotSingerList());
  };

  //上拉查询下一页
  const handlePullUp = () => {
    console.info('【歌手列表】上拉查询下一页');

    if (category === '' && alpha === '') {
      dispatch(actionTypes.resetPageCount());
      dispatch(actionTypes.getMoreRefreshHotSingerList());
      return;
    }

    dispatch(actionTypes.autoAddPageCount());
    dispatch(actionTypes.getMoreRefreshSingerList(category, alpha));
  };

  // 渲染函数，返回歌手列表
  const renderSingerList = () => {
    return (
      <List>
        {singerList.map((item, index) => {
          return (
            <ListItem key={item.accountId + '' + index}>
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
      {enterLoading ? <EnterLoading></EnterLoading> : null}
    </>
  );
}

export default React.memo(Singers);
