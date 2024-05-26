import { useQuery } from "@tanstack/react-query";
import Appointment from "./Appointment";
import axios from "axios";
interface Props {
  date: Date;
}

interface Booking {
  id: number;
  room_number: number;
  starting_point: string;
  ending_point: string;
  description: string;
}

function Day({ date }: Props) {
  const dateData = date.toLocaleString("sv").split(" ")[0];

  function getBookingsForDay(date: Date) {
    return axios
      .get("http://localhost:8080/bookings/day/" + dateData)
      .then((res) => res.data);
  }
  const days = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
  const {
    isLoading,
    isError,
    data: bookings,
  } = useQuery({
    queryKey: ["day", dateData],
    queryFn: getBookingsForDay,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col flex-grow">
        <div className="text-3xl text-customBlue font-bold flex justify-center">
          {days[date.getDay()]}
        </div>
        <div className="text-customLightGray text-center">{date.getDate()}</div>
        <div className="opacity-30 p-3 overflow-auto space-y-2">
          <div className="animate-pulse bg-customLightGray rounded-3xl py-16 px-14 flex flex-col items-center flex-shrink-0 hover:brightness-125 transition-all"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col flex-grow">
        <div className="text-3xl text-customBlue font-bold flex justify-center">
          {days[date.getDay()]}
        </div>
        <div className="text-customLightGray text-center">{date.getDate()}</div>
        <div className="opacity-30 p-3 overflow-auto space-y-2">
          <div className="bg-customLightGray rounded-3xl py-16 px-14 flex flex-col items-center flex-shrink-0 hover:brightness-125 transition-all text-white text-xl font-extrabold">
            Error
          </div>
        </div>
      </div>
    );
  }

  if (bookings == undefined) {
    return (
      <div className="flex flex-col flex-grow">
        <div className="text-3xl text-customBlue font-bold flex justify-center">
          {days[date.getDay()]}
        </div>
        <div className="text-customLightGray text-center">{date.getDate()}</div>
        <div className="opacity-30 p-3 overflow-auto space-y-2">
          <div className="bg-customLightGray rounded-3xl py-16 px-14 flex flex-col items-center flex-shrink-0 hover:brightness-125 transition-all text-white text-xl font-extrabold">
            Error
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-grow">
      <div className="text-3xl text-customBlue font-bold flex justify-center">
        {days[date.getDay()]}
      </div>
      <div className="text-customLightGray text-center">{date.getDate()}</div>
      {bookings.map((booking: Booking) => (
        <Appointment
          roomNumber={booking.room_number}
          statingPoint={
            booking.starting_point.split("T")[1].split(":")[0] +
            ":" +
            booking.starting_point.split("T")[1].split(":")[1]
          }
          endingPoint={
            booking.ending_point.split("T")[1].split(":")[0] +
            ":" +
            booking.ending_point.split("T")[1].split(":")[1]
          }
          description={booking.description}
        ></Appointment>
      ))}
      <div className="h-full flex-shrink p-3 overflow-auto space-y-2  border-customLightGray">
        <div className="opacity-30 bg-customLightGray h-full rounded-3xl py-16 px-14 flex flex-col items-center"></div>
      </div>
    </div>
  );
}

export default Day;
