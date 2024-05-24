import { useState } from "react";
import React from "react";
import LoginButton from "./LoginButton";
import DarkmodeButton from "./DarkmodeButton";
import PopUp from "./PopUp";
import Bookings from "./Bookings";

function Navbar() {
  const [isOpen, setOpen] = useState(window.innerWidth > 640);
  const [isBookingsOpen, setBookings] = useState(false);

  const handleOpening = () => setOpen(isOpen == true ? false : true);

  React.useEffect(() =>
    window.addEventListener(
      "resize",
      () => window.innerWidth > 640 && setOpen(true)
    )
  );

  return (
    <div className="flex flex-wrap justify-between transition bg-slate-400 dark:bg-slate-800 rounded-[35px] text-white text-xl font-extrabold p-3 px-5 m-5">
      <button
        onClick={handleOpening}
        className="sm:hidden w-full flex items-center justify-end"
      >
        {!isOpen && (
          <div className="flex justify-between w-full">
            <p>Music room</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
        )}
        {isOpen && (
          <div className="flex justify-between w-full">
            <p>Music room</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
        )}
      </button>

      {isOpen && (
        <div className="flex w-full justify-between sm:space-y-0 space-y-3 sm:flex-row flex-col">
          <div className="flex w-full justify-center sm:justify-start">
            <button
              onClick={() => setBookings(true)}
              className="bg-slate-500 text-customBlue rounded-3xl px-5 p-3 hover:bg-slate-600"
            >
              Buchungen
            </button>
          </div>

          <div className="flex justify-center items-center space-x-3">
            <LoginButton />
            <DarkmodeButton />
          </div>
        </div>
      )}
      <PopUp isVisible={isBookingsOpen} onClose={() => setBookings(false)}>
        <Bookings />
      </PopUp>
    </div>
  );
}
export default Navbar;
