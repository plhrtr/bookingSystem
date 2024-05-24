import React, { useState } from "react";

interface Props {
  children: JSX.Element;
  isVisible: boolean;
  onClose: Function;
}

function PopUp({ children, isVisible, onClose }: Props) {
  if (isVisible == false) {
    return "";
  }

  const handleClose = (e: any) => {
    if ((e.target as HTMLElement)?.id === "wrapper") onClose();
  };
  return (
    <div
      onClick={handleClose}
      className="inset-0 z-50 fixed flex justify-center overflow-auto items-center backdrop-brightness-75 backdrop-blur-sm"
      id="wrapper"
    >
      <div className="overflow-auto rounded-3xl p-3 flex justify-center flex-row bg-slate-500 dark:bg-slate-800">
        <div className="p-3 overflow-auto overflow-y-auto max-h-screen text-slate-200">
          {children}
        </div>
        <div>
          <button
            onClick={() => onClose()}
            className="bg-customLightGray rounded-full font-extrabold m-3 px-2 p-1 text-customRed hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopUp;
