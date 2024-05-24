import React, { useState } from "react";
import PopUp from "./PopUp";
import Feedback from "./Feedback";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BookingProcess from "./BookingProcess";

function BookButton() {
  const [isVisible, setVisible] = useState(false);
  const [isBookingValid, setValid] = useState(true);

  return (
    <div>
      <button
        onClick={() => setVisible(true)}
        className="rounded-3xl p-3 border-4 border-customGreen text-customGreen hover:bg-customGreen hover:text-white dark:hover:text-customDarkGray font-extrabold text-2xl"
      >
        <div className="flex justify-between items-center space-x-3 transition-all">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={6}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <p>Eintragen</p>
        </div>
      </button>
      <PopUp
        isVisible={isVisible}
        onClose={() => {
          setVisible(false);
          setValid(true);
        }}
      >
        <BookingProcess setValid={setValid} isBookingValid={isBookingValid} />
      </PopUp>
    </div>
  );
}

export default BookButton;
