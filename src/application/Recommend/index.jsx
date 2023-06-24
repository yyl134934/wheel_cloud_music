import React, { useEffect } from 'react';
import { forceCheck } from 'react-lazyload-v18';
import Slider from '../../components/slider';
import RecommendList from '../../components/list';
import Scroll from '../../baseUI/scroll';
import { EnterLoading } from '../../baseUI/loading';
import { Content } from './style';
import { Outlet } from 'react-router';
import { isEmptyObject } from '../../api/utils';
import { useQuery } from '@tanstack/react-query';
import { getRecommendListRequest, getBannerRequest } from '../../api/requst';
import { usePlayingStore } from '../../store';

function Recommend(props) {
  // 轮播图数据
  const {
    data: { banners: bannerList = [] },
    isLoading: isBannerLoading,
  } = useQuery({
    queryKey: ['bannerList'],
    queryFn: getBannerRequest,
    initialData: { banners: [] },
    refetchOnWindowFocus: false,
  });
  // 推荐列表数据
  const { data: { result: recommendList = [] } = { result: [] }, isLoading: isRecommendLoading } = useQuery({
    queryKey: ['recommendList'],
    queryFn: getRecommendListRequest,
    initialData: { result: [] },
    refetchOnWindowFocus: false,
  });

  const { currentSong } = usePlayingStore((state) => state.state);

  return (
    <Content notPlaying={isEmptyObject(currentSong)}>
      <Scroll className='list' onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerList}></Slider>
          <RecommendList recommendList={recommendList} />
        </div>
      </Scroll>
      {isBannerLoading || isRecommendLoading ? <EnterLoading></EnterLoading> : null}
      <Outlet></Outlet>
    </Content>
  );
}

export default React.memo(Recommend);
