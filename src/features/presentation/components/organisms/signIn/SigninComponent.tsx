import React, { useEffect, useState } from "react";
import { FieldError, useForm, UseFormRegister } from "react-hook-form";
import CustomImage from "../../atoms/image/CustomImage";
import SignupTitle from "../../atoms/Title/Title";
import Textield from "../../atoms/text_field/Textfield";
import PasswordIcon from "../../molecules/sign-up/password-icon/PasswordIcon";
import CheckBoxAgree from "../../molecules/sign-up/CheckBoxAgree";
import CustomButton from "../../atoms/custom-button/CustomButton";
import SignInImage from "../../../../../assets/signup_cover.svg";
import Title from "../../atoms/Title/Title";
import TextWithLink from "../../atoms/TextWithLink/TextWithLink";
import { useDispatch, useSelector } from "react-redux";

import { unwrapResult } from "@reduxjs/toolkit";
import LinkToScreen from "../../atoms/link-to-page/LinkToScreen";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../../redux/store";
import { SignInParams } from "../../../../redux/auth/model/AuthParams";
import { authSignIn } from "../../../../redux/auth/slice/authSignInSlice";
import { useAuthentication } from "../../../../../hooks/authContext";
export type SignInInput = {
  Email: string;
  Password: string;
};

export default function SigninComponent() {
  const dispatch: AppDispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [errorColor, setErrorColor] = useState("");
  const [loading, setLoading] = useState(false);
  let location = useLocation();
  const { setAuthData } = useAuthentication();
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
          setLoading(true);
          try {
            const resultAction = await dispatch(authSignIn(signInParams));

            const authData = unwrapResult(resultAction);
            authData.isUserAuthenticated = true;

            if (authData.token) {
              handleShowDiv("Success", "text-green-600");
              setAuthData(authData);
              setShowDiv(true);
              navigate(location.state?.from || "/homepage", { replace: true });
            }
          } catch (error: any) {
            handleShowDiv(error.toString(), "text-red-600");
            setShowDiv(true);
          } finally {
            setLoading(false);
          }
        })}
      >
        <div className="flex flex-col md:flex-row ">
          {/* SignupImage  */}
          <CustomImage
            className="flex grow-1 object-cover w-full h-1/4 md:h-screen lg:w-3/6"
            alt="SignupCoverImage"
            ImageSrc={SignInImage}
          ></CustomImage>

          <div className="flex-col mr-14 mb-12 md:pl-4 md:w-2/5 mb-15 mx-5 flex justify-center">
            {/* SignupTitle */}
            <SignupTitle
              className="mt-10 text-3xl font-medium"
              text="Sign In"
            ></SignupTitle>

            {/* Already account? */}

            <TextWithLink
              linkTitle="Sign up"
              linkPath="/signup"
              className="text-green-300 font-medium"
              textStyle="mt-3 text-l text-gray-400"
              text="Don't have an account yet? "
            ></TextWithLink>
            <Textield
              id="Email"
              placeholder="Email"
              type="email"
              register={register}
              error={errors.Email}
            ></Textield>

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
              className={`container bg-black mt-8 text-white text-center rounded-md p-2 ${
                loading ? "cursor-not-allowed opacity-50" : ""
              }`}
              text={loading ? "Loading..." : "Sign in"}
              tDisabled={loading}
            ></CustomButton>
          </div>
        </div>
      </form>
    </div>
  );
}
