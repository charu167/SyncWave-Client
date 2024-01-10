import React from "react";
import { Link } from "react-router-dom";

export default function SpotifyLogin() {
  const spotifyLink =
    "https://accounts.spotify.com/authorize?client_id=3a95b7c9fc564f5fa392e6df14e505b6&response_type=code&redirect_uri=http://localhost:5173/callback&state=abcdefghijklmnop&scope=user-read-private user-read-email playlist-modify-public playlist-modify-private playlist-read-collaborative&show_dialog=true";

  return (
    <div>
      <a href={spotifyLink}>Login with Spotify</a>
      <br />
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
}
