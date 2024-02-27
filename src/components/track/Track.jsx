import "./Track.scss";
import { IconButton } from "@mui/material";
import { PlayArrow, Pause } from "@mui/icons-material";
import { useContext, useState } from "react";
import { AUDIO_CONTEXT } from "../../context/AudioContext";
import { formatToMMSS } from "../../helpers/formatToMMSS";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from '@mui/icons-material/Bookmark';

const Track = ({ track }) => {
  const [isFav, setIsFav] = useState(false)   
  
  const { preview, title, artists, duration } = track;
  const { 
    handleToggleAudio, 
    isPlaying, 
    currentTrack,
    saveToFavorits,
    favorits 
  } =
    useContext(AUDIO_CONTEXT);

  const isCurrentPlay = currentTrack?.id === track.id;
  const musicTime = formatToMMSS(duration);


  let className;
  if (isCurrentPlay) {
    className += " playing";
  }

  return (
    <div className={"track ${className}"}>
      <IconButton onClick={() => handleToggleAudio(track)}>
        {isPlaying && isCurrentPlay ? <Pause /> : <PlayArrow />}
      </IconButton>
      <img className="preview" src={preview} alt="" />
      <div className="credits">
        <b>{title}</b>
        <p>{artists}</p>
      </div>
      <div className="time">
        <p>{musicTime}</p>
        <IconButton onClick={() => {
          saveToFavorits(track)
          setIsFav((isFav) => isFav = !isFav)
        }}>
          {isFav ? <BookmarkIcon/> : <BookmarkBorderIcon />}
        </IconButton>
      </div>
    </div>
  );
};

export default Track;
