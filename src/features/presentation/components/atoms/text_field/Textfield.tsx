import { FieldError, UseFormRegister } from "react-hook-form";
import { SignupInput } from "../../organisms/sign-up/SignUpComponent";
type SignupProps = {
  placeholder: string;
  type: string;
  id: keyof SignupInput;
  register: UseFormRegister<any>;
  error?: FieldError;
  customError?: string;
  maxLength?: number | undefined;
};

export default function Textfield(props: SignupProps) {
  const { id, type, placeholder, register, error, customError, maxLength } =
    props;

  return (
    <>
      <input
        id={id}
        type={type}
        className={`border-b-2 mt-8 focus:outline-none focus:border-b-2 focus:border-grey-500 w-full pb-2 ${
          error || customError ? "border-red-500" : ""
        }`}
        placeholder={placeholder}
        {...register(id, {
          required: true,
          ...(maxLength && {
            maxLength: {
              value: maxLength,
              message: `${id} must not exceed ${maxLength} characters`,
            },
          }),
        })}
        maxLength={maxLength || undefined}
      />
      {(error || customError) && (
        <p style={{ color: "red" }}>
          {customError ||
            (error?.type === "maxLength"
              ? error.message
              : `${id} is required!`)}
        </p>
      )}
    </>
  );
}
