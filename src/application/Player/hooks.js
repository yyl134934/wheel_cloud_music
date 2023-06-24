import React from 'react';
import { findIndex, shuffle } from '../../api/utils';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { usePlayingStore } from '../../store';

const usePlayingMode = () => {
  const { sequencePlayList, mode, currentSong } = usePlayingStore((state) => state.state);
  const { updatePlayList, updateCurrentIndex, updatePlayMode } = usePlayingStore((state) => state.actions);

  const orderMode = useCallback(() => {
    //顺序模式
    const index = findIndex(currentSong, sequencePlayList);
    updatePlayList(sequencePlayList);
    updateCurrentIndex(index);
  }, [currentSong, sequencePlayList]);

  const singleMode = useCallback(() => {
    //单曲循环
    updatePlayList(sequencePlayList);
  }, [sequencePlayList]);

  const randomMode = useCallback(() => {
    //随机播放
    const newList = shuffle(sequencePlayList);
    const index = findIndex(currentSong, newList);
    updatePlayList(newList);
    updateCurrentIndex(index);
  }, [currentSong, sequencePlayList]);

  const modeMap = useMemo(
    () => ({
      0: orderMode,
      1: singleMode,
      2: randomMode,
    }),
    [orderMode, singleMode, randomMode],
  );

  const changePlayingMode = useCallback(() => {
    const newMode = (mode + 1) % 3; //妙妙妙
    const modeFunc = modeMap[newMode];

    modeFunc && modeFunc();

    updatePlayMode(newMode);
  }, [modeMap, mode]);

  return changePlayingMode;
};

const useToastText = (toastRef) => {
  const { mode } = usePlayingStore((state) => state.state);
  const [modeText, setModeText] = useState('');

  const modeMap = useMemo(
    () => ({
      0: '顺序模式',
      1: '单曲循环',
      2: '随机播放',
    }),
    [],
  );

  const changeToastText = () => {
    const newMode = (mode + 1) % 3;
    const text = modeMap[newMode] || '';

    setModeText(text);
    toastRef.current.show();
  };

  return { modeText, changeToastText };
};

const useAudio = () => {
  const audio = new Audio();
  audio.onended();
};

export { usePlayingMode, useToastText };
