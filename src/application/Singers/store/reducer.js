import { createSlice } from '@reduxjs/toolkit';
import { getSingerListRequest, getHotSingerListRequest } from '../../../api/requst';

const initialState = {
  singerList: [],
  enterLoading: true,
};

const singerSlice = createSlice({
  name: 'singer',
  initialState,
  reducers: {
    changeSingerList: (state, action) => {
      state.singerList = action.payload;
    },
    changeEnterLoading: (state, action) => {
      state.enterLoading = action.payload;
    },
  },
});

const { changeSingerList, changeEnterLoading } = singerSlice.actions;

// 热门歌手列表，默认拉取
const getHotSingerList =
  (count = 0) =>
  async (dispatch) => {
    try {
      const data = await getHotSingerListRequest(count);
      dispatch(changeSingerList(data?.artists));
      dispatch(changeEnterLoading(false));
    } catch (err) {
      console.error('热门歌手列表数据传输错误：', err);
    }
  };

// 歌手列表
const getSingerList =
  (category, alpha, count = 0) =>
  async (dispatch) => {
    try {
      const data = await getSingerListRequest(category, alpha, count);
      dispatch(changeSingerList(data?.artists));
    } catch (err) {
      console.error('歌手列表数据传输错误：', err);
    }
  };

export const actionCreators = { getSingerList, getHotSingerList };

export default singerSlice.reducer;
