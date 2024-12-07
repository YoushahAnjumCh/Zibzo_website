import { Link } from "react-router-dom";
type LinkToScreenProps = {
  linkPath: string;
  linkTitle?: string;
  className?: string;
};

export default function LinkToScreen(props: LinkToScreenProps) {
  return (
    <Link to={props.linkPath} className={props.className}>
      {props.linkTitle}
    </Link>
  );
}
