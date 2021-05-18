import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
import './Player.scss';
import { useDispatch, useSelector } from 'react-redux';
import { togglePlay } from './Player.slice';

const Player = () => {
  const dispatch = useDispatch();
  const { playing } = useSelector(state => state.player);

  const togglePlayStatus = () => {
    dispatch(togglePlay());
  };

  return (
    <div className="player-container">
      {
        playing ? (
          <button class="btn btn-playing" disabled={playing}>
            Playing
          </button>
        ) : (
          <button class="btn btn-play" onClick={togglePlayStatus}>
            <FontAwesomeIcon icon={faPlay} />
            Play
          </button>
        )
      }
      
    </div>
  );
}

export default Player;
