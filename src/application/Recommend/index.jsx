import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forceCheck } from 'react-lazyload-v18';
import Slider from '../../components/slider';
import RecommendList from '../../components/list';
import Scroll from '../../baseUI/scroll';
import { EnterLoading } from '../../baseUI/loading';
import { actionCreators as actionTypes } from './store';
import { Content } from './style';
import { Outlet } from 'react-router';
import { isEmptyObject } from '../../api/utils';

function Recommend(props) {
  const dispatch = useDispatch();
  const recommend = useSelector((state) => state.recommend);
  const { currentSong } = useSelector((state) => state.player);
  const { bannerList, recommendList, enterLoading } = recommend;

  useEffect(() => {
    // 轮播图数据
    dispatch(actionTypes.getBannerList());
    // 推荐列表数据
    dispatch(actionTypes.getRecommendList());
  }, [dispatch]);

  return (
    <Content notPlaying={isEmptyObject(currentSong)}>
      <Scroll className='list' onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerList}></Slider>
          <RecommendList recommendList={recommendList} />
        </div>
      </Scroll>
      {enterLoading ? <EnterLoading></EnterLoading> : null}
      <Outlet></Outlet>
    </Content>
  );
}

export default React.memo(Recommend);
