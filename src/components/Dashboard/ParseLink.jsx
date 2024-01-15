import React from "react";
import { ArrowRight } from "lucide-react";

export default function ParseLink({
  setService,
  setPLaylistID,
  service,
  setCurrentStep,
}) {
  function parseLink(e) {
    if (
      e.target.value.includes("https://music.youtube.com/playlist") ||
      e.target.value.includes("https://www.youtube.com/playlist")
    ) {
      setService("youtube");
      setPLaylistID(e.target.value.split("list=")[1]);
    } else if (e.target.value.includes("https://open.spotify.com/playlist")) {
      setService("spotify");
      setPLaylistID(e.target.value.split("playlist/")[1]);
    } else {
      setService(null);
      setPLaylistID(null);
    }
  }

  return (
    <div className="w-3/4  my-10 items-center flex flex-col">
      <input
        className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
        type="email"
        placeholder="Paste the playlist link here"
        onChange={parseLink}
        id="default-input"
      ></input>

      <button
        onClick={() => {
          setCurrentStep((prev) => prev + 1);
        }}
        type="button"
        className="my-10 inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-black/80"
      >
        {!service && "Paste a valid link above before proceeding"}
        {service && (
          <>
            Proceed with the {service.toLocaleUpperCase()} playlist
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </button>
    </div>
  );
}
