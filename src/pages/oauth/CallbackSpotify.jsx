import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CallbackSpotify() {
  const navigate = useNavigate();
  const [code, setCode] = useState(null);
  const queryParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    function getCode() {
      if (queryParams.get("code") !== undefined) {
        setCode(queryParams.get("code"));
      }
    }

    getCode();
  }, [queryParams]);

  async function exchangeCode() {
    await axios
      .post("http://localhost:3000/auth/spotify", {
        code: code,
      })
      .then(async (res) => {
        localStorage.setItem("spotifyAccessToken", res.data.spotifyAccessToken);

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
      exchangeCode();
    }, 500);
  });

  return <div></div>;
}
