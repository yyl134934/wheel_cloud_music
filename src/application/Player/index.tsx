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

function Player() {
  const { fullScreen, playing, playList, mode, currentIndex, currentSong } = usePlayingStore((state) => state.state);
  const { togglePlaying, toggleFullScreen, updateCurrentIndex, updateCurrentSong } = usePlayingStore(
    (state) => state.actions,
  );
  const toastRef = useRef<any>(null);
  const audioRef = useRef<any>(null);
  //记录当前的歌曲，以便于下次重渲染时比对是否是一首歌
  const [preSong, setPreSong] = useState<any>();
  //目前播放时间
  const [currentTime, setCurrentTime] = useState(0);
  //歌曲总时长
  const [duration, setDuration] = useState(0);
  //歌曲播放进度
  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;

  const changePlayingMode = usePlayingMode();
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

  useEffect(() => {
    if (
      !playList.length ||
      currentIndex === -1 ||
      !playList[currentIndex] ||
      playList[currentIndex]?.id === preSong?.id
    )
      return;
    const current = playList[currentIndex];
    updateCurrentIndex(currentIndex); //currentIndex默认为-1，临时改成0
    updateCurrentSong(current); //赋值currentSong
    setPreSong(current);
    audioRef.current.src = getSongUrl(current.id); //url
    togglePlaying(); //播放状态
    setCurrentTime(0); //从头开始播放
    setDuration((current.dt / 1000) | 0); //时长
  }, [playList, currentIndex, preSong]);

  useEffect(() => {
    playing ? audioRef.current.play() : audioRef.current.pause();
  }, [playing]);

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
      {isEmptyObject(currentSong) ? null : (
        <>
          <MiniPlayer {...miniPlayerConfig}></MiniPlayer>
        </>
      )}
      <NormalPlayer {...normalPlayerConfig}></NormalPlayer>
      <audio ref={audioRef} onTimeUpdate={updateTime} onEnded={handleEnd}></audio>
      <Toast text={modeText} ref={toastRef}></Toast>
    </div>
  );
}

export default React.memo(Player);
