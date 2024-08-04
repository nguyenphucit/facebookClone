import React from "react";
import style from "./index.module.css";
import Divider from "@mui/material/Divider";
import AuthApi from "../../api/AuthApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Login } from "../../slice/AuthSlice";
import { getUserInfo } from "../../slice/UserSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../../validationSchema/loginValidation";
export const LoginForm = ({ setIsRegister }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [Email, setEmail] = useState("");
  // const [Password, setPassword] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await AuthApi.Login({
        email: data.email,
        password: data.password,
      });
      if (response.statusCode === 201) {
        dispatch(Login(response.data));
        sessionStorage.setItem("access_token", response.data.access_token);
        delete response.data.access_token;
        dispatch(getUserInfo({ user: response.data }));
        navigate("/");
      } else alert(response.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-95 w-112.5 rounded-lg border-none bg-white shadow-loginForm ">
      <form
        className="flex h-full flex-col p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="Email Address or Phone number"
          {...register("email", { defaultValue: "" })}
          className={style.inputField}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register("password", { defaultValue: "" })}
          className={style.inputField}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}

        <button
          type="submit"
          className="mt-3 w-full rounded-lg bg-primary px-3 py-3 text-center text-2xl font-semibold text-white shadow-inner"
        >
          Log in
        </button>

        <a
          className="mb-3 mt-3 text-center text-base text-primary decoration-1 hover:underline"
          href="/"
        >
          Forgetten password ?
        </a>

        <Divider />

        <button
          type="button"
          className="mt-3 w-fit self-center rounded-lg bg-loginBtn px-3 py-3 text-center text-lg font-semibold text-white shadow-inner hover:bg-loginBtnHover"
          onClick={() => setIsRegister(true)}
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
