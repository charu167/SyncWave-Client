import React from "react";
import axios from "axios";

export default function AddTracksToYT({ createdPlaylitID, trackIDs }) {
  async function handleClick() {
    for (let i = 0; i < trackIDs.length; i++) {
      await axios
        .post("http://localhost:3000/playlists/youtube/addTracks", {
          playlistid: createdPlaylitID,
          videoid: trackIDs[i],
          access_token: localStorage.getItem("googleAccessToken"),
        })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  return (
    <div>
      <button
        className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        onClick={handleClick}
      >
        Add tracks to playlist
      </button>
    </div>
  );
}
