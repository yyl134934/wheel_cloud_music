import { createAsyncThunk } from '@reduxjs/toolkit';
import { getBannerRequest, getRecommendListRequest } from '../../../api/requst';
import * as actionTypes from './constants';

export const getBannerList = () => async (dispatch) => {
  try {
    const data = await getBannerRequest();
    dispatch(data.banners);
  } catch (err) {
    console.error('轮播图数据传输错误：', err);
  }
};

// export const getBannerList = (actionTypes.CHANGE_BANNER, async () => {
//   console.info('【action】请求轮播图数据！');
//   try {
//     const data = await getBannerRequest();

//     return data.banners;
//   } catch (err) {
//     console.error('轮播图数据传输错误：', err);
//   }
// });

export const getRecommendList = createAsyncThunk(actionTypes.CHANGE_BANNER, async () => {
  console.info('【action】请求推荐列表数据！');
  try {
    const data = await getRecommendListRequest();

    return data.result;
  } catch (err) {
    console.error('推荐列表数据传输错误：', err);
  }
});

// export const getBannerList = createAsyncThunk(actionTypes.CHANGE_BANNER, async () => {
//   console.info('【action】请求轮播图数据！');
//   try {
//     const data = await getBannerRequest();

//     return data.banners;
//   } catch (err) {
//     console.error('轮播图数据传输错误：', err);
//   }
// });

// export const getRecommendList = createAsyncThunk(actionTypes.CHANGE_BANNER, async () => {
//   console.info('【action】请求推荐列表数据！');
//   try {
//     const data = await getRecommendListRequest();

//     return data.result;
//   } catch (err) {
//     console.error('推荐列表数据传输错误：', err);
//   }
// });
