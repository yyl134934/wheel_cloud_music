import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from '../../components/Slider';
import RecommendList from '../../components/RecommendList';
import { Content } from './style';
import Scroll from '../../components/Scroll';
import { actionCreators as actionTypes } from './store';

function Recommend(props) {
  const dispatch = useDispatch();
  const recommend = useSelector((state) => state.recommend);
  const { bannerList, recommendList } = recommend;

  useEffect(() => {
    // 轮播图数据
    dispatch(actionTypes.getBannerList());
    // 推荐列表数据
    dispatch(actionTypes.getRecommendList());
  }, [dispatch]);

  return (
    <Content>
      <Scroll className='list'>
        <div>
          <Slider bannerList={bannerList}></Slider>
          <RecommendList recommendList={recommendList} />
        </div>
      </Scroll>
    </Content>
  );
}

export default React.memo(Recommend);
