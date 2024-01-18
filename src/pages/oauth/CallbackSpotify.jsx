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
        code: code,
      })
      .then(async (res) => {
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
    async function auth() {
      setTimeout(() => {
        setCode(queryParams.get("code"));
        console.log("code: ", code);
      }, 500);

      setTimeout(() => {
        exchangeCode();
      }, 1000);
    }
    auth();
  }, [queryParams]);

  return (
    <div>
      <h1>{code}</h1>
    </div>
  );
}
