import React from "react";

type TitleHeadingProps = {
  divClassName?: string;
  hClassName?: string;
  title: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
};
export default function TitleHeading(props: TitleHeadingProps) {
  const Tag = `h${props.level}` as keyof JSX.IntrinsicElements;

  return (
    <div className={props.divClassName}>
      <Tag className={props.hClassName}>{props.title}</Tag>
    </div>
  );
}
