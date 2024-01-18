import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CallbackGoogle() {
  const navigate = useNavigate();
  const [code, setCode] = useState(null);
  const queryParams = new URLSearchParams(window.location.search);

  async function exchangeCode() {
    await axios
      .post("/api/auth/google", {
        code: localStorage.getItem("code"),
      })
      .then((res) => {
        localStorage.setItem("googleAccessToken", res.data.googleAccessToken);
        if (localStorage.getItem("googleAccessToken") !== undefined) {
          navigate("/dashboard");
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

  return <div></div>;
}
