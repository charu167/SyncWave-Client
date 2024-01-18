import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CallbackSpotify() {
  const navigate = useNavigate();
  const [code, setCode] = useState(null);
  const queryParams = new URLSearchParams(window.location.search);

  //Exchange spotify auth code for access & refresh tokens

  async function exchangeCode() {
    //Exchange code API call to backend
    await axios
      .post("https://syn-wave-server.vercel.app/auth/spotify", {
        code: localStorage.getItem("code"),
      })
      .then(async (res) => {
        console.log("response from first request: ", res.data);
        localStorage.setItem("spotifyAccessToken", res.data.spotifyAccessToken);

        //Get spotify user details (user id)
        await axios
          .get("https://api.spotify.com/v1/me", {
            headers: {
              Authorization: "Bearer " + res.data.spotifyAccessToken,
            },
          })
          .then((res1) => {
            localStorage.setItem("spotifyID", res1.data.id);
          });

        if (localStorage.getItem("spotifyAccessToken") !== undefined) {
          navigate("/oauthgoogle");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("code", queryParams.get("code"));
    }, 500);
  }, [queryParams]);

  useEffect(() => {
    setTimeout(() => {
      exchangeCode();
    }, 6000);
  }, [code]);

  return (
    <div>
      <h1>{code}</h1>
    </div>
  );
}
