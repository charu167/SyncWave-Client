import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CallbackGoogle() {
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
      .post("http://localhost:3000/auth/google", {
        code: code,
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
      exchangeCode();
    }, 500);
  });

  return <div></div>;
}
