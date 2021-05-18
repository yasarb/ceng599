import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { togglePlay } from './Player.slice';
import './Player.scss';

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
