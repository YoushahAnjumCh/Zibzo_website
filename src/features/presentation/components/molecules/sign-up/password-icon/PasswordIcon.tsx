import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Textield from "../../../atoms/text_field/Textfield";
import { UseFormRegister } from "react-hook-form";

type PasswordIconProps = {
  register: UseFormRegister<any>;
  errors: any;
  maxLength?: number;
};

export default function PasswordIcon(props: PasswordIconProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [type, setType] = useState("password");

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
    setType(isPasswordVisible ? "password" : "text");
  };

  return (
    <>
      <Textield
        id="Password"
        placeholder="Password"
        type={type}
        register={props.register}
        error={props.errors}
        maxLength={props.maxLength}
      ></Textield>
      <span
        className="flex justify-around items-center"
        onClick={togglePasswordVisibility}
      >
        {!isPasswordVisible ? (
          <FaEyeSlash className="absolute right-4 bottom-5 cursor-pointer  text-gray-500" />
        ) : (
          <FaEye className="absolute right-4 bottom-5 cursor-pointer  text-gray-500" />
        )}
      </span>
    </>
  );
}
