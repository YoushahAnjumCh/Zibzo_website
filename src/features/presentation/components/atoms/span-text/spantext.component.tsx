import React from "react";
type SpanTextProps = {
  clasName: string;
  text: string;
};

export default function SpanText(props: SpanTextProps) {
  return <span className={props.clasName}>{props.text}</span>;
}
