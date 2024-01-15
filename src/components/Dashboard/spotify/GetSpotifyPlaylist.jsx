import React from "react";
import axios from "axios";

export default function GetSpotifyPlaylist({
  playlistID,
  setCurrPlaylistItems,
  setCurrentStep,
}) {
  async function handleClick() {
    await axios
      .get("http://localhost:3000/playlists/spotify", {
        headers: {
          id: playlistID,
          access_token: localStorage.getItem("spotifyAccessToken"),
        },
      })
      .then((res) => {
        setCurrPlaylistItems((prev) => [...prev, ...res.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>
      <button
        className="rounded-md bg-black px-3 py-2 my-20 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        onClick={async () => {
          await handleClick();
          setCurrentStep((prev) => prev + 1);
        }}
      >
        Get spotify playlist items
      </button>
    </div>
  );
}
