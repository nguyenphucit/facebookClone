import React, { useState, useEffect } from "react";
import AppsIcon from "@mui/icons-material/Apps";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import facebookLogo from "../../image/facebookLogo.png";
import noAvatar from "../../image/noAvatar.png";
import StorefrontIcon from "@mui/icons-material/Storefront";
import HomeIcon from "@mui/icons-material/Home";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import VideogameAssetOutlinedIcon from "@mui/icons-material/VideogameAssetOutlined";
import MessengerImage from "../../image/messenger.png";
import style from "./index.module.css";
import { Avatar } from "@mui/material";
import { SettingForm } from "../SettingForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { NotificationForm } from "../NotificationForm";
import NotificationApi from "../../api/NotificationApi";
const LeftNav = () => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-1 cursor-pointer items-center justify-start"
      onClick={() => navigate("/")}
    >
      <img
        src={facebookLogo}
        alt="facebook logo"
        className="mr-3 h-11 w-11 object-center"
      />
      <div className="box-content flex h-10  w-60 items-center rounded-3xl border-none bg-newFeedmain px-1 pr-7 outline-none  placeholder:text-[14px] xs:w-fit">
        <SearchIcon
          sx={{ marginLeft: "10px", fontSize: "24px", color: "#65676B" }}
        />
        <input
          type="text"
          className="ml-2 w-full flex-1 border-none bg-transparent text-[17px] text-base  placeholder-[#65676B] outline-none"
          placeholder="Tìm kiếm trên Facebook"
        />
      </div>
    </div>
  );
};
const MiddleNav = () => {
  return (
    <div className="mb-3 flex h-full flex-1 items-center xs:hidden ">
      <div className={style.topMenuIcon}>
        <HomeIcon fontSize="base" sx={{ color: "#65676b" }} />
      </div>
      <div className={style.topMenuIcon}>
        <OndemandVideoIcon fontSize="base" sx={{ color: "#65676b" }} />
      </div>
      <div className={style.topMenuIcon}>
        <StorefrontIcon fontSize="base" sx={{ color: "#65676b" }} />
      </div>
      <div className={style.topMenuIcon}>
        <VideogameAssetOutlinedIcon fontSize="base" sx={{ color: "#65676b" }} />
      </div>
    </div>
  );
};
const RightNav = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [NavSetting, SetNavSetting] = useState("");
  const navFunction = ["notification", "message", "setting"];
  const { notifications } = useSelector((state) => state.user);
  useEffect(() => {}, [notifications]);

  return (
    <div className="flex-1 items-center justify-center">
      <ul className="flex items-center justify-end gap-5 xs:gap-1">
        <li>
          <span className={`${style.topRightMenuIcon}`}>
            <AppsIcon sx={{ fontSize: "24px" }} />
          </span>
        </li>
        <li>
          <span className={`${style.topRightMenuIcon} relative`}>
            <img
              src={MessengerImage}
              alt="messenger"
              width={24}
              height={24}
              className="absolute bottom-0 left-0 right-0 top-0 mb-auto ml-auto mr-auto mt-auto "
            />
          </span>
        </li>
        <li>
          <span
            className={`${style.topRightMenuIcon}`}
            onClick={async () => {
              await NotificationApi.updateNotificationStatus(userInfo.id);
              SetNavSetting((prev) => {
                return prev === navFunction[0] ? null : navFunction[0];
              });
            }}
          >
            <NotificationsIcon sx={{ fontSize: "24px" }} />
            {notifications.filter((item) => item.status === "UNSEEN").length ===
            0 ? null : (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-[50%] bg-[#e41e3f] text-sm text-white">
                {
                  notifications.filter((item) => item.status === "UNSEEN")
                    .length
                }
              </span>
            )}
          </span>
        </li>
        <li className="relative">
          {NavSetting === navFunction[0] ? (
            <NotificationForm />
          ) : NavSetting === navFunction[2] ? (
            <SettingForm />
          ) : null}
          <span
            className={`${style.topRightMenuIcon} relative`}
            onClick={() =>
              SetNavSetting((prev) => {
                return prev === navFunction[2] ? null : navFunction[2];
              })
            }
          >
            <Avatar
              src={userInfo?.avatar ? userInfo?.avatar : noAvatar}
              className="hover:brightness-95"
              sx={{
                position: "absolute",
                left: "0",
                right: "0",
                marginLeft: "auto",
                marginRight: "auto",
                width: "100%",
                height: "100%",
              }}
            />
          </span>
        </li>
      </ul>
    </div>
  );
};
export const NavBar = () => {
  return (
    <div className="fixed z-[100] flex h-16 w-full justify-between bg-white px-5 py-2 shadow-navBar ">
      <LeftNav />
      {/* <div
        className="flex flex-1 cursor-pointer items-center justify-start"
        onClick={() => navigate("/")}
      >
        <img
          src={facebookLogo}
          alt="facebook logo"
          className="mr-3 h-11 w-11 object-center"
        />
        <div className="box-content flex h-10  w-60 items-center rounded-3xl border-none bg-newFeedmain px-1 pr-7 outline-none  placeholder:text-[14px]">
          <SearchIcon
            sx={{ marginLeft: "10px", fontSize: "24px", color: "#65676B" }}
          />
          <input
            type="text"
            className="ml-2 w-full flex-1 border-none bg-transparent text-[17px] text-base  placeholder-[#65676B] outline-none"
            placeholder="Tìm kiếm trên Facebook"
          />
        </div>
      </div> */}
      <MiddleNav />
      <RightNav />
    </div>
  );
};
