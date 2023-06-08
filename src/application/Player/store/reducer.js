import { createSlice } from '@reduxjs/toolkit';
import { playMode } from '../../../api/config';

const initialState = {
  fullScreen: false, // 播放器是否为全屏模式
  playing: false, // 当前歌曲是否播放
  sequencePlayList: [], // 顺序列表 (因为之后会有随机模式，列表会乱序，因从拿这个保存顺序列表)
  playList: [
    {
      rtUrls: [],
      ar: [
        {
          id: 4941,
          name: '孙楠',
        },
      ],
      al: {
        id: 2732493,
        name: '热门华语202',
        picUrl: 'https://p1.music.126.net/cpoUinrExafBHL5Nv5iDHQ==/109951166361218466.jpg',
        pic_str: '109951166361218466',
        pic: 109951166361218460,
      },
      st: 1,
      noCopyrightRcmd: null,
      songJumpInfo: null,
      rtype: 0,
      rurl: null,
      pst: 0,
      alia: ['动画片《哪吒传奇》片头曲'],
      pop: 100,
      rt: '',
      mst: 9,
      cp: 0,
      crbt: null,
      cf: '',
      dt: 86700,
      rtUrl: null,
      ftype: 0,
      djId: 0,
      no: 10,
      fee: 0,
      mv: 5337539,
      t: 0,
      v: 679,
      h: {
        br: 320000,
        fid: 0,
        size: 3470149,
        vd: -43634,
        sr: 44100,
      },
      l: {
        br: 128000,
        fid: 0,
        size: 1388085,
        vd: -39253,
        sr: 44100,
      },
      sq: null,
      hr: null,
      cd: '01',
      a: null,
      m: {
        br: 192000,
        fid: 0,
        size: 2082106,
        vd: -41001,
        sr: 44100,
      },
      name: '小哪吒',
      id: 28188452,
      privilege: {
        id: 28188452,
        fee: 0,
        payed: 0,
        st: 0,
        pl: 320000,
        dl: 320000,
        sp: 7,
        cp: 1,
        subp: 1,
        cs: false,
        maxbr: 320000,
        fl: 320000,
        toast: false,
        flag: 128,
        preSell: false,
        playMaxbr: 320000,
        downloadMaxbr: 320000,
        maxBrLevel: 'exhigh',
        playMaxBrLevel: 'exhigh',
        downloadMaxBrLevel: 'exhigh',
        plLevel: 'exhigh',
        dlLevel: 'exhigh',
        flLevel: 'exhigh',
        rscl: null,
        freeTrialPrivilege: {
          resConsumable: false,
          userConsumable: false,
          listenType: null,
        },
        chargeInfoList: [
          {
            rate: 128000,
            chargeUrl: null,
            chargeMessage: null,
            chargeType: 0,
          },
          {
            rate: 192000,
            chargeUrl: null,
            chargeMessage: null,
            chargeType: 0,
          },
          {
            rate: 320000,
            chargeUrl: null,
            chargeMessage: null,
            chargeType: 0,
          },
          {
            rate: 999000,
            chargeUrl: null,
            chargeMessage: null,
            chargeType: 1,
          },
        ],
      },
    },
  ],
  mode: playMode.sequence, // 播放模式
  currentIndex: -1, // 当前歌曲在播放列表的索引位置
  showPlayList: false, // 是否展示播放列表
  currentSong: {
    rtUrls: [],
    ar: [
      {
        id: 4941,
        name: '孙楠',
      },
    ],
    al: {
      id: 2732493,
      name: '热门华语202',
      picUrl: 'https://p1.music.126.net/cpoUinrExafBHL5Nv5iDHQ==/109951166361218466.jpg',
      pic_str: '109951166361218466',
      pic: 109951166361218460,
    },
    st: 1,
    noCopyrightRcmd: null,
    songJumpInfo: null,
    rtype: 0,
    rurl: null,
    pst: 0,
    alia: ['动画片《哪吒传奇》片头曲'],
    pop: 100,
    rt: '',
    mst: 9,
    cp: 0,
    crbt: null,
    cf: '',
    dt: 86700,
    rtUrl: null,
    ftype: 0,
    djId: 0,
    no: 10,
    fee: 0,
    mv: 5337539,
    t: 0,
    v: 679,
    h: {
      br: 320000,
      fid: 0,
      size: 3470149,
      vd: -43634,
      sr: 44100,
    },
    l: {
      br: 128000,
      fid: 0,
      size: 1388085,
      vd: -39253,
      sr: 44100,
    },
    sq: null,
    hr: null,
    cd: '01',
    a: null,
    m: {
      br: 192000,
      fid: 0,
      size: 2082106,
      vd: -41001,
      sr: 44100,
    },
    name: '小哪吒',
    id: 28188452,
    privilege: {
      id: 28188452,
      fee: 0,
      payed: 0,
      st: 0,
      pl: 320000,
      dl: 320000,
      sp: 7,
      cp: 1,
      subp: 1,
      cs: false,
      maxbr: 320000,
      fl: 320000,
      toast: false,
      flag: 128,
      preSell: false,
      playMaxbr: 320000,
      downloadMaxbr: 320000,
      maxBrLevel: 'exhigh',
      playMaxBrLevel: 'exhigh',
      downloadMaxBrLevel: 'exhigh',
      plLevel: 'exhigh',
      dlLevel: 'exhigh',
      flLevel: 'exhigh',
      rscl: null,
      freeTrialPrivilege: {
        resConsumable: false,
        userConsumable: false,
        listenType: null,
      },
      chargeInfoList: [
        {
          rate: 128000,
          chargeUrl: null,
          chargeMessage: null,
          chargeType: 0,
        },
        {
          rate: 192000,
          chargeUrl: null,
          chargeMessage: null,
          chargeType: 0,
        },
        {
          rate: 320000,
          chargeUrl: null,
          chargeMessage: null,
          chargeType: 0,
        },
        {
          rate: 999000,
          chargeUrl: null,
          chargeMessage: null,
          chargeType: 1,
        },
      ],
    },
  },
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

export const actionCreator = {
  togglePlaying,
  toggleFullScreen,
  togglePlayList,
  updateCurrentIndex,
  updateCurrentSong,
  updatePlayMode,
  updatePlayList,
};

export default playerSlice.reducer;
