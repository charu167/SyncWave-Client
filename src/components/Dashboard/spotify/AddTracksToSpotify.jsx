import React from "react";
import axios from "axios";

export default function AddTracksToSpotify({ createdPlaylitID, trackIDs }) {
  async function handleClick() {
    await axios
      .post("https://syn-wave-server.vercel.app/playlists/spotify/addTracks", {
        uris: trackIDs,
        playlistID: createdPlaylitID,
        access_token: localStorage.getItem("spotifyAccessToken"),
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
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
