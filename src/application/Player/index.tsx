import React, { useEffect, useRef, useState } from 'react';
import MiniPlayer from './miniPlayer';
import NormalPlayer from './normalPlayer';
import { useCallback } from 'react';
import { getSongUrl } from '../../api/requst';
import { usePlayingMode, useToastText } from './hooks';
import Toast from '../../baseUI/Toast';
import { playMode } from '../../api/config';
import { isEmptyObject } from '../../api/utils';
import { usePlayingStore } from '../../store';
import PlayList from './playList';

function Player() {
  const { state, actions } = usePlayingStore((state) => state);
  const { fullScreen, playing, playList, sequencePlayList, mode, currentIndex, currentSong, showPlayList } = state;
  const {
    togglePlaying,
    toggleFullScreen,
    updateCurrentIndex,
    updateCurrentSong,
    togglePlayList,
    updatePlayList,
    clearPlayList,
    deleteSong,
    updatePlayMode,
  } = actions;

  const toastRef = useRef<any>(null);
  const audioRef = useRef<any>(null);
  const songReady = useRef(true);
  //记录当前的歌曲，以便于下次重渲染时比对是否是一首歌
  const [preSong, setPreSong] = useState<any>();
  //目前播放时间
  const [currentTime, setCurrentTime] = useState(0);
  //歌曲总时长
  const [duration, setDuration] = useState(0);
  //歌曲播放进度
  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;

  const changePlayingMode = usePlayingMode({
    sequencePlayList,
    mode,
    currentSong,
    updatePlayList,
    updateCurrentIndex,
    updatePlayMode,
  });
  const { modeText, changeToastText } = useToastText(toastRef);

  const clickPlaying = useCallback((e: any, state: any) => {
    e.stopPropagation();
    togglePlaying();
    // state ? audioRef.current.play() : audioRef.current.pause();
  }, []);

  const updateTime = (e: any) => {
    setCurrentTime(e.target.currentTime);
  };

  const onProgressChange = (curPercent: any) => {
    const newTime = curPercent * duration;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
    togglePlaying();
  };

  //一首歌循环
  const handleLoop = () => {
    audioRef.current.currentTime = 0;
    if (!playing) togglePlaying();
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
    if (!playing) togglePlaying();
    updateCurrentIndex(index);
  };

  const handleNext = () => {
    //播放列表只有一首歌时单曲循环
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex + 1;
    if (index === playList.length) index = 0;
    if (!playing) togglePlaying();
    updateCurrentIndex(index);
  };

  const handleEnd = () => {
    if (mode === playMode.loop) {
      handleLoop();
      return;
    }
    handleNext();
  };

  /**
   * 歌曲加载完成之前，禁止切换歌曲
   * @param current
   */
  const playingProtect = (current: any) => {
    if (songReady.current) {
      songReady.current = false; // 把标志位置为 false, 表示现在新的资源没有缓冲完成，不能切歌
      updateCurrentSong(current);
    }
  };

  useEffect(() => {
    const hasNotReady =
      !playList.length || currentIndex === -1 || !playList[currentIndex] || playList[currentIndex]?.id === preSong?.id;
    if (hasNotReady) {
      return;
    }

    const current = playList[currentIndex];
    updateCurrentIndex(currentIndex); //currentIndex默认为-1，临时改成0
    updateCurrentSong(current); //赋值currentSong
    setPreSong(current);

    // 歌曲加载完成之前，禁止切换歌曲
    playingProtect(current);

    audioRef.current.src = getSongUrl(current.id); //url
    togglePlaying(); //播放状态
    setCurrentTime(0); //从头开始播放
    setDuration((current.dt / 1000) | 0); //时长
  }, [playList, currentIndex, preSong]);

  useEffect(() => {
    playing ? audioRef.current.play() : audioRef.current.pause();
  }, [playing]);

  const handleError = () => {
    songReady.current = true;
    alert('播放出错');
  };

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
      changeToastText();
    },
    togglePlayList: togglePlayList,
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
    togglePlayList: togglePlayList,
  };

  const playListConfig = {
    showPlayList: showPlayList,
    playList: playList,
    sequencePlayList: sequencePlayList,
    currentSong: currentSong,
    mode: mode,
    currentIndex: currentIndex,
    togglePlayList: togglePlayList,
    updatePlayList: updatePlayList,
    updateCurrentIndex: updateCurrentIndex,
    clearPlayList: clearPlayList,
    deleteSong: deleteSong,
    updatePlayMode: updatePlayMode,
  };

  return (
    <div>
      {isEmptyObject(currentSong) ? null : (
        <>
          <MiniPlayer {...miniPlayerConfig}></MiniPlayer>
        </>
      )}
      <NormalPlayer {...normalPlayerConfig}></NormalPlayer>
      <audio ref={audioRef} onTimeUpdate={updateTime} onEnded={handleEnd} onError={handleError}></audio>
      <Toast text={modeText} ref={toastRef}></Toast>
      <PlayList {...playListConfig} />
    </div>
  );
}

export default React.memo(Player);
