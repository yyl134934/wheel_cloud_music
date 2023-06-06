import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MiniPlayer from './miniPlayer';
import NormalPlayer from './normalPlayer';
import { actionCreator as actionTypes } from './store';
import { useCallback } from 'react';

function Player(params) {
  const { fullScreen, playing, sequencePlayList, playList, mode, currentIndex, showPlayList, currentSong } =
    useSelector((state) => state.player);
  const dispatch = useDispatch();

  const toggleFullScreen = useCallback(
    (params) => {
      dispatch(actionTypes.toggleFullScreen(params));
    },
    [dispatch],
  );

  return (
    <div>
      <MiniPlayer song={currentSong} fullScreen={fullScreen} toggleFullScreen={toggleFullScreen}></MiniPlayer>
      <NormalPlayer song={currentSong} fullScreen={fullScreen} toggleFullScreen={toggleFullScreen}></NormalPlayer>
    </div>
  );
}

export default React.memo(Player);
