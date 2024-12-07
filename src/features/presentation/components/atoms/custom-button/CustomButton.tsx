type CustomButtonProps = {
  text: string;
  className: string;
  onClick?: () => void;
};
export default function CustomButton(props: CustomButtonProps) {
  return (
    <button onClick={props.onClick} className={props.className}>
      {props.text}
    </button>
  );
}
