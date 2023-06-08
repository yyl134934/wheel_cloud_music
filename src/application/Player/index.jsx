import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MiniPlayer from './miniPlayer';
import NormalPlayer from './normalPlayer';
import { actionCreator as actionTypes } from './store';
import { useCallback } from 'react';
import { getSongUrl } from '../../api/requst';
import { usePlayingMode, useToastText } from './hooks';
import Toast from '../../baseUI/Toast';
import { playMode } from '../../api/config';

function Player(params) {
  const { fullScreen, playing, sequencePlayList, playList, mode, currentIndex, showPlayList, currentSong } =
    useSelector((state) => state.player);
  const dispatch = useDispatch();
  const toastRef = useRef(null);
  const audioRef = useRef(null);
  //记录当前的歌曲，以便于下次重渲染时比对是否是一首歌
  const [preSong, setPreSong] = useState({});
  //目前播放时间
  const [currentTime, setCurrentTime] = useState(0);
  //歌曲总时长
  const [duration, setDuration] = useState(0);
  //歌曲播放进度
  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;

  const changePlayingMode = usePlayingMode();
  const { modeText, changeToastText } = useToastText(toastRef);

  const clickPlaying = useCallback(
    (e, state) => {
      e.stopPropagation();
      dispatch(actionTypes.togglePlaying(state));
    },
    [dispatch],
  );

  const toggleFullScreen = useCallback(
    (params) => {
      dispatch(actionTypes.toggleFullScreen(params));
    },
    [dispatch],
  );

  const updateTime = (e) => {
    setCurrentTime(e.target.currentTime);
  };

  const onProgressChange = (curPercent) => {
    const newTime = curPercent * duration;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
    if (!playing) {
      dispatch(actionTypes.togglePlaying(true));
    }
  };

  //一首歌循环
  const handleLoop = () => {
    audioRef.current.currentTime = 0;
    dispatch(actionTypes.togglePlaying(true));
    audioRef.current.play();
  };

  const handlePrev = () => {
    //播放列表只有一首歌时单曲循环
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex - 1;
    if (index < 0) index = playList.length - 1;
    if (!playing) dispatch(actionTypes.togglePlaying(true));
    dispatch(actionTypes.updateCurrentIndex(index));
  };

  const handleNext = () => {
    //播放列表只有一首歌时单曲循环
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex + 1;
    if (index === playList.length) index = 0;
    if (!playing) dispatch(actionTypes.togglePlaying(true));
    dispatch(actionTypes.updateCurrentIndex(index));
  };

  const handleEnd = () => {
    if (mode === playMode.loop) {
      handleLoop();
      return;
    }
    handleNext();
  };

  useEffect(() => {
    if (!playList.length || currentIndex === -1 || !playList[currentIndex] || playList[currentIndex].id === preSong.id)
      return;
    const current = playList[currentIndex];
    dispatch(actionTypes.updateCurrentIndex(0)); //currentIndex默认为-1，临时改成0
    dispatch(actionTypes.updateCurrentSong(current)); //赋值currentSong
    setPreSong(current);
    audioRef.current.src = getSongUrl(current.id); //url
    dispatch(actionTypes.togglePlaying(true)); //播放状态
    setCurrentTime(0); //从头开始播放
    setDuration((current.dt / 1000) | 0); //时长
  }, [dispatch, playList, currentIndex, preSong]);

  useEffect(() => {
    playing ? audioRef.current.play() : audioRef.current.pause();
  }, [playing]);

  useEffect(() => {
    dispatch(actionTypes.updateCurrentIndex(0));
  }, [dispatch]);

  const normalPlayerConfig = {
    song: currentSong,
    fullScreen: fullScreen,
    playing: playing,
    duration: duration, //总时长
    currentTime: currentTime, //播放时间
    percent: percent, //进度
    mode: mode,
    toggleFullScreen: toggleFullScreen,
    clickPlaying: clickPlaying,
    onProgressChange: onProgressChange,
    handlePrev: handlePrev,
    handleNext: handleNext,
    changeMode: () => {
      changePlayingMode();
      changeToastText(toastRef);
    },
  };

  const miniPlayerConfig = {
    song: currentSong,
    fullScreen: fullScreen,
    playing: playing,
    duration: duration, //总时长
    currentTime: currentTime, //播放时间
    percent: percent, //进度
    toggleFullScreen: toggleFullScreen,
    clickPlaying: clickPlaying,
  };

  return (
    <div>
      <MiniPlayer {...miniPlayerConfig}></MiniPlayer>
      <NormalPlayer {...normalPlayerConfig}></NormalPlayer>
      <audio ref={audioRef} onTimeUpdate={updateTime} onEnded={handleEnd}></audio>
      <Toast text={modeText} ref={toastRef}></Toast>
    </div>
  );
}

export default React.memo(Player);
