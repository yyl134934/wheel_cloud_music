import { createSlice } from '@reduxjs/toolkit';
import { getSingerInfoRequest } from '../../../api/requst';

const initialState = {
  artist: {},
  songsOfArtist: [],
  loading: true,
};

const singerSlice = createSlice({
  name: 'singer',
  initialState,
  reducers: {
    changeArtist: (state, action) => {
      state.artist = action.payload;
    },
    changeSongsOfArtist: (state, action) => {
      state.songsOfArtist = action.payload;
    },
    changeLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

const { changeArtist, changeSongsOfArtist, changeLoading } = singerSlice.actions;

// 歌手详情
const getSingerInfo =
  (id = '') =>
  async (dispatch) => {
    try {
      const data = await getSingerInfoRequest(id);
      dispatch(changeArtist(data?.artist));
      dispatch(changeSongsOfArtist(data?.hotSongs));
      dispatch(changeLoading(false));
    } catch (err) {
      console.error('歌手详情数据传输错误：', err);
    }
  };

export const actionCreators = { getSingerInfo };

export default singerSlice.reducer;
