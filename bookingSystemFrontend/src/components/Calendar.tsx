import { useState } from "react";
import Day from "./Day";

function Calendar() {
  const [weekDifference, setWeekDifference] = useState(0);
  const now = new Date();
  const [date, setDate] = useState(now);

  const handleNextClick = () => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + 7);
    setDate(newDate);
    setWeekDifference(weekDifference + 1);
  };

  const handlePreviousClick = () => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - 7);
    setDate(newDate);
    setWeekDifference(weekDifference - 1);
  };

  return (
    <div className="flex flex-col bg-slate-100 dark:bg-customDarkGray border-customBlue rounded-3xl m-5 p-3 border-4 space-y-3 flex-grow">
      <div className="flex">
        <div className="flex py-2">
          <button
            className="h-min disabled:opacity-50"
            id="previous"
            disabled={weekDifference <= 0}
            onClick={handlePreviousClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={5}
              stroke="currentColor"
              className="w-10 h-10 stroke-slate-400 dark:stroke-customLightGray hover:scale-110"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            id="next"
            disabled={weekDifference >= 10}
            onClick={handleNextClick}
            className="disabled:opacity-50 h-min"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={5}
              stroke="currentColor"
              className="w-10 h-10 stroke-slate-400 dark:stroke-customLightGray hover:scale-110"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
        <div className="flex justify-center w-full items-center font-extrabold text-3xl text-customLightGray">
          {date.toLocaleString("default", { month: "long" })}
        </div>
      </div>
      <div className="flex justify-start space-x-3 overflow-auto">
        {getDates(date).map((res, i) => (
          <Day key={i} date={res} />
        ))}
      </div>
    </div>
  );
}

export default Calendar;

const getDates = (week: Date): Date[] => {
  // week.getDay() is 0 for sunday -> convert to "logical" order
  const dayOfTheWeek = (week.getDay() + 6) % 7;
  const date = week.getDate();

  const startOfWeek = new Date(week);
  startOfWeek.setDate(date - dayOfTheWeek);
  startOfWeek.setHours(0, 0, 0, 0);

  const dates = [...Array(7)].map((_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });

  return dates;
};
