import React from "react";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8  ">
        <div className="mx-auto w-full text-center md:max-w-2xl">
          <h2 className="text-3xl w-full font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Sync Playlists, Across Platforms
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600">
            Struggling to share playlists with friends on different music
            services? Our web app solves this. Seamlessly transfer and sync your
            playlists across platforms like YouTube Music and Spotify. Perfect
            for those who enjoy diverse music experiences, it bridges the gap,
            ensuring you and your friends stay connected musically, regardless
            of the service you prefer. Simple, efficient, and ready to harmonize
            your music world.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="mx-auto mt-12 max-w-xl"
        >
          <div className="flex justify-center">
            <Link to="/dashboard">
              <button className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                Try Now!
              </button>
            </Link>
          </div>
        </form>

        <div className="mt-8 flex items-center justify-center px-8 sm:px-0">
          <Lock className="h-4 w-4 text-gray-600" />
          <span className="ml-2 text-sm text-gray-600">
            Your data is complely secured with us. We don&apos;t share with
            anyone.
          </span>
        </div>
        <br />
      </div>
    </section>
  );
}
