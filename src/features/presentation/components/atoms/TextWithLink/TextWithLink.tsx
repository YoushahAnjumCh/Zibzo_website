import React from "react";
import { Link } from "react-router-dom";
import LinkToScreen from "../link-to-page/LinkToScreen";
type TextWithLinkProps = {
  linkPath: string;
  linkTitle: string;
  className: string;
  text: string;
  textStyle: string;
};
export default function TextWithLink(props: TextWithLinkProps) {
  return (
    <>
      <span className={props.textStyle}>
        {props.text}
        <LinkToScreen
          className={props.className}
          linkPath={props.linkPath}
          linkTitle={props.linkTitle}
        />
      </span>
    </>
  );
}
