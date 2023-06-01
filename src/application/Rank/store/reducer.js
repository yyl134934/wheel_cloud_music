import { createSlice } from '@reduxjs/toolkit';
import { getBannerRequest, getRankListRequest, getRecommendListRequest } from '../../../api/requst';

const initialState = {
  rankList: [],
  loading: true,
};

const rankSlice = createSlice({
  name: 'rank',
  initialState,
  reducers: {
    changeRankList: (state, action) => {
      state.rankList = action.payload;
    },
    changeLoadingStatus: (state, action) => {
      state.loading = action.payload;
    },
  },
});

const { changeRankList, changeLoadingStatus } = rankSlice.actions;

// 排行榜
const getBannerList = () => async (dispatch) => {
  try {
    const data = await getRankListRequest();
    dispatch(changeRankList(data?.list));
    dispatch(changeLoadingStatus(false));
  } catch (err) {
    console.error('排行榜数据传输错误：', err);
  }
};

export const actionCreators = { getBannerList };

export default rankSlice.reducer;
