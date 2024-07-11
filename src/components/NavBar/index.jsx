import React, { useState } from "react";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Apps,
  Notifications,
  Search,
  Storefront,
  Home,
  OndemandVideo,
  VideogameAssetOutlined,
} from "@mui/icons-material";
import facebookLogo from "../../image/facebookLogo.png";
import noAvatar from "../../image/noAvatar.png";
import MessengerImage from "../../image/messenger.png";
import style from "./index.module.css";
import { SettingForm } from "../SettingForm";
import { NotificationForm } from "../NotificationForm";
import NotificationApi from "../../api/NotificationApi";
import { getAllNotifications } from "../../slice/UserSlice";
// import { getAllNotifications } from "../../slice/UserSlice";

const LeftNav = () => {
  const navigate = useNavigate();
  const handleSearch = async (e) => {
    if (e.key === "Enter") navigate(`/search?q=${e.target.value}`);
  };

  return (
    <div className="flex flex-1 cursor-pointer items-center justify-start">
      <img
        src={facebookLogo}
        alt="facebook logo"
        className="mr-3 h-11 w-11 object-center"
        onClick={() => navigate("/")}
      />
      <div className="box-content flex h-10 w-60 items-center rounded-3xl bg-newFeedmain px-1 pr-7 xs:w-fit">
        <Search
          sx={{ marginLeft: "10px", fontSize: "24px", color: "#65676B" }}
        />
        <input
          type="text"
          className="ml-2 w-full flex-1 bg-transparent text-[17px] placeholder-[#65676B] outline-none"
          placeholder="Tìm kiếm trên Facebook"
          onKeyDown={handleSearch}
        />
      </div>
    </div>
  );
};

const MiddleNav = () => {
  return (
    <div className="mb-3 flex h-full flex-1 items-center xs:hidden">
      <div className={style.topMenuIcon}>
        <Home fontSize="base" sx={{ color: "#65676b" }} />
      </div>
      <div className={style.topMenuIcon}>
        <OndemandVideo fontSize="base" sx={{ color: "#65676b" }} />
      </div>
      <div className={style.topMenuIcon}>
        <Storefront fontSize="base" sx={{ color: "#65676b" }} />
      </div>
      <div className={style.topMenuIcon}>
        <VideogameAssetOutlined fontSize="base" sx={{ color: "#65676b" }} />
      </div>
    </div>
  );
};

const RightNav = () => {
  const { userInfo, notifications } = useSelector((state) => state.user);
  const [navSetting, setNavSetting] = useState("");
  const navFunction = ["notification", "message", "setting"];
  const dispatch = useDispatch();
  const handleNotificationClick = async () => {
    const response = await NotificationApi.updateNotificationStatus(
      userInfo.id,
    );
    if (response.statusCode === 200) {
      const newNotification = await NotificationApi.getNotificationByUserId(
        userInfo.id,
      );
      if (newNotification.statusCode === 200)
        dispatch(getAllNotifications({ notifications: newNotification.data }));
    }
    setNavSetting((prev) => (prev === navFunction[0] ? "" : navFunction[0]));
  };
  return (
    <div className="flex-1 items-center justify-center">
      <ul className="flex items-center justify-end gap-5 xs:gap-1">
        <li>
          <span className={style.topRightMenuIcon}>
            <Apps sx={{ fontSize: "24px" }} />
          </span>
        </li>
        <li>
          <span className={`${style.topRightMenuIcon} relative`}>
            <img
              src={MessengerImage}
              alt="messenger"
              width={24}
              height={24}
              className="absolute bottom-0 left-0 right-0 top-0 m-auto"
            />
          </span>
        </li>
        <li>
          <span
            className={style.topRightMenuIcon}
            onClick={handleNotificationClick}
          >
            <Notifications sx={{ fontSize: "24px" }} />
            {notifications.filter((item) => item.status === "UNSEEN").length >
              0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#e41e3f] text-sm text-white">
                {
                  notifications.filter((item) => item.status === "UNSEEN")
                    .length
                }
              </span>
            )}
          </span>
        </li>
        <li className="relative">
          {navSetting === navFunction[0] && <NotificationForm />}
          {navSetting === navFunction[2] && <SettingForm />}
          <span
            className={`${style.topRightMenuIcon} relative`}
            onClick={() =>
              setNavSetting((prev) =>
                prev === navFunction[2] ? "" : navFunction[2],
              )
            }
          >
            <Avatar
              src={userInfo?.avatar || noAvatar}
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
    <div className="fixed z-[100] flex h-16 w-full justify-between bg-white px-5 py-2 shadow-navBar">
      <LeftNav />
      <MiddleNav />
      <RightNav />
    </div>
  );
};
