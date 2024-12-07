import React from "react";
import SpanText from "../../atoms/span-text/spantext.component";

type CheckBoxAgreeProps = {
  checked: boolean;
  toggleCheckbox: () => void;
};

export default function CheckBoxAgree(props: CheckBoxAgreeProps) {
  return (
    <div className="flex items-center mt-8">
      <input
        type="checkbox"
        id="rectangle-checkbox"
        className="appearance-none h-6 w-6 border-2 border-gray-400 checked:bg-black cursor-pointer rounded-md"
        checked={props.checked}
        onChange={props.toggleCheckbox}
      />
      <div className="container">
        <SpanText clasName="text-gray-400" text="I agree with "></SpanText>
        <SpanText clasName="font-medium" text="Privacy Policy"></SpanText>
        <SpanText clasName="text-gray-400" text=" and "></SpanText>
        <SpanText clasName="font-medium" text="Terms of use"></SpanText>
      </div>
    </div>
  );
}
