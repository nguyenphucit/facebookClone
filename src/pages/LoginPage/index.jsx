import React, { useState } from "react";
import { LoginForm } from "../../components/LoginForm";
import { RegisterForm } from "../../components/RegisterForm";
import FacebookLogo from "../../image/facebook.svg";
import { LoadingPage } from "../LoadingPage";
export const LoginPage = () => {
  const [IsRegister, setIsRegister] = useState(false);
  const [Loading, setLoading] = useState(false);
  return (
    <div className="relative h-dvh w-full bg-newFeedmain">
      {Loading ? <LoadingPage /> : null}
      {IsRegister ? (
        <div className="absolute left-0 top-0 z-10 h-full w-full bg-loginMain bg-opacity-50">
          <RegisterForm setIsRegister={setIsRegister} setLoading={setLoading} />
        </div>
      ) : null}
      <div className="mb-52 flex h-4/5 px-8 pt-10 xs:flex-col ">
        <div className="ml-60 mr-5 mt-36 flex flex-1 flex-col items-start  xs:m-0 xs:mb-5">
          <div className=" xs:flex xs:w-full xs:items-center xs:justify-center">
            <img
              src={FacebookLogo}
              alt="facebook"
              className="h-28 w-full object-cover"
            />
          </div>
          <div className="px-8 pr-10 text-start text-3xl font-medium xs:text-center xs:text-xl">
            Facebook helps you connect and share with the people in your life.
          </div>
        </div>
        <div className=" flex flex-1 items-center justify-start">
          <LoginForm setIsRegister={setIsRegister} setLoading={setLoading} />
        </div>
      </div>
    </div>
  );
};
