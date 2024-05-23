import React, { useState } from "react";
import style from "./index.module.css";
import Divider from "@mui/material/Divider";
import AuthApi from "../../api/AuthApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Login } from "../../slice/AuthSlice";
import { getUserInfo } from "../../slice/UserSlice";
export const LoginForm = ({ setIsRegister }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthApi.Login({
        email: Email,
        password: Password,
      });
      if (typeof response === "object") {
        dispatch(Login(response));
        sessionStorage.setItem("access_token", response.access_token);
        delete response.access_token;
        dispatch(getUserInfo({ user: response }));
        navigate("/");
      } else alert(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-95 w-112.5 rounded-lg border-none bg-white shadow-loginForm ">
      <form className="flex h-full flex-col p-4">
        <input
          type="text"
          placeholder="Email Address or Phone number"
          className={style.inputField}
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={style.inputField}
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="mt-3 w-full rounded-lg bg-primary px-3 py-3 text-center text-2xl font-semibold text-white shadow-inner"
          onClick={(e) => handleLogin(e)}
        >
          Log in
        </button>
        <a
          className="mb-3 mt-3 text-center text-base text-primary decoration-1 hover:underline "
          href="/"
        >
          Forgetten password ?
        </a>
        <Divider />
        <button
          className="mt-3 w-fit self-center rounded-lg bg-loginBtn px-3 py-3 text-center text-lg font-semibold text-white shadow-inner hover:bg-loginBtnHover"
          onClick={(e) => {
            e.preventDefault();
            setIsRegister(true);
          }}
        >
          Create new account
        </button>
      </form>
      <div className="mt-10 text-base ">
        <a href="/" className="font-semibold hover:underline">
          Create a page
        </a>{" "}
        for a celebrity, brand or business.
      </div>
    </div>
  );
};
