import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { produce } from 'immer';
import { playMode } from '../api/config';

const store = (set, get) => ({
  state: {
    fullScreen: false, // 播放器是否为全屏模式
    playing: false, // 当前歌曲是否播放
    sequencePlayList: [], // 顺序列表 (因为之后会有随机模式，列表会乱序，因从拿这个保存顺序列表)
    playList: [],
    mode: playMode.sequence, // 播放模式
    currentIndex: -1, // 当前歌曲在播放列表的索引位置
    showPlayList: false, // 是否展示播放列表
    currentSong: {},
  },
  actions: {
    togglePlaying: () => set(produce((state) => ({ state: { ...state.state, playing: !state.state.playing } }))),
    toggleFullScreen: (fullScreen) => set(produce((state) => ({ state: { ...state.state, fullScreen } }))),
    togglePlayList: (playList) => set(produce((state) => ({ state: { ...state.state, playList } }))),
    updateCurrentIndex: (currentIndex) => set(produce((state) => ({ state: { ...state.state, currentIndex } }))),
    updateCurrentSong: (currentSong) => set(produce((state) => ({ state: { ...state.state, currentSong } }))),
    updatePlayMode: (mode) => set(produce((state) => ({ state: { ...state.state, mode } }))),
    updatePlayList: (playList) => set(produce((state) => ({ state: { ...state.state, playList } }))),
    updateSequencePlayList: (sequencePlayList) =>
      set(produce((state) => ({ state: { ...state.state, sequencePlayList } }))),
  },
});

const usePlayingStore = create(devtools(store, { name: 'playingStore' }));

export { usePlayingStore };
