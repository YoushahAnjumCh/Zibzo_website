import React from "react";

type TextProps = {
  className: string;
  text: string;
};

export default function AppTitle(props: TextProps) {
  return <div className={props.className}>{props.text}</div>;
}
