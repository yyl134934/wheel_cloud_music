import { createSlice } from '@reduxjs/toolkit';
import { getSingerListRequest, getHotSingerListRequest } from '../../../api/requst';

const initialState = {
  singerList: [],
  pageCount: 0,
  enterLoading: true,
  pullUpLoading: false,
  pullDownLoading: false,
};

const singerSlice = createSlice({
  name: 'singer',
  initialState,
  reducers: {
    changeSingerList: (state, action) => {
      state.singerList = action.payload;
    },
    resetPageCount: (state, action) => {
      state.pageCount = 0;
    },
    autoAddPageCount: (state, action) => {
      state.pageCount += 1;
    },
    changeEnterLoading: (state, action) => {
      state.enterLoading = action.payload;
    },
    changePullUpLoading: (state, action) => {
      state.pullUpLoading = action.payload;
    },
    changePullDownLoading: (state, action) => {
      state.pullDownLoading = action.payload;
    },
  },
});

const { changeSingerList, changeEnterLoading } = singerSlice.actions;
export const { resetPageCount, autoAddPageCount, changePullUpLoading, changePullDownLoading } = singerSlice.actions;

// 热门歌手列表，默认拉取
const getHotSingerList =
  (count = 0) =>
  async (dispatch) => {
    try {
      const data = await getHotSingerListRequest(count);
      dispatch(changeSingerList(data?.artists));
      dispatch(changeEnterLoading(false));
      dispatch(changePullDownLoading(false));
    } catch (err) {
      console.error('热门歌手列表数据传输错误：', err);
    }
  };

// 下拉刷新
const getRefreshHotSingerList = () => async (dispatch, getState) => {
  dispatch(changePullDownLoading(true));

  try {
    const data = await getHotSingerListRequest(0);

    dispatch(resetPageCount());
    dispatch(changeSingerList(data?.artists));
    dispatch(changeEnterLoading(false));
    dispatch(changePullDownLoading(false));
  } catch (err) {
    console.error('热门歌手列表数据传输错误：', err);
  }
};

// 上拉下一页——热门歌手列表
const getMoreRefreshHotSingerList = () => async (dispatch, getState) => {
  const { pageCount, singerList: oldList } = getState();

  dispatch(changePullUpLoading(true));

  try {
    const data = await getHotSingerListRequest(pageCount);
    const newCollect = [...oldList, ...data?.artists];

    dispatch(autoAddPageCount(newCollect));
    dispatch(changeSingerList(newCollect));
    dispatch(changePullUpLoading(false));
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
      dispatch(changePullDownLoading(false));
      dispatch(changePullUpLoading(false));
    } catch (err) {
      console.error('歌手列表数据传输错误：', err);
    }
  };

// 上拉下一页——带筛选分类歌手列表
const getMoreRefreshSingerList = (category, alpha) => async (dispatch, getState) => {
  const { pageCount, singerList: oldList } = getState();

  dispatch(changePullUpLoading(true));

  try {
    const nextPageCount = pageCount + 1;
    const data = await getSingerListRequest(category, alpha, nextPageCount);
    const newCollect = [...oldList, ...data?.artists];

    dispatch(changeSingerList(newCollect));
    dispatch(changePullUpLoading(false));
  } catch (err) {
    console.error('热门歌手列表数据传输错误：', err);
  }
};

export const actionCreators = {
  getSingerList,
  getHotSingerList,
  getMoreRefreshHotSingerList,
  getMoreRefreshSingerList,
  getRefreshHotSingerList,
  resetPageCount,
  addPageCount: autoAddPageCount,
  changePullUpLoading,
  changePullDownLoading,
};

export default singerSlice.reducer;
