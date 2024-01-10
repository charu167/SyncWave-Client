import React from "react";
import SpotifyLogin from "../components/SpotifyLogin";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className=" h-full flex flex-col w-full justify-center align-middle bg-slate-900 text-white">
      <h3>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At ad doloribus
        dolores id a placeat eaque cupiditate quis unde praesentium,
        voluptatibus rem sequi in distinctio ut, odit, minus deleniti odio
        repudiandae nobis deserunt cum optio incidunt. Perspiciatis, iste, at
        tenetur corrupti similique, iure harum qui repudiandae molestias ab
        neque dolorem?
      </h3>
      <button
        onClick={() => {
          navigate("/oauth");
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-2/4 rounded  "
      >
        Try Now!
      </button>
      {/* <SpotifyLogin /> */}
    </div>
  );
}
