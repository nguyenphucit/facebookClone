import React, { useState, useEffect } from "react";
import noAvatar from "../../image/noAvatar.png";
import PersonIcon from "@mui/icons-material/Person";
import MessengerImage from "../../image/messenger.png";
import { Divider } from "@mui/material";
import style from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { chosingImage } from "../../helper/FormDataHelper";
import UserApi from "../../api/UserApi";
import { getUserInfo, updateUserAvatar } from "../../slice/UserSlice";
import { useNavigate } from "react-router-dom";
import { LoadingPage } from "../../pages/LoadingPage";
import _ from "lodash";
export const ProfileTopInfo = ({ userId }) => {
  const { userInfo } = useSelector((state) => state.user);
  const [userDetailInfo, setuserDetailInfo] = useState();
  const [ImageFile, setImageFile] = useState("");
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUserInfoById = async () => {
    const response = await UserApi.getUserById(userId);
    if (response.statusCode === 200) setuserDetailInfo(() => response.data);
    else if (response.statusCode === 401) {
      alert(response.message);
      sessionStorage.removeItem("access_token");
      window.location.replace("/");
    } else alert(response.message);
  };
  useEffect(() => {
    if (ImageFile !== "") {
      handleUpdateAvatar();
      getUserInfoById();
    }
    // eslint-disable-next-line
  }, [ImageFile]);

  const handleUpdateAvatar = async () => {
    try {
      setLoading(() => true);
      const formData = new FormData();
      formData.append("avatar", ImageFile);
      const response = await UserApi.UpdateAvatar(formData, userInfo.id);
      if (response.statusCode === 200) {
        dispatch(updateUserAvatar({ newUserInfo: response.data }));
        setuserDetailInfo((prev) => ({
          ...prev,
          avatar: response.data.avatar,
        }));
        alert("successfully update avatar");
        setLoading(() => false);
        navigate(`/profile/${userInfo.id}`);
      } else if (response.statusCode === 401) alert(response.message);
      else alert(response.message);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!userDetailInfo || userDetailInfo.id !== Number.parseInt(userId))
      getUserInfoById();
    // eslint-disable-next-line
  }, [userId, userInfo]);
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
            dispatch(getUserInfo({ user: userInfo.data }));
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
      {Loading ? <LoadingPage /> : null}
      <div
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(240,242,245,1) 19%)",
        }}
        className="h-95 w-235 rounded-xl xs:h-52 "
      ></div>
      <div className="flex h-32 w-235 py-3  text-start text-3xl font-bold xs:h-80 xs:flex-col xs:items-center xs:justify-center">
        <div className="relative flex flex-[1] items-center justify-center gap-4 xs:flex-col">
          <div className="relative">
            <img
              src={userDetailInfo?.avatar ? userDetailInfo?.avatar : noAvatar}
              alt="Avatar"
              className="h-42 w-42 rounded-full border-4 border-white object-center"
            />
            {/* add avatar */}

            {userInfo?.id === Number.parseInt(userId) ? (
              <label
                className="hover:bg-[#D8DADF]; absolute bottom-2 right-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#e4e6eb] p-4"
                htmlFor="addAvatar"
              >
                <AddAPhotoIcon sx={{ fontSize: "24px" }} />
              </label>
            ) : null}
          </div>

          <input
            type="file"
            className="hidden"
            id="addAvatar"
            onChange={(e) => chosingImage(e, setImageFile)}
          />
          {/*  */}
          <div className="xs:text-center">
            <p>{userDetailInfo?.firstname + " " + userDetailInfo?.surname}</p>
            <p className="text-commentAuthor text-registerLabel">
              {userDetailInfo?.friends.length} bạn bè
            </p>
          </div>
        </div>

        <div className="flex flex-[1] items-center justify-end gap-3 xs:w-full xs:justify-center xs:p-2">
          <button className=" flex items-center justify-center gap-2 rounded-md bg-hover px-2 py-2 text-base font-medium hover:brightness-95  xs:flex-[1] ">
            <PersonIcon />
            Bạn bè
          </button>
          <button className="flex items-center justify-center gap-2 rounded-md bg-primary px-2 py-2 text-base font-medium text-white hover:brightness-95  xs:flex-[1] ">
            <img
              src={MessengerImage}
              alt="messenger"
              width={18}
              height={18}
              className="bg-transparent invert-[1]"
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
