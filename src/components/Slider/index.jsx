import React from 'react';
import { SliderContainer } from './style';
import { Pagination, Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

/**
 * 轮播组件
 * @param {*} props 轮播数据
 * @returns
 */
function Slider(props) {
  const { bannerList } = props;

  const swiperConfig = {
    spaceBetween: 30,
    centeredSlides: true,
    modules: [Pagination, Autoplay, Navigation],
    pagination: { clickable: true },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    navigation: true,
    className: 'swiper-wrapper',
  };

  return (
    <SliderContainer>
      <div className='before'></div>
      <Swiper {...swiperConfig}>
        {bannerList.map((slider, index) => {
          return (
            /* 处理mock数据key same */
            <SwiperSlide key={slider.imageUrl + index}>
              <div className='slider-nav'>
                <img src={slider.imageUrl} width='100%' height='100%' alt='推荐' />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </SliderContainer>
  );
}

export default React.memo(Slider);
