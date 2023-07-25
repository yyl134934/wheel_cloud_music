import { findIndex, shuffle } from '../../api/utils';
import { useCallback, useRef } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { usePlayingStore } from '../../store';
import { DisplayLyric } from '../../entity/common';
import { useQuery } from '@tanstack/react-query';
import { getLyricRequest } from './api';
import LyricParser from '../../utils/lyric-parser';

interface PlayingModeProps {
  sequencePlayList: any[];
  mode: number;
  currentSong: any;
  updatePlayList: (list: any[]) => void;
  updateCurrentIndex: (index: number) => void;
  updatePlayMode: (mode: number) => void;
}

const usePlayingMode = (props: PlayingModeProps) => {
  const { sequencePlayList, mode, currentSong } = props;
  const { updatePlayList, updateCurrentIndex, updatePlayMode } = props;

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
    type ModeMapKeys = keyof typeof modeMap;
    const newMode: ModeMapKeys = ((mode + 1) % 3) as ModeMapKeys; //妙妙妙
    const modeFunc = modeMap[newMode];

    modeFunc && modeFunc();

    updatePlayMode(newMode);
  }, [modeMap, mode]);

  return changePlayingMode;
};

const useToastText = (toastRef: any) => {
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
    type ModeMapKeys = keyof typeof modeMap;
    const newMode: ModeMapKeys = ((mode + 1) % 3) as ModeMapKeys; //妙妙妙
    const text = modeMap[newMode] || '';

    setModeText(text);
    toastRef.current.show();
  };

  return { modeText, changeToastText };
};

const useLyricParser = (songReady: any, audioRef: any) => {
  const currentLyric = useRef<LyricParser | null>(null);
  const currentLineNum = useRef(0);
  const [playingLyric, setPlayingLyric] = useState('');

  const paramId = useRef('');

  const {
    isError,
    isSuccess,
    data: { lrc: { lyric } } = { lrc: { lyric: '' } },
  } = useQuery({
    queryKey: ['lyric', { id: paramId.current }],
    queryFn: () => getLyricRequest(paramId.current),
    refetchOnWindowFocus: false,
    // refetchOnMount: false,
    enabled: !!paramId.current,
  });
  if (isError) {
    songReady.current = true;
    audioRef.current.play();
  }

  const handleLyric = ({ txt, lineNum }: DisplayLyric) => {
    if (!currentLyric.current) {
      return;
    }
    currentLineNum.current = lineNum;
    setPlayingLyric(txt);
  };

  if (isSuccess) {
    if (!lyric) {
      currentLyric.current = null;
    }
    if (lyric && lyric !== currentLyric.current?.lrc) {
      currentLyric.current?.stop();
      currentLyric.current = new LyricParser(lyric, handleLyric);
      currentLineNum.current = 0;
    }
  }

  function getLyric(id: string) {
    paramId.current = id;
  }

  function playLyric(currentTime: number) {
    if (currentLyric.current) {
      currentLyric.current.togglePlay(currentTime * 1000);
    }
  }

  function updateLyricProgress(newTime: number) {
    if (currentLyric.current) {
      currentLyric.current.seek(newTime * 1000);
    }
  }

  return { currentLyric, playingLyric, currentLineNum, playLyric, getLyric, updateLyricProgress };
};

export { usePlayingMode, useToastText, useLyricParser };
