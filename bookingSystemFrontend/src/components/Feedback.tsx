import React from "react";

interface Props {
  isVisible: boolean;
  isPositive: boolean;
  positveText?: string;
  negativeText?: string;
}

function Feedback({ isVisible, positveText, negativeText, isPositive }: Props) {
  if (!isVisible) {
    return "";
  } else {
    if (!isPositive) {
      return (
        <div className="flex bg-customRed border-2 border-red-800 rounded-lg justify-center overflow-hidden text-red-800 p-1">
          {negativeText}
        </div>
      );
    }
    return (
      <div className="flex bg-customGreen border-2 border-green-800 rounded-lg justify-center overflow-hidden text-green-800 p-1">
        {positveText}
      </div>
    );
  }
}

export default Feedback;
