import React from "react";

type TitleParagraphProps = {
  title: string;
  className?: string;
};

export default function TitleParagraph(props: TitleParagraphProps) {
  return <p className={props.className}>{props.title}</p>;
}
