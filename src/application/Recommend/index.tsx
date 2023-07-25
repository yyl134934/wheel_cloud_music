import React from 'react';
import { forceCheck } from 'react-lazyload-v18';
import Slider from '../../components/slider';
import RecommendList from '../../components/list';
import Scroll from '../../baseUI/scroll';
import { EnterLoading } from '../../baseUI/loading';
import { Content } from './style';
import { Outlet } from 'react-router';
import { isEmptyObject } from '../../api/utils';
import { QueryKey, useQuery } from '@tanstack/react-query';
import { getRecommendListRequest, getBannerRequest } from './api';
import { usePlayingStore } from '../../store';
import { BannerResponed, RecommendResponed } from './entity';

function Recommend() {
  // 轮播图数据
  const { data: { banners: bannerList = [] } = { banners: [] }, isLoading: isBannerLoading } = useQuery<BannerResponed>(
    {
      queryKey: ['bannerList'],
      queryFn: getBannerRequest,
      refetchOnWindowFocus: false,
    },
  );
  // 推荐列表数据
  const { data: { result: recommendList = [] } = { result: [] }, isLoading: isRecommendLoading } =
    useQuery<RecommendResponed>({
      queryKey: ['recommendList'] as QueryKey,
      queryFn: getRecommendListRequest,
      refetchOnWindowFocus: false,
    });

  const { currentSong } = usePlayingStore((state) => state.state);

  return (
    <Content notPlaying={isEmptyObject(currentSong)}>
      <Scroll className='list' onScroll={forceCheck}>
        <div>
          <Slider sliderData={bannerList}></Slider>
          <RecommendList listData={recommendList} />
        </div>
      </Scroll>
      <EnterLoading show={isBannerLoading || isRecommendLoading} />
      <Outlet></Outlet>
    </Content>
  );
}

export default React.memo(Recommend);
