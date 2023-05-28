import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Horizon from '../../baseUI/horizon-item';
import { categoryTypes, alphaTypes } from '../../api/config';
import { NavContainer, List, ListContainer, ListItem } from './style';
import Scroll from '../../baseUI/scroll';
import { actionCreators as actionTypes } from './store';
import { EnterLoading, PullLoading } from '../../baseUI/loading';

function Singers(params) {
  const dispatch = useDispatch();
  const singer = useSelector((state) => state.singer);
  const { singerList, enterLoading } = singer;
  const [category, setCategory] = useState('');
  const [alpha, setAlpha] = useState('');

  useEffect(() => {
    // 热门歌手
    dispatch(actionTypes.getHotSingerList());
  }, [dispatch]);

  let handleUpdateAlpha = (val) => {
    setAlpha(val);
    // 歌手
    dispatch(actionTypes.getSingerList(category, val));
  };

  let handleUpdateCatetory = (val) => {
    setCategory(val);
    // 歌手
    dispatch(actionTypes.getSingerList(val, alpha));
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
        <Scroll direction={'vertical'}>{renderSingerList()}</Scroll>
      </ListContainer>
      {enterLoading ? <EnterLoading></EnterLoading> : null}
    </>
  );
}

export default React.memo(Singers);
