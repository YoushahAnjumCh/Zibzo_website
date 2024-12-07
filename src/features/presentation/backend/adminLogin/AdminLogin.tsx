import React, { useEffect, useState } from "react";
import { FieldError, useForm, UseFormRegister } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { useLocation, useNavigate } from "react-router-dom";
import { SignInParams } from "../../../redux/auth/model/AuthParams";
import { authSignIn } from "../../../redux/auth/slice/authSignInSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import CustomImage from "../../components/atoms/image/CustomImage";
import TextWithLink from "../../components/atoms/TextWithLink/TextWithLink";
import CustomButton from "../../components/atoms/custom-button/CustomButton";
import PasswordIcon from "../../components/molecules/sign-up/password-icon/PasswordIcon";
import Textfield from "../../components/atoms/text_field/Textfield";
import Title from "../../components/atoms/Title/Title";
import Image from "../../../../assets/signup_cover.svg";
import { useAdminAuthentication } from "../../../../hooks/adminAuthContext";
import { adminAuthSignIn } from "../../../redux/auth/slice/adminSigninSlice";
export type SignInInput = {
  Email: string;
  Password: string;
};

export default function AdminLogin() {
  const dispatch: AppDispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [errorColor, setErrorColor] = useState("");
  let location = useLocation();
  const { adminSetAuthData } = useAdminAuthentication();
  const [showDiv, setShowDiv] = useState(false);
  const navigate = useNavigate();
  const handleShowDiv = (message: string, color: string) => {
    setErrorMessage(message);
    setErrorColor(color);

    setTimeout(() => {
      setShowDiv(false);
    }, 3000);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInput>({ mode: "onChange" });

  return (
    <div>
      <form
        onSubmit={handleSubmit(async (data: SignInInput) => {
          const signInParams: SignInParams = {
            email: data.Email,
            password: data.Password,
          };
          try {
            const resultAction = await dispatch(adminAuthSignIn(signInParams));
            console.log(resultAction);
            const authData = unwrapResult(resultAction);
            console.log("Token:", authData.token);
            console.log(authData);
            if (authData.token) {
              handleShowDiv("Success", "text-green-600");
              adminSetAuthData(authData);
              setShowDiv(true);
              navigate(location.state?.from || "/upload", { replace: true });
            }
          } catch (error: any) {
            console.log(error);
            handleShowDiv(error.toString(), "text-red-600");
            setShowDiv(true);
          }
        })}
      >
        <div className="flex flex-col md:flex-row ">
          {/* SignupImage  */}
          <CustomImage
            className="flex grow-1 object-cover w-full h-1/4 md:h-screen lg:w-3/6"
            alt="SignupCoverImage"
            ImageSrc={Image}
          ></CustomImage>

          <div className="flex-col mr-14 mb-12 md:pl-4 md:w-2/5 mb-15 mx-5 flex justify-center">
            {/* SignupTitle */}
            <Title
              className="mt-10 text-3xl font-medium"
              text="Admin Login"
            ></Title>

            <Textfield
              id="Email"
              placeholder="Email"
              type="email"
              register={register}
              error={errors.Email}
            ></Textfield>

            <div className="relative w-full">
              <PasswordIcon
                register={register}
                errors={errors.Password}
                maxLength={10}
              ></PasswordIcon>
            </div>
            {showDiv ? (
              <div className={`flex items-center mt-4 ${errorColor}`}>
                {errorMessage}
              </div>
            ) : (
              <div></div>
            )}
            {/* Signup Button */}
            <CustomButton
              className="container bg-black mt-8 text-white text-center rounded-md p-2"
              text="Admin Sign in"
            ></CustomButton>
          </div>
        </div>
      </form>
    </div>
  );
}
