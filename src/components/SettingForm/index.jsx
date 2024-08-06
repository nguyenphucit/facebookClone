import React from "react";
import noAvatar from "../../image/noAvatar.png";
import { useSelector } from "react-redux";
import { Divider } from "@mui/material";
import style from "./style.module.css";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import FeedbackIcon from "@mui/icons-material/Feedback";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
export const SettingForm = () => {
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      sessionStorage.removeItem("access_token");
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="absolute -left-80 top-12 z-[2000] flex h-112.5 w-90 flex-col items-center rounded-lg bg-white px-2 py-5 shadow-settingForm">
      <div className="h-28 w-9/10 rounded-md  p-2 shadow-settingForm ">
        <div
          className="mb-1 flex w-full cursor-pointer items-center gap-2 p-3 text-base font-bold hover:hover:bg-iconHover"
          onClick={() => navigate(`/profile/${userInfo.id}`)}
        >
          <img
            src={userInfo?.avatar ?? noAvatar}
            alt="avatar"
            className=" h-10 w-10 rounded-full shadow-inner "
          />
          {userInfo.firstname + " " + userInfo.surname}
        </div>
        <Divider sx={{ borderBottomWidth: 2 }} />
        <div className="r mt-1 flex cursor-pointer items-start rounded-lg p-1 text-sm hover:bg-iconHover">
          <a href="/" className="font-medium text-primary">
            Xem tất cả trang cá nhân
          </a>
        </div>
      </div>
      <ul className="mt-3 w-full">
        <li className={style.settingFunctions}>
          <span className={`${style.settingIcons}`}>
            <SettingsIcon sx={{ fontSize: "24px" }} />
          </span>
          Cài đặt & và quyền riêng tư
        </li>
        <li className={style.settingFunctions}>
          <span className={`${style.settingIcons}`}>
            <HelpIcon sx={{ fontSize: "24px" }} />
          </span>
          Trơ giúp & và hỗ trợ
        </li>
        <li className={style.settingFunctions}>
          <span className={`${style.settingIcons}`}>
            <DarkModeIcon sx={{ fontSize: "24px" }} />
          </span>
          Màn hình & và trợ năng
        </li>
        <li className={style.settingFunctions}>
          <span className={`${style.settingIcons}`}>
            <FeedbackIcon sx={{ fontSize: "24px" }} />
          </span>
          Đóng góp ý kiến
        </li>
        <li className={style.settingFunctions} onClick={() => handleLogout()}>
          <span className={`${style.settingIcons}`}>
            <LogoutIcon sx={{ fontSize: "24px" }} />
          </span>
          Đăng xuất
        </li>
      </ul>
    </div>
  );
};
