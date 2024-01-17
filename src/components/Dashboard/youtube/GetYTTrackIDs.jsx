import React from "react";
import axios from "axios";

export default function GetYTTrackIDs({
  currPlaylistItems,
  setTrackIDs,
  setCurrentStep,
}) {
  async function handleClick() {
    for (let i = 0; i < currPlaylistItems.length; i++) {
      await axios
        .get("/api/playlists/youtube/search", {
          params: {
            q: currPlaylistItems[i],
          },
        })
        .then((res) => {
          console.log(res.data)
          setTrackIDs((prev) => [...prev, res.data]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <>
      <div>
        <button
          className="rounded-md bg-black px-3 py-2 my-20 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          onClick={async () => {
            await handleClick();
            setCurrentStep((prev) => prev + 1);
          }}
        >
          Get Youtube Track IDs
        </button>
      </div>
    </>
  );
}
