import { createSlice } from '@reduxjs/toolkit';
import { getSingerListRequest, getHotSingerListRequest } from '../../../api/requst';

const initialState = {
  singerList: [],
  pageSize: 0,
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
    resetPageSize: (state, action) => {
      state.pageSize = 0;
    },
    autoAddPageSize: (state, action) => {
      state.pageSize += 1;
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
export const { resetPageSize, autoAddPageSize, changePullUpLoading, changePullDownLoading } = singerSlice.actions;

// 初始化刷新
const initRefresh = () => async (dispatch) => {
  try {
    const data = await getHotSingerListRequest(0);
    dispatch(autoAddPageSize());
    dispatch(changeSingerList(data?.artists));
  } catch (err) {
    console.error('热门歌手列表数据传输错误：', err);
  }
  dispatch(changeEnterLoading(false));
};

// 下拉刷新
const getPullDownSingerList = () => async (dispatch, getState) => {
  dispatch(changePullDownLoading(true));

  try {
    const pageSize = 0;
    const data = await getHotSingerListRequest(pageSize);

    dispatch(resetPageSize());
    dispatch(changeSingerList(data?.artists));
  } catch (err) {
    console.error('热门歌手列表数据传输错误：', err);
  }
  dispatch(changePullDownLoading(false));
};

// 歌手列表-分类筛选
const filterSinger =
  (category, alpha, count = 0) =>
  async (dispatch) => {
    dispatch(changeEnterLoading(true));
    try {
      const data = await getSingerListRequest(category, alpha, count);
      dispatch(resetPageSize());
      dispatch(changeSingerList(data?.artists));
    } catch (err) {
      console.error('歌手列表数据传输错误：', err);
    }
    dispatch(changeEnterLoading(false));
  };

function getPullDownQuery(category = '', alpha = '', pageSize = 0) {
  // 上拉下一页——热门歌手列表
  if (category === '' && alpha === '') {
    return getHotSingerListRequest(pageSize + 1);
  }

  // 上拉下一页——筛选分类歌手列表
  return getSingerListRequest(category, alpha, pageSize + 1);
}

// 上拉下一页——带筛选分类歌手列表
const getPullUpSingerList = (category, alpha) => async (dispatch, getState) => {
  const {
    singer: { pageSize, singerList: oldList },
  } = getState();

  dispatch(changePullUpLoading(true));

  try {
    const data = await getPullDownQuery(category, alpha, pageSize);
    const newCollect = [...oldList, ...data?.artists];

    dispatch(autoAddPageSize());
    dispatch(changeSingerList(newCollect));
  } catch (err) {
    console.error('热门歌手列表数据传输错误：', err);
  }
  dispatch(changePullUpLoading(false));
};

export const actionCreators = {
  initRefresh,
  filterSinger,
  getPullUpSingerList,
  getPullDownSingerList,
};

export default singerSlice.reducer;
