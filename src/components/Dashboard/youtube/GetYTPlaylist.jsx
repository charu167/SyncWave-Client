import React from "react";
import axios from "axios";

export default function GetYTPlaylist({
  playlistID,
  setCurrPlaylistItems,
  setCurrentStep,
}) {
  async function getYoutubePlaylist(nextPageToken) {
    await axios
      .get("https://syn-wave-server.vercel.app/playlists/youtube", {
        headers: {
          id: playlistID,
          nextPageToken: nextPageToken,
        },
      })
      .then((res) => {
        console.log(res.data)
        setCurrPlaylistItems((prev) => [...prev, ...res.data.items]);
        if (res.data.nextPageToken) {
          getYoutubePlaylist(res.data.nextPageToken);
        } else {
          return;
        }
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
          await getYoutubePlaylist(null);
          setCurrentStep((prev) => prev + 1);
        }}
      >
        Get youtube playlist items
      </button>
    </div>
  );
}
