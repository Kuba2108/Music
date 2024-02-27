import { createContext, useState } from "react";
export const AUDIO_CONTEXT = createContext({});

const audio = new Audio();

const AudioContext = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favorits, setFavorits] = useState([]);

  const saveToFavorits = (track) => {
    const hasInFavorits = favorits.find((el) => el?.id === track.id);
    if (hasInFavorits) {
  const newMp3 = favorits.filter(el => el.id !== track.id)
  setFavorits([...newMp3])
  return;
    }

    setFavorits([...favorits, track]);
    console.log(favorits, "---ff-");
  };

  const handleToggleAudio = (track) => {
    if (currentTrack?.id !== track.id) {
      setCurrentTrack(track);
      audio.src = track.src;
      audio.currentTime = 0;
      setIsPlaying(true);
      audio.play();
      return;
    }
    if (isPlaying === true) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const value = {
    handleToggleAudio,
    currentTrack,
    isPlaying,
    audio,
    favorits,
    saveToFavorits,
  };

  return (
    <AUDIO_CONTEXT.Provider value={value}>{children}</AUDIO_CONTEXT.Provider>
  );
};

export default AudioContext;
