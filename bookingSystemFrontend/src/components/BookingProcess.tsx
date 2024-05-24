import React from "react";
import { useState } from "react";
import axios from "axios";
import Feedback from "./Feedback";

interface Props {
  setValid: Function;
  isBookingValid: boolean;
}

function BookingProcess({ setValid, isBookingValid }: Props) {
  const [isPositive, setPositive] = useState(true);

  function handleBooking() {
    let roomNumber = localStorage.getItem("roomNumber");
    let startingPoint = (document.getElementById("start") as HTMLInputElement)
      .value;
    let endingPoint = (document.getElementById("end") as HTMLInputElement)
      .value;
    let description: string = (
      document.getElementById("description") as HTMLInputElement
    ).value;

    const booking = {
      room_number: roomNumber,
      starting_point: startingPoint,
      ending_point: endingPoint,
      description: description,
    };

    axios
      .post("http://localhost:8080/bookings/book", booking)
      .catch((error) => {
        setValid(false);
        setPositive(false);
        return;
      });

    setValid(false);
    setPositive(true);
  }

  if (localStorage.getItem("roomNumber") == "null") {
    return "Melde dich erst an!";
  }

  return (
    <form className="flex flex-col space-y-3 text-lg">
      <div className="flex flex-col">
        <p className="text-slate-200 dark:text-customLightGray">Start:</p>
        <input
          id="start"
          className="rounded-lg bg-customLightGray border-white border-2 text-white p-1"
          aria-label="start time"
          type="datetime-local"
        />
      </div>
      <div className="flex flex-col">
        <p className="text-slate-200 dark:text-customLightGray">Ende:</p>
        <input
          id="end"
          className="rounded-lg bg-customLightGray border-white border-2 text-white p-1"
          aria-label="end time"
          type="datetime-local"
        />
      </div>
      <div className="flex flex-col">
        <p className="text-slate-200 dark:text-customLightGray">
          Beschreibung:
        </p>
        <input
          id="description"
          placeholder="rocking roll"
          className="rounded-lg bg-customLightGray border-white border-2 text-white p-1"
        ></input>
      </div>
      <Feedback
        isVisible={!isBookingValid}
        isPositive={isPositive}
        positveText="Buchung ist erfolgt"
        negativeText="Invalide Buchung"
      ></Feedback>
      <div className="flex justify-center">
        <button
          onClick={handleBooking}
          type="button"
          className="rounded-3xl p-2 border-2 border-customGreen text-customGreen hover:bg-customGreen hover:text-customDarkGray font-extrabold text-2xl"
        >
          Buchen
        </button>
      </div>
    </form>
  );
}

export default BookingProcess;
