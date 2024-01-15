import { useState } from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Importing Components
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

import CallbackSpotify from "./pages/oauth/CallbackSpotify";
import CallbackGoogle from "./pages/oauth/CallbackGoogle";

import OAuthSpotify from "./pages/oauth/OAuthSpotify";
import OAuthGoogle from "./pages/oauth/OAuthGoogle";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/callbackspotify" element={<CallbackSpotify />} />
          <Route path="/callbackgoogle" element={<CallbackGoogle />} />

          <Route path="/oauthspotify" element={<OAuthSpotify />} />
          <Route path="/oauthgoogle" element={<OAuthGoogle />} />

          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
