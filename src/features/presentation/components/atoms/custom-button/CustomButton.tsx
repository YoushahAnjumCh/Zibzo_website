type CustomButtonProps = {
  text: string;
  className: string;
  tDisabled?: boolean;
  onClick?: () => void;
};
export default function CustomButton(props: CustomButtonProps) {
  return (
    <button
      disabled={props.tDisabled}
      onClick={props.onClick}
      className={props.className}
    >
      {props.text}
    </button>
  );
}
