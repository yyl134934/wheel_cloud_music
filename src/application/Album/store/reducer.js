import { createSlice } from '@reduxjs/toolkit';
import { getAlbumDetailRequest } from '../../../api/requst';

const initialState = {
  currentAlbum: {},
  enterLoading: false,
};

const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    changeAlbumDetail: (state, action) => {
      state.currentAlbum = action.payload;
    },
    changeLoadingStatus: (state, action) => {
      state.enterLoading = action.payload;
    },
  },
});

const { changeAlbumDetail, changeLoadingStatus } = albumSlice.actions;

// 专辑详情
const getAlbumDetail =
  (id = '') =>
  async (dispatch) => {
    try {
      const data = await getAlbumDetailRequest(id);
      dispatch(changeAlbumDetail(data?.playlist));
      dispatch(changeLoadingStatus(false));
    } catch (err) {
      console.error('专辑详情数据传输错误：', err);
    }
  };

export const actionCreators = { getAlbumDetail };

export default albumSlice.reducer;
