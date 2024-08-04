// import React, { useState } from "react";
// import Divider from "@mui/material/Divider";
// import CloseBtn from "../../image/closeButton.png";
// import style from "./index.module.css";
// import { useForm } from "react-hook-form";
// import AuthApi from "../../api/AuthApi";
// export const RegisterForm = ({ setIsRegister, setLoading }) => {
//   // eslint-disable-next-line
//   const [Day, setDay] = useState(() =>
//     Array.from({ length: 31 }, (_, index) => index + 1),
//   );
//   // eslint-disable-next-line
//   const [Month, setMonth] = useState(() => [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ]);
//   // eslint-disable-next-line
//   const [Year, setYear] = useState(() => {
//     const startYear = 1905;
//     const endYear = 2024;

//     const yearsArray = Array.from(
//       { length: endYear - startYear + 1 },
//       (_, index) => startYear + index,
//     );
//     return yearsArray;
//   });

//   const { register, handleSubmit } = useForm();
//   const onSubmit = async (data) => {
//     try {
//       setLoading(() => true);
//       const month = data.month;
//       const MonthnumberConverted =
//         Month.findIndex((index) => month === index) + 1;
//       const dateOfBirth = new Date(
//         data.year,
//         MonthnumberConverted - 1,
//         data.day,
//       ).toISOString();

//       delete data.month;
//       delete data.year;
//       delete data.day;
//       data.dateOfBirth = dateOfBirth;
//       const response = await AuthApi.Register(data);
//       if (response) {
//         alert(
//           "you have successfully create account, now login to your account and explore our services",
//         );
//         setLoading(() => false);
//         setIsRegister(false);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div className="absolute bottom-0 left-0 right-0 top-0 z-20 mb-auto ml-auto mr-auto mt-auto box-content h-fit min-h-134 w-108 rounded-lg bg-white px-5 py-2 pb-10 shadow-2xl xs:w-80">
//       <div className="mt-0">
//         <div className=" mb-12 flex justify-between text-start text-4xl font-bold">
//           Sign Up
//           <img
//             src={CloseBtn}
//             alt="close-button"
//             className="box-border h-6 w-6 object-center hover:cursor-pointer"
//             onClick={() => setIsRegister(false)}
//           />
//         </div>
//         <Divider />
//         <div className="mt-6 flex flex-col">
//           <form
//             className="flex w-full flex-1 flex-col justify-between"
//             onSubmit={handleSubmit(onSubmit)}
//           >
//             <div className="box-border flex w-full items-center justify-between">
//               <div className="my-1 flex flex-1 items-center justify-start">
//                 <input
//                   type="text"
//                   className={style.HalfField}
//                   placeholder="First name"
//                   {...register("firstname")}
//                 />
//               </div>
//               <div className="flex flex-1 items-center justify-end">
//                 <input
//                   type="text"
//                   className={style.HalfField}
//                   placeholder="Surname"
//                   {...register("surname")}
//                 />
//               </div>
//             </div>
//             <div className="my-1">
//               <input
//                 type="text"
//                 className={style.LongField}
//                 placeholder="Mobile number or Email address"
//                 {...register("email")}
//               />
//             </div>
//             <div className="my-1">
//               <input
//                 type="text"
//                 className={style.LongField}
//                 placeholder="New password"
//                 {...register("password")}
//               />
//             </div>
//             <div className="my-2">
//               <label
//                 htmlFor="day"
//                 className="mb-2 block text-start text-sm font-medium text-registerLabel dark:text-white"
//               >
//                 Date of birth
//               </label>
//               <div className="my-1 flex justify-between">
//                 <select
//                   id="day"
//                   className={style.DateTimeField}
//                   defaultValue={1}
//                   {...register("day")}
//                 >
//                   {Day.map((item) => (
//                     <option key={item} value={item} selected={item === 1}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//                 <select
//                   id="month"
//                   className={style.DateTimeField}
//                   defaultValue={"January"}
//                   {...register("month")}
//                 >
//                   {Month.map((item) => (
//                     <option
//                       key={item}
//                       value={item}
//                       selected={item === "January"}
//                     >
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//                 <select
//                   id="year"
//                   className={style.DateTimeField}
//                   defaultValue={2024}
//                   {...register("year")}
//                 >
//                   {Year.map((item) => (
//                     <option key={item} value={item} selected={item === 2024}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div className="my-2">
//               <label
//                 htmlFor="countries"
//                 className="mb-2 block text-start text-sm font-medium text-registerLabel dark:text-white"
//               >
//                 Gender
//               </label>
//               <div className="flex justify-between">
//                 <label className="w-3/9">
//                   <div className={style.GenderField}>
//                     Male
//                     <input
//                       type="radio"
//                       name="gender"
//                       value="MALE"
//                       {...register("gender")}
//                     />
//                   </div>
//                 </label>
//                 <label className="w-3/9">
//                   <div className={style.GenderField}>
//                     Female
//                     <input
//                       type="radio"
//                       name="gender"
//                       value="FEMALE"
//                       {...register("gender")}
//                     />
//                   </div>
//                 </label>
//                 <label className="w-3/9">
//                   <div className={style.GenderField}>
//                     Other
//                     <input
//                       type="radio"
//                       name="gender"
//                       value="OTHER"
//                       {...register("gender")}
//                     />
//                   </div>
//                 </label>
//               </div>
//             </div>
//             <p className="text-start text-xs">
//               People who use our service may have uploaded your contact
//               information to Facebook. Learn more.
//             </p>
//             <p className="mt-3 text-start text-xs">
//               By clicking Sign Up, you agree to our Terms, Privacy Policy and
//               Cookies Policy. You may receive SMS notifications from us and can
//               opt out at any time.
//             </p>
//             <button
//               type="submit"
//               className="mt-3 w-fit self-center rounded-lg bg-loginBtn px-16 py-2 text-center text-lg font-semibold text-white shadow-inner hover:bg-loginBtnHover"
//             >
//               Sign Up
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };
import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import CloseBtn from "../../image/closeButton.png";
import style from "./index.module.css";
import { useForm } from "react-hook-form";
import AuthApi from "../../api/AuthApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "../../validationSchema/registerValidation";
export const RegisterForm = ({ setIsRegister, setLoading }) => {
  const [Day] = useState(Array.from({ length: 31 }, (_, index) => index + 1));
  const [Month] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);
  const [Year] = useState(() => {
    const startYear = 1905;
    const endYear = 2024;
    return Array.from(
      { length: endYear - startYear + 1 },
      (_, index) => startYear + index,
    );
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const monthIndex = Month.indexOf(data.month) + 1;
      const dateOfBirth = new Date(
        data.year,
        monthIndex - 1,
        data.day,
      ).toISOString();

      const registrationData = {
        ...data,
        dateOfBirth,
      };
      delete registrationData.month;
      delete registrationData.year;
      delete registrationData.day;

      const response = await AuthApi.Register(registrationData);
      if (response) {
        alert(
          "You have successfully created an account. Now log in to explore our services.",
        );
        setLoading(false);
        setIsRegister(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 z-20 mb-auto ml-auto mr-auto mt-auto box-content h-fit min-h-134 w-108 rounded-lg bg-white px-5 py-2 pb-10 shadow-2xl xs:w-80">
      <div className="mt-0">
        <div className="mb-12 flex justify-between text-start text-4xl font-bold">
          Sign Up
          <img
            src={CloseBtn}
            alt="close-button"
            className="box-border h-6 w-6 object-center hover:cursor-pointer"
            onClick={() => setIsRegister(false)}
          />
        </div>
        <Divider />
        <div className="mt-6 flex flex-col">
          <form
            className="flex w-full flex-1 flex-col justify-between"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="box-border flex w-full items-center justify-between">
              <div className="my-1 flex flex-1 flex-col flex-col items-start justify-center">
                <input
                  type="text"
                  className={style.HalfField}
                  placeholder="First name"
                  {...register("firstname")}
                />
                {errors.firstname && (
                  <p className="text-sm text-red-500">
                    {errors.firstname.message}
                  </p>
                )}
              </div>
              <div className="flex flex-1 flex-col items-end justify-center">
                <input
                  type="text"
                  className={style.HalfField}
                  placeholder="Surname"
                  {...register("surname")}
                />
                {errors.surname && (
                  <p className="text-sm text-red-500">
                    {errors.surname.message}
                  </p>
                )}
              </div>
            </div>
            <div className="my-1 flex flex-col justify-center">
              <input
                type="text"
                className={style.LongField}
                placeholder="Please enter your email address"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="my-1 flex flex-col justify-center">
              <input
                type="password"
                className={style.LongField}
                placeholder="New password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="my-2">
              <label
                htmlFor="day"
                className="mb-2 block text-start text-sm font-medium text-registerLabel dark:text-white"
              >
                Date of birth
              </label>
              <div className="my-1 flex justify-between">
                <select
                  id="day"
                  className={style.DateTimeField}
                  defaultValue={1}
                  {...register("day")}
                >
                  {Day.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <select
                  id="month"
                  className={style.DateTimeField}
                  defaultValue="January"
                  {...register("month")}
                >
                  {Month.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <select
                  id="year"
                  className={style.DateTimeField}
                  defaultValue={2024}
                  {...register("year")}
                >
                  {Year.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="my-2">
              <label
                htmlFor="gender"
                className="mb-2 block text-start text-sm font-medium text-registerLabel dark:text-white"
              >
                Gender
              </label>
              <div className="flex flex-wrap justify-between">
                <label className="w-3/9">
                  <div className={style.GenderField}>
                    Male
                    <input
                      type="radio"
                      name="gender"
                      value="MALE"
                      {...register("gender")}
                    />
                  </div>
                </label>
                <label className="w-3/9">
                  <div className={style.GenderField}>
                    Female
                    <input
                      type="radio"
                      name="gender"
                      value="FEMALE"
                      {...register("gender")}
                    />
                  </div>
                </label>
                <label className="w-3/9">
                  <div className={style.GenderField}>
                    Other
                    <input
                      type="radio"
                      name="gender"
                      value="OTHER"
                      {...register("gender")}
                    />
                  </div>
                </label>
                {errors.gender && (
                  <div className="text-sm text-red-500">
                    {errors.gender.message}
                  </div>
                )}
              </div>
            </div>
            <p className="text-start text-xs">
              People who use our service may have uploaded your contact
              information to Facebook. Learn more.
            </p>
            <p className="mt-3 text-start text-xs">
              By clicking Sign Up, you agree to our Terms, Privacy Policy and
              Cookies Policy. You may receive SMS notifications from us and can
              opt out at any time.
            </p>
            <button
              type="submit"
              className="mt-3 w-fit self-center rounded-lg bg-loginBtn px-16 py-2 text-center text-lg font-semibold text-white shadow-inner hover:bg-loginBtnHover"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
