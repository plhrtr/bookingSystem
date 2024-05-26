import { useQuery } from "@tanstack/react-query";
import DeleteBooking from "./DeleteBooking";
import axios from "axios";
import { useState } from "react";

interface Booking {
  id: number;
  room_number: number;
  starting_point: Date;
  ending_point: Date;
  description: string;
}

function Bookings() {
  if (
    localStorage.getItem("roomNumber") == "null" ||
    localStorage.getItem("roomNumber") == undefined
  ) {
    return <p className="font-normal text-base">Melde dich erst an!</p>;
  }

  const {
    isLoading,
    isError,
    data: bookings,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  if (isLoading) {
    return (
      <div className="animate-spin flex items-center justify-center p-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </div>
    );
  }

  if (isError) {
    return <h1>Error</h1>;
  }

  if (bookings.length == 0) {
    return <p className="font-normal">Du hast keine Buchungen</p>;
  }

  return (
    <div className="overflow-auto flex">
      <table>
        <thead className="border-b-2">
          <tr className="font-extrabold text-xl">
            <td className="px-6 py-4">Start</td>
            <td className="px-6 py-4">Ende</td>
            <td className="px-6 py-4">Beschreibung</td>
          </tr>
        </thead>
        <tbody className="font-normal">
          {bookings.map((booking: any) => (
            <tr key={booking.id}>
              <td className="px-6 py-4">{booking.starting_point}</td>
              <td className="px-6 py-4">{booking.ending_point}</td>
              <td className="px-6 py-4">{booking.description}</td>
              <td className="px-6 py-4">
                <DeleteBooking id={booking.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Bookings;

function getBookings(date: Date) {
  return axios
    .get<Booking[]>(
      "http://localhost:8080/bookings/roomNumber/" +
        localStorage.getItem("roomNumber")
    )
    .then((res) => res.data);
}
