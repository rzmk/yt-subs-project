import "./App.css";
import videojs from "video.js";
import VideoPage from "./pages/VideoPage";
import { useEffect, useState } from "react";
import captions_list from "./captions/captions.js";

function App() {
  const [currentID, setCurrentID] = useState("-JTq1BFBwmo");

  useEffect(() => {
    // Default video displaying first
    fetch(
      `https://noembed.com/embed?dataType=json&url=https://www.youtube.com/watch?v=-JTq1BFBwmo`
    )
      .then((res) => res.json())
      .then((data) => {
        document.querySelector("#title").textContent = data.title;
      });
    // Add info for each captioned video in the selection grid
    captions_list.forEach((caption) => {
      fetch(
        `https://noembed.com/embed?dataType=json&url=https://www.youtube.com/watch?v=${caption}`
      )
        .then((res) => res.json())
        .then((data) => {
          document.querySelector(`#${caption}-title`).textContent = data.title;
          document.querySelector(`#${caption}-thumbnail`).src =
            data.thumbnail_url;
        });
    });
  }, []);

  const handleClick = (captionID) => {
    if (currentID === captionID) {
      return;
    }
    setCurrentID(captionID);
    fetch(
      `https://noembed.com/embed?dataType=json&url=https://www.youtube.com/watch?v=${captionID}`
    )
      .then((res) => res.json())
      .then((data) => {
        document.querySelector("#title").textContent = data.title;
      });
    if (videojs.getAllPlayers().length > 0) {
      videojs.getAllPlayers().forEach((player) => {
        player.src({
          type: "video/youtube",
          src: `https://www.youtube.com/watch?v=${captionID}`,
        });
        // Update video thumbnail
        const thumbnail = document.querySelector(".vjs-poster");
        thumbnail.style = `background-image: url(https://img.youtube.com/vi/${captionID}/0.jpg)`;
        // Remove current text tracks
        player.textTracks().removeTrack(player.textTracks()[0]);
        // Add new text track
        const track = player.addRemoteTextTrack(
          {
            kind: "captions",
            src: require(`./captions/${captionID}.vtt`),
            srclang: "en",
            label: "English",
            mode: "showing",
          },
          false
        );
        track.mode = "showing";
        // Load player with new source
        player.load();
      });
    }
  };

  return (
    <div className="App">
      <VideoPage />
      <h1 style={{ marginTop: "2rem" }}>Select a Subtitled Video</h1>
      <div class="grid container" style={{ margin: "auto" }}>
        {captions_list.map((caption) => (
          <div>
            <article>
              <div
                style={{ margin: "-40px", cursor: "pointer" }}
                onClick={() => handleClick(caption)}
              >
                <header
                  id={`${caption}-title`}
                  style={{ padding: "1rem" }}
                ></header>
                <img id={`${caption}-thumbnail`} src="" alt="Thumbnail" />
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
