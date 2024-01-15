import React, { useState } from "react";
import axios from "axios";

export default function CreateSpotifyPlaylist({
  setCreatedPlaylitID,
  setCurrentStep,
}) {
  const [name, setName] = useState(null);

  async function handleClick() {
    await axios
      .post("http://localhost:3000/playlists/spotify/create", {
        access_token: localStorage.getItem("spotifyAccessToken"),
        name: name,
        spotifyID: localStorage.getItem("spotifyID"),
      })
      .then((res) => {
        setCreatedPlaylitID(res.data.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>
      <input
        className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
        placeholder="my coolest playlist"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      <button
        onClick={() => {
          handleClick();
          setCurrentStep((prev) => prev + 1);
        }}
        type="button"
        className="my-10 inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-black/80"
      >
        Create Playlist on Spotify
      </button>
    </div>
  );
}
