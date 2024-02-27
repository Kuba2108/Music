//external
import { IconButton, Input, Badge } from "@mui/material";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
//external icons
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import AudioFileIcon from "@mui/icons-material/AudioFile";
//scss
import "./MainPage.scss";
//local
import Track from "../components/track/Track";
import { AUDIO_CONTEXT } from "../context/AudioContext";



const searchMusic = (searchText, array) => {
  if (searchText.length === 0) return array;
  const lowerText = searchText.toLowerCase().trim();

  const foundTracks = array.filter((track) => {
    return (
      track.title.toLowerCase().includes(lowerText) ||
      track.artists.toLowerCase().includes(lowerText)
    );
  });

  return foundTracks;
};

const MainPage = () => {
  const [data, setData] = useState([]);
  const [text, setText] = useState("");
  const { favorits } = useContext(AUDIO_CONTEXT);
  const favLength = favorits.length;

  const showFavorits = () => {
    if(favorits.length > 0){
      setData(favorits)
    }
  };

  const fetchMusics = async () => {
    const { data } = await axios.get("/db.json");
    console.log(data);
    setData(data);
  };

  useEffect(() => {

    fetchMusics();
  }, []);

  const handleChange = ({ target }) => {
    const inputValue = target.value;
    setText(inputValue);
  };

  if (data.length === 0) return <h4>Loading...</h4>;

  return (
    <div className="search">
      <div>
        <Input
          onChange={handleChange}
          className="input"
          placeholder="Поиск треков"
        />
        <div>
          <IconButton onClick={fetchMusics}>
            <AudioFileIcon/>
          </IconButton>

          <IconButton onClick={showFavorits}>
            <Badge badgeContent={favLength} color="primary">
              <QueueMusicIcon />
            </Badge>
          </IconButton>
        </div>
      </div>
      <div className="list">
        {searchMusic(text, data).map((track) => (
          <Track key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
