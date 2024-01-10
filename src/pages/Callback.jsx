import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Callback() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    async function getTokens() {
      const queryParams = new URLSearchParams(window.location.search);
      const code = queryParams.get("code");
      if (code) {
        await axios
          .post(
            "https://accounts.spotify.com/api/token",
            {
              grant_type: "authorization_code",
              code: code,
              redirect_uri: "http://localhost:5173/callback",
            },
            {
              headers: {
                Authorization:
                  "Basic M2E5NWI3YzlmYzU2NGY1ZmEzOTJlNmRmMTRlNTA1YjY6M2RjMWRlNzNjYjJhNDc1NDg2MzI5ZTU3ZTkzYTRjZTY=",
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          )
          .then(async (res) => {
            const authToken = res.data.access_token;
            const refresh_token = res.data.refresh_token;

            await axios
              .get("https://api.spotify.com/v1/me", {
                headers: {
                  Authorization: "Bearer " + authToken,
                },
              })
              .then((res) => {
                localStorage.setItem("spotifyUserId", res.data.id);
              })
              .catch((error) => {
                console.log(error);
              });
            // console.log(res.data);

            localStorage.setItem("spotifyAuthToken", authToken);
            localStorage.setItem("spotifyRefreshToken", refresh_token);
          })
          .catch((error) => {
            console.log(error);
          });

        navigate("/dashboard");
      } else {
        console.log("No code found in url");
      }
    }
    getTokens();
  }, [location, navigate]);

  return <div>Callback</div>;
}
