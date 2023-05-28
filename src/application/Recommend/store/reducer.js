import { createSlice } from '@reduxjs/toolkit';
import { getBannerRequest, getRecommendListRequest } from '../../../api/requst';
import { REDUCER_NAME } from './constants';

const initialState = {
  bannerList: [],
  recommendList: [],
  enterLoading: true,
};

const recommendSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    changeBanner: (state, action) => {
      state.bannerList = action.payload;
    },
    changeRecommendList: (state, action) => {
      state.recommendList = action.payload;
    },
    changeEnterLoadingStatus: (state, action) => {
      state.enterLoading = action.payload;
    },
  },
});

const { changeBanner, changeRecommendList, changeEnterLoadingStatus } = recommendSlice.actions;

// 轮播图
const getBannerList = () => async (dispatch) => {
  try {
    const data = await getBannerRequest();
    dispatch(changeBanner(data?.banners));
  } catch (err) {
    console.error('轮播图数据传输错误：', err);
  }
};

// 推荐列表
const getRecommendList = () => async (dispatch) => {
  try {
    const data = await getRecommendListRequest();
    dispatch(changeRecommendList(data?.result));
    // dispatch(changeEnterLoadingStatus(false));
  } catch (err) {
    console.error('轮播图数据传输错误：', err);
  }
};

export const actionCreators = { getBannerList, getRecommendList };

export default recommendSlice.reducer;
