import React from "react";

const spotifyLink =
  "https://accounts.spotify.com/authorize?client_id=3a95b7c9fc564f5fa392e6df14e505b6&response_type=code&redirect_uri=http://localhost:5173/callback&state=abcdefghijklmnop&scope=user-read-private user-read-email playlist-modify-public playlist-modify-private playlist-read-collaborative&show_dialog=true";

export default function OAuth() {
  return (
    <div className="w-full h-full">
      <div>
        Because we use APIs from both Spotify and Youtube, users are required to
        sign in to both of these services. So, let's do it...
      </div>
      <a href={spotifyLink}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-2/4 rounded  ">
          Login with Spotify
        </button>
      </a>
    </div>
  );
}
