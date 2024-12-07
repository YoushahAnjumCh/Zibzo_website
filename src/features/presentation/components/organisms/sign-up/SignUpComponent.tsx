import React, { useState } from "react";
import SignupTitle from "../../atoms/Title/Title";
import SignUpTextield from "../../atoms/text_field/Textfield";
import SpanText from "../../atoms/span-text/spantext.component";
import CheckBoxAgree from "../../molecules/sign-up/CheckBoxAgree";
import CustomButton from "../../atoms/custom-button/CustomButton";
import CustomImage from "../../atoms/image/CustomImage";
import SignUpImage from "../../../../../assets/signup_cover.svg";
import PasswordIcon from "../../molecules/sign-up/password-icon/PasswordIcon";
import { useForm } from "react-hook-form";

import TextWithLink from "../../atoms/TextWithLink/TextWithLink";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { SignUpParams } from "../../../../redux/auth/model/AuthParams";
import { authSignUp } from "../../../../redux/auth/slice/authSignUpSlice";
import { AppDispatch } from "../../../../redux/store";

export type SignupInput = {
  FirstName: string;
  Username: string;
  Email: string;
  Password: string;
  userImage: string;
};

export default function SignUpComponent() {
  const dispatch: AppDispatch = useDispatch();
  const [checkedValue, setCount] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorColor, setErrorColor] = useState("");
  const [showDiv, setShowDiv] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleShowDiv = (message: string, color: string) => {
    setErrorMessage(message);
    setErrorColor(color);
    setShowDiv(true);

    setTimeout(() => {
      setShowDiv(false);
    }, 3000);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({ mode: "onChange" });

  return (
    <div>
      <form
        onSubmit={handleSubmit(async (data: SignupInput) => {
          if (checkedValue !== false) {
            const signUpParams: SignUpParams = {
              email: data.Email,
              password: data.Password,
              userName: data.Username,
              userImage: file,
            };
            try {
              const resultAction = await dispatch(authSignUp(signUpParams));
              const authData = unwrapResult(resultAction);
              console.log("ID:", authData);
              handleShowDiv("Success", "text-green-600");
              setShowDiv(true);
            } catch (error: any) {
              handleShowDiv(error.toString(), "text-red-600");
              setShowDiv(true);
            }
          } else {
            handleShowDiv("Click Agree Button", "text-red-600");
            setShowDiv(true);
          }
        })}
      >
        <div className="flex flex-col md:flex-row ">
          {/* SignupImage  */}
          <CustomImage
            className="flex grow-1 object-cover w-full h-1/4 md:h-screen lg:w-3/6"
            alt="SignupCoverImage"
            ImageSrc={SignUpImage}
          ></CustomImage>

          <div className="flex-col mr-14 mb-12 md:pl-4 md:w-2/5 mb-15 mx-5 flex justify-center">
            {/* SignupTitle */}
            <SignupTitle
              className="mt-10 text-3xl font-medium"
              text="Sign up"
            ></SignupTitle>

            {/* SignupSubTitle */}
            <span className="flex items-center space-x-1">
              <TextWithLink
                linkTitle=" Sign in"
                linkPath="/"
                className="text-green-300 font-medium mt-3"
                textStyle="mt-3 text-l text-gray-400"
                text="Already have an account? "
              ></TextWithLink>
            </span>

            <SignUpTextield
              id="Username"
              placeholder="Username"
              type="text"
              register={register}
              maxLength={10}
              error={errors.Username} // Passing the specific field error
            ></SignUpTextield>

            <SignUpTextield
              id="Email"
              placeholder="Email"
              type="email"
              register={register}
              error={errors.Email}
            ></SignUpTextield>

            <div className="flex flex-row gap-4 pt-4">
              <div className="text-gray-400">Image:</div>
              <input
                type="file"
                accept="userImage/*"
                id="txtProductImage"
                {...register("userImage", {
                  required: true,
                  onChange: (e) => setFile(e.target.files[0] || null),
                })}
              />
            </div>
            <div className="relative w-full">
              <PasswordIcon
                register={register}
                errors={errors.Password}
                maxLength={10}
              ></PasswordIcon>
            </div>
            <CheckBoxAgree
              checked={checkedValue}
              toggleCheckbox={() => {
                setCount(!checkedValue);
              }}
            ></CheckBoxAgree>
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
              text="Sign up"
            ></CustomButton>
          </div>
        </div>
      </form>
    </div>
  );
}
