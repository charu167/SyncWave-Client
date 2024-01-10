import axios from "axios";
import React, { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";

const default_playlist = {
  name: "Bhayankar",
  tracks: [
    "Tum Hi Ho",
    "Sunn Raha Hai",
    "Pillowtalk",
    "Way Down We Go",
    "Harleys in Hawaii",
  ],
};

export default function Dashboard() {
  const [currPlaylist, setCurrPLaylist] = useState("");
  const [tracks, setTracks] = useState([]);

  async function createPlaylist() {
    await axios
      .post(
        `https://api.spotify.com/v1/users/${localStorage.getItem(
          "spotifyUserId"
        )}/playlists`,
        JSON.stringify({
          name: default_playlist.name,
        }),
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("spotifyAuthToken"),
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("Playlist Created");

        setCurrPLaylist(res.data.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function searchTrack(track) {
    await axios
      .get(`https://api.spotify.com/v1/search`, {
        params: {
          q: track,
          type: "track",
          limit: 5,
        },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("spotifyAuthToken"),
        },
      })
      .then(async (res) => {
        setTracks((prev) => [
          ...prev,
          `spotify:track:${res.data.tracks.items[0].id}`,
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function addTrack() {
    await axios
      .post(
        `https://api.spotify.com/v1/playlists/${currPlaylist}/tracks`,
        JSON.stringify({
          uris: tracks,
        }),
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("spotifyAuthToken"),
          },
        }
      )
      .then((res1) => {
        // console.log(res1.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  console.log(tracks);

  return (
    <div>
      <h1>Dashboard</h1>

      <div>
        <h1>Playlist</h1>
        <input type="text" placeholder="Paste the Yt Music link here" />
        <br />
        <br />
        <br />
        <button onClick={createPlaylist}>Create Spotify Playlist</button>
        <br />
        <br />
        <br />
        <button
          onClick={async () => {
            for (let i = 0; i < default_playlist.tracks.length; i++) {
              await searchTrack(default_playlist.tracks[i]);
            }
          }}
        >
          Search Tracks
        </button>
        <br />
        <br />
        <br />
        <br />
        <button onClick={addTrack}>Add Tracks</button>
        <br />
      </div>
      <br />
    </div>
  );
}
