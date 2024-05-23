import React, { useState, useEffect } from "react";
import noAvatar from "../../image/noAvatar.png";
import PersonIcon from "@mui/icons-material/Person";
import MessengerImage from "../../image/messengerWithoutBG.png";
import { Divider } from "@mui/material";
import style from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { chosingImage } from "../../helper/FormDataHelper";
import UserApi from "../../api/UserApi";
import { getUserInfo, updateUserAvatar } from "../../slice/UserSlice";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
export const ProfileTopInfo = ({ userId }) => {
  const { userInfo } = useSelector((state) => state.user);
  const [userDetailInfo, setuserDetailInfo] = useState();
  const [ImageFile, setImageFile] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (ImageFile !== "") {
      handleUpdateAvatar();
    }
    // eslint-disable-next-line
  }, [ImageFile]);

  const handleUpdateAvatar = async () => {
    try {
      const formData = new FormData();
      formData.append("avatar", ImageFile);
      const response = await UserApi.UpdateAvatar(formData, userInfo.id);
      if (typeof response === "object") {
        dispatch(updateUserAvatar({ newUserInfo: response }));
        navigate(`/profile/${userInfo.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getUserInfo = async () => {
      const response = await UserApi.getUserById(userId);
      setuserDetailInfo(() => response);
    };
    if (!userDetailInfo || userDetailInfo.id !== Number.parseInt(userId))
      getUserInfo();
    // eslint-disable-next-line
  }, [userId]);
  useEffect(() => {
    const getUserInfoWhenReload = async () => {
      try {
        // Giải mã thông tin người dùng từ access_token (chuỗi JWT)
        const tokenParts = sessionStorage.getItem("access_token").split(".");
        if (tokenParts.length === 3) {
          // Giải mã base64
          const base64Url = tokenParts[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const decodedPayload = atob(base64);

          // Sử dụng TextDecoder để giải mã UTF-8
          const utf8Decoder = new TextDecoder("utf-8");
          const utf8Payload = utf8Decoder.decode(
            new Uint8Array([...decodedPayload].map((c) => c.charCodeAt(0))),
          );

          // Chuyển đổi thành đối tượng JavaScript
          if (userInfo.id === null || userInfo.id === undefined) {
            const payload = JSON.parse(utf8Payload);
            const userInfo = await UserApi.getUserById(payload.id);
            dispatch(getUserInfo({ user: userInfo }));
          }
        } else {
          console.error("Invalid access_token format");
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (_.isEmpty(userInfo)) getUserInfoWhenReload();
    // eslint-disable-next-line
  }, []);
  return (
    <div className=" mt-8 flex min-h-134 w-full flex-wrap justify-center bg-white shadow-navBar ">
      <div
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(240,242,245,1) 19%)",
        }}
        className="h-95 w-235 rounded-xl "
      ></div>
      <div className="relative flex h-32 w-235 py-3 pl-56 text-start text-3xl font-bold">
        <img
          src={userDetailInfo?.avatar ? userDetailInfo?.avatar : noAvatar}
          alt="noAvatar"
          className="absolute -top-16 left-10 mr-3 h-42 w-42 rounded-full border-4 border-white object-center"
        />
        {/* add avatar */}
        {userInfo?.id === Number.parseInt(userId) ? (
          <label
            className="hover:bg-[#D8DADF]; absolute left-40  top-14 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#e4e6eb] p-4"
            htmlFor="addAvatar"
          >
            <AddAPhotoIcon sx={{ fontSize: "24px" }} />
          </label>
        ) : null}
        <input
          type="file"
          className="hidden"
          id="addAvatar"
          onChange={(e) => chosingImage(e, setImageFile)}
        />
        {/*  */}
        <div className="flex flex-[1] flex-col gap-2">
          <p>{userDetailInfo?.firstname + " " + userDetailInfo?.surname}</p>
          <p className="text-sm text-registerLabel">
            {/* {userDetailInfo.friends.length} bạn bè */}
          </p>
        </div>
        <div className="flex flex-[1] items-center justify-center gap-3">
          <button className="flex items-center justify-center gap-2 rounded-md bg-hover px-2 py-2 text-base font-medium">
            <PersonIcon />
            Bạn bè
          </button>
          <button className="flex items-center justify-center gap-2 rounded-md bg-primary px-2 py-2 text-base font-medium text-white">
            <img
              src={MessengerImage}
              alt="messenger"
              width={24}
              height={24}
              className="bg-primary "
            />
            Nhắn tin
          </button>
        </div>
      </div>
      <div className=" w-235">
        <Divider sx={{ borderBottomWidth: 1 }} />
        <div className="mb-3 flex h-full flex-1 items-center text-sm ">
          <div className={style.topMenuIcon}>Bài Viết</div>
          <div className={style.topMenuIcon}>Bạn bè</div>
          <div className={style.topMenuIcon}>Ảnh</div>
          <div className={style.topMenuIcon}>Video</div>
        </div>
      </div>
    </div>
  );
};
