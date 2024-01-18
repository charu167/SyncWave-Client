import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//IMPORTING COMPONENTS

//Importing UI components
import Stepper from "../components/Stepper";
import ParseLink from "../components/Dashboard/ParseLink";

//Spotify -> Youtube Flow Components
import GetSpotifyPlaylist from "../components/Dashboard/spotify/GetSpotifyPlaylist";
import GetYTTrackIDs from "../components/Dashboard/youtube/GetYTTrackIDs";
import CreateYTPlaylist from "../components/Dashboard/youtube/CreateYTPlaylist";
import AddTracksToYT from "../components/Dashboard/youtube/AddTracksToYT";

//Youtube -> Spotify Flow Components
import GetYTPlaylist from "../components/Dashboard/youtube/GetYTPlaylist";
import GetSpotifyTrackIDs from "../components/Dashboard/spotify/GetSpotifyTrackIDs";
import CreateSpotifyPlaylist from "../components/Dashboard/spotify/CreateSpotifyPlaylist";
import AddTracksToSpotify from "../components/Dashboard/spotify/AddTracksToSpotify";

export default function Dashboard() {
  const navigate = useNavigate();

  //Login Check and Token Refresh
  useEffect(() => {
    async function loginCheck() {
      if (
        !localStorage.getItem("googleAccessToken") ||
        !localStorage.getItem("spotifyAccessToken")
      ) {
        navigate("/oauthspotify");
      } else {
        //Checking validity of spotify access token
        await axios
          .get("https://api.spotify.com/v1/me", {
            headers: {
              Authorization:
                "Bearer " + localStorage.getItem("spotifyAccessToken"),
            },
          })
          .then((res) => {
            if (res.data) {
              console.log("spotify access token is valid");
            }
          })
          .catch(async (error) => {
            //Refresh spotify access token
            await axios
              .post("https://syn-wave-server.vercel.app/auth/refreshSpotify", {
                spotifyID: localStorage.getItem("spotifyID"),
              })
              .then((res) => {
                localStorage.setItem(
                  "spotifyAccessToken",
                  res.data.access_token
                );
              })
              .catch((error) => {
                console.log(
                  "error while refreshing spotify access token: ",
                  error
                );
              });
          });

        //Checking validity of google access token
        await axios
          .get("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: {
              Authorization:
                "Bearer " + localStorage.getItem("googleAccessToken"),
            },
          })
          .then((res) => {
            if (res.data) {
              console.log("Google access token is valid");
            }
          })
          .catch(async (error) => {
            //refresh spotify access token
            await axios
              .post("https://syn-wave-server.vercel.app/auth/refreshYoutube", {
                spotifyID: localStorage.getItem("spotifyID"),
              })
              .then((res) => {
                localStorage.setItem(
                  "googleAccessToken",
                  res.data.access_token
                );
              })
              .catch((error) => {
                console.log(
                  "error while refreshing google access token: ",
                  error
                );
              });
          });
      }
    }

    loginCheck();
  }, []);
  //Login Check and Token Refresh

  const [service, setService] = useState(null);
  const [playlistID, setPLaylistID] = useState(null);
  const [currPlaylistItems, setCurrPlaylistItems] = useState([]);
  const [trackIDs, setTrackIDs] = useState([]);
  const [createdPlaylitID, setCreatedPlaylitID] = useState(null);

  console.log("currPlaylistItems: ", currPlaylistItems);

  //Stepper control
  const [currentStep, setCurrentStep] = useState(0);

  const step0 = {
    1: (
      <ParseLink
        setService={setService}
        setPLaylistID={setPLaylistID}
        service={service}
        setCurrentStep={setCurrentStep}
      />
    ),
  };

  //Youtube -> Spotify steps
  const steps1 = {
    2: (
      <GetYTPlaylist
        playlistID={playlistID}
        setCurrPlaylistItems={setCurrPlaylistItems}
        setCurrentStep={setCurrentStep}
      />
    ),
    3: (
      <GetSpotifyTrackIDs
        currPlaylistItems={currPlaylistItems}
        setTrackIDs={setTrackIDs}
        setCurrentStep={setCurrentStep}
      />
    ),
    4: (
      <CreateSpotifyPlaylist
        setCurrentStep={setCurrentStep}
        setCreatedPlaylitID={setCreatedPlaylitID}
      />
    ),
    5: (
      <AddTracksToSpotify
        createdPlaylitID={createdPlaylitID}
        trackIDs={trackIDs}
        setCurrentStep={setCurrentStep}
      />
    ),
  };

  //Spotify -> Youtube steps
  const setps2 = {
    2: (
      <GetSpotifyPlaylist
        playlistID={playlistID}
        setCurrPlaylistItems={setCurrPlaylistItems}
        setCurrentStep={setCurrentStep}
      />
    ),
    3: (
      <GetYTTrackIDs
        currPlaylistItems={currPlaylistItems}
        setTrackIDs={setTrackIDs}
        setCurrentStep={setCurrentStep}
      />
    ),
    4: (
      <CreateYTPlaylist
        setCurrentStep={setCurrentStep}
        setCreatedPlaylitID={setCreatedPlaylitID}
      />
    ),
    5: (
      <AddTracksToYT
        createdPlaylitID={createdPlaylitID}
        trackIDs={trackIDs}
        setCurrentStep={setCurrentStep}
      />
    ),
  };

  // console.log(trackIDs)
  return (
    <div className="w-full mx-auto">
      <Stepper
        steps={service === "youtube" ? steps1 : setps2}
        step0={step0}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </div>
  );
}
