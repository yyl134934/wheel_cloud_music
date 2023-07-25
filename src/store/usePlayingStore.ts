import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { produce } from 'immer';
import { playMode } from '../api/config';
import { findIndex } from '../api/utils';

type Mode = (typeof playMode)[keyof typeof playMode];

interface State {
  fullScreen: boolean;
  playing: boolean;
  sequencePlayList: any[];
  playList: any[];
  mode: Mode;
  currentIndex: number;
  showPlayList: boolean;
  currentSong: any;
}

interface Actions {
  togglePlaying: (playing?: boolean) => void;
  toggleFullScreen: (fullScreen: boolean) => void;
  togglePlayList: (open: boolean) => void;
  updateCurrentIndex: (currentIndex: number) => void;
  updateCurrentSong: (currentSong: any) => void;
  updatePlayMode: (mode: Mode) => void;
  updatePlayList: (playList: any[]) => void;
  deleteSong: (song: any) => void;
  clearPlayList: () => void;
  updateSequencePlayList: (sequencePlayList: any[]) => void;
  insertSongInPlayList: (song: any) => void;
}

export type Store = { state: State; actions: Actions };
export type AllInStore = State & Actions;

const store = (set: any, get: any): Store => ({
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
    togglePlaying: (playing?: boolean) =>
      set(produce((state: Store) => ({ state: { ...state.state, playing: playing ?? !state.state.playing } }))),
    toggleFullScreen: (fullScreen) => set(produce((state: Store) => ({ state: { ...state.state, fullScreen } }))),
    togglePlayList: (open: boolean) =>
      set(produce((state: Store) => ({ state: { ...state.state, showPlayList: open } }))),
    updateCurrentIndex: (currentIndex) => set(produce((state: Store) => ({ state: { ...state.state, currentIndex } }))),
    updateCurrentSong: (currentSong) => set(produce((state: Store) => ({ state: { ...state.state, currentSong } }))),
    updatePlayMode: (mode) => set(produce((state: Store) => ({ state: { ...state.state, mode } }))),
    updatePlayList: (playList) => set(produce((state: Store) => ({ state: { ...state.state, playList } }))),
    deleteSong: (song: any) => set(produce((state: Store) => ({ state: onDeleteSong(state.state, song) }))),
    clearPlayList: () =>
      set(
        produce((state: Store) => ({
          state: {
            ...state.state,
            playing: false, // 当前歌曲是否播放
            sequencePlayList: [], // 顺序列表 (因为之后会有随机模式，列表会乱序，因从拿这个保存顺序列表)
            playList: [],
            mode: playMode.sequence, // 播放模式
            currentIndex: -1, // 当前歌曲在播放列表的索引位置
            currentSong: {},
          },
        })),
      ),
    updateSequencePlayList: (sequencePlayList) =>
      set(produce((state: Store) => ({ state: { ...state.state, sequencePlayList } }))),
    insertSongInPlayList: (song: any) => set(produce((state: Store) => ({ state: insertSong(state.state, song) }))),
  },
});

const usePlayingStore = create(devtools(store, { name: 'playingStore' }));

const onDeleteSong = (state: State, song: any): State => {
  const { playList, currentIndex, sequencePlayList } = state;

  // 克隆，避免immer
  const playListAlternate = playList.slice();
  const currentIndexAlternate = currentIndex;
  const sequencePlayListAlternate = sequencePlayList.slice();

  // 从播放列表中清除指定歌曲
  const fpIndex = findIndex(song, playListAlternate);
  playListAlternate.splice(fpIndex, 1);

  // 如果删除的当前播放歌曲，则将当前指针往后移
  const nextCurrentIndex = fpIndex < currentIndexAlternate ? currentIndexAlternate - 1 : currentIndexAlternate;

  // 从循环列表删除指定歌曲
  const fsIndex = findIndex(song, sequencePlayListAlternate);
  sequencePlayListAlternate.splice(fsIndex, 1);

  return {
    ...state,
    playList: playListAlternate,
    currentIndex: nextCurrentIndex,
    sequencePlayList: sequencePlayListAlternate,
  };
};

const toEqualsCurrentSong = (state: any, song: any) => {
  const { playList, currentIndex } = state;

  //正在播放的歌曲，是否是当前歌曲
  let fpIndex = findIndex(song, playList);

  return fpIndex === currentIndex && currentIndex !== -1;
};

const onExistCurrentSong = (state: any, song: any) => {
  const { playList, currentIndex } = state;
  let fpIndex = findIndex(song, playList);
  let nextIndext = currentIndex + 1;
  // 把歌放进去,放到当前播放曲目的下一个位置
  playList.splice(currentIndex, 0, song);
  // 如果列表中已经存在要添加的歌，暂且称它oldSong
  if (fpIndex > -1) {
    // 如果oldSong的索引在目前播放歌曲的索引小，那么删除它，同时当前index要减一
    if (currentIndex > fpIndex) {
      playList.splice(fpIndex, 1);
      nextIndext--;
    } else {
      // 否则直接删掉oldSong
      playList.splice(fpIndex + 1, 1);
    }
  }

  return { playList, currentIndex: nextIndext };
};

const insertSongInSequencePlayList = (state: any, song: any) => {
  const { playList, sequencePlayList, currentIndex } = state;

  let nextIndext = currentIndex + 1;
  // 处理顺序列表
  let sequenceIndex = findIndex(playList[nextIndext], sequencePlayList) + 1;
  let fsIndex = findIndex(song, sequencePlayList);
  // 插入歌曲
  sequencePlayList.splice(sequenceIndex, 0, song);
  if (fsIndex > -1) {
    //跟上面类似的逻辑。如果在前面就删掉，index--;如果在后面就直接删除
    if (sequenceIndex > fsIndex) {
      sequencePlayList.splice(fsIndex, 1);
      sequenceIndex--;
    } else {
      sequencePlayList.splice(fsIndex + 1, 1);
    }
  }
  return sequencePlayList;
};

const insertSong = (state: State, song: any) => {
  const { playList, currentIndex, sequencePlayList } = state;

  // 克隆，避免immer
  const playListAlternate = playList.slice();
  const currentIndexAlternate = currentIndex;
  const sequencePlayListAlternate = sequencePlayList.slice();

  const stateClones = {
    playList: playListAlternate,
    currentIndex: currentIndexAlternate,
    sequencePlayList: sequencePlayListAlternate,
  };

  //正在播放的歌曲，是否是当前歌曲
  if (toEqualsCurrentSong(stateClones, song)) {
    return state;
  }
  //播放列表是否已存在当前歌曲
  const result = onExistCurrentSong(stateClones, song);
  //处理顺序列表
  const newSequence = insertSongInSequencePlayList(stateClones, song);
  return { ...state, ...result, sequencePlayList: newSequence };
};

export { usePlayingStore };
