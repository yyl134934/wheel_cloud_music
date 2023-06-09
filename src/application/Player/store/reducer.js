import { createSlice } from '@reduxjs/toolkit';
import { playMode } from '../../../api/config';

const initialState = {
  fullScreen: false, // 播放器是否为全屏模式
  playing: false, // 当前歌曲是否播放
  sequencePlayList: [], // 顺序列表 (因为之后会有随机模式，列表会乱序，因从拿这个保存顺序列表)
  playList: [],
  mode: playMode.sequence, // 播放模式
  currentIndex: -1, // 当前歌曲在播放列表的索引位置
  showPlayList: false, // 是否展示播放列表
  currentSong: {},
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
    changeShowPlayList: (state, action) => {
      state.showPlayList = action.payload;
    },
    changeCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    changePlayMode: (state, action) => {
      state.mode = action.payload;
    },
    changePlayList: (state, action) => {
      state.playList = action.payload;
    },
    changePlayingState: (state, action) => {
      state.playing = action.payload;
    },
    changeFullScreen: (state, action) => {
      state.fullScreen = action.payload;
    },
    changeSequencePlayList: (state, action) => {
      state.sequencePlayList = action.payload;
    },
  },
});

const {
  changeCurrentSong,
  changeShowPlayList,
  changeCurrentIndex,
  changePlayMode,
  changePlayList,
  changePlayingState,
  changeFullScreen,
  changeSequencePlayList,
} = playerSlice.actions;

const togglePlaying = (params) => async (dispatch) => {
  dispatch(changePlayingState(params));
};

const toggleFullScreen = (params) => async (dispatch) => {
  dispatch(changeFullScreen(params));
};
const togglePlayList = (params) => async (dispatch) => {
  dispatch(changeShowPlayList(params));
};
const updateCurrentIndex = (params) => async (dispatch) => {
  dispatch(changeCurrentIndex(params));
};
const updateCurrentSong = (params) => async (dispatch) => {
  dispatch(changeCurrentSong(params));
};
const updatePlayMode = (params) => async (dispatch) => {
  dispatch(changePlayMode(params));
};
const updatePlayList = (params) => async (dispatch) => {
  dispatch(changePlayList(params));
};
const updateSequencePlayList = (params) => async (dispatch) => {
  dispatch(changeSequencePlayList(params));
};

export const actionCreator = {
  togglePlaying,
  toggleFullScreen,
  togglePlayList,
  updateCurrentIndex,
  updateCurrentSong,
  updatePlayMode,
  updatePlayList,
  updateSequencePlayList,
};

export default playerSlice.reducer;
