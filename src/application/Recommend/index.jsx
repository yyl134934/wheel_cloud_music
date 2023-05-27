import React, { useEffect } from 'react';
import Slider from '../../components/Slider';
import RecommendList from '../../components/RecommendList';
import { Content } from './style';
import Scroll from '../../components/Scroll';
import * as actionTypes from './store/actionCreators';
import { connect } from 'react-redux';

function Recommend(props) {
  const { bannerList, recommendList } = props;
  const { getBannerListDispatch, getRecommendListDispatch } = props;

  useEffect(() => {
    // 轮播图数据
    getBannerListDispatch();
    // 推荐列表数据
    getRecommendListDispatch();
  }, [getBannerListDispatch, getRecommendListDispatch]);

  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];

  return (
    <Content>
      <Scroll className='list'>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS} />
        </div>
      </Scroll>
    </Content>
  );
}

const mapStateToProps = (state) => ({
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
});

const mapDispatchToProps = (dispatch) => ({
  getBannerListDispatch: () => dispatch(actionTypes.getBannerList()),
  getRecommendListDispatch: () => dispatch(actionTypes.getRecommendList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend));
