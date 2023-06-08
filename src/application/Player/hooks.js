import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreator as actionTypes } from './store';
import { findIndex, shuffle } from '../../api/utils';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';

const usePlayingMode = () => {
  const { sequencePlayList, mode, currentSong } = useSelector((state) => state.player);
  const dispatch = useDispatch();

  const orderMode = useCallback(() => {
    //顺序模式
    const index = findIndex(currentSong, sequencePlayList);
    dispatch(actionTypes.updatePlayList(sequencePlayList));
    dispatch(actionTypes.updateCurrentIndex(index));
  }, [currentSong, sequencePlayList, dispatch]);

  const singleMode = useCallback(() => {
    //单曲循环
    dispatch(actionTypes.updatePlayList(sequencePlayList));
  }, [dispatch, sequencePlayList]);

  const randomMode = useCallback(() => {
    //随机播放
    const newList = shuffle(sequencePlayList);
    const index = findIndex(currentSong, newList);
    dispatch(actionTypes.updatePlayList(newList));
    dispatch(actionTypes.updateCurrentIndex(index));
  }, [dispatch, currentSong, sequencePlayList]);

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

    dispatch(actionTypes.updatePlayMode(newMode));
  }, [dispatch, modeMap, mode]);

  return changePlayingMode;
};

const useToastText = (toastRef) => {
  const { mode } = useSelector((state) => state.player);
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
