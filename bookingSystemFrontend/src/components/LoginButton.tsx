import { useState } from "react";
import PopUp from "./PopUp";
import Feedback from "./Feedback";

function LoginButton() {
  const [isVisible, setVisible] = useState(false);
  const [isValidLogin, setValid] = useState(true);

  const roomNumber = localStorage.getItem("roomNumber");
  const handleSubmit = () => {
    let roomNumber: string = (
      document.getElementById("login_input") as HTMLInputElement
    ).value;
    if (isValidRoomNumber(roomNumber)) {
      localStorage.setItem("roomNumber", roomNumber);
      setVisible(false);
    } else {
      localStorage.setItem("roomNumber", "null");
      setValid(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setVisible(true)}
        className="bg-slate-500 rounded-3xl p-3 px-5 text-customRed hover:bg-slate-600"
      >
        {roomNumber === null ? "Login" : roomNumber}
      </button>
      <PopUp
        isVisible={isVisible}
        onClose={() => {
          setVisible(false);
          setValid(true);
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col text-black dark:text-white text-md font-normal space-y-3"
        >
          <div className="flex justify-center">
            <input
              className="rounded-lg bg-customLightGray border-white border-2 text-white p-1"
              placeholder="Zimmernummer"
              id="login_input"
              autoFocus
            />
          </div>
          <Feedback
            isVisible={!isValidLogin}
            isPositive={false}
            negativeText="Invalide Raumnummer"
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="border-2 font-extrabold border-customGreen rounded-3xl p-2 text-customGreen hover:bg-customGreen hover:text-customDarkGray transition-all"
            >
              Login
            </button>
          </div>
        </form>
      </PopUp>
    </div>
  );
}

export default LoginButton;

function isValidRoomNumber(value: string) {
  if (isNaN(Number(value)) || Number(value) > 630) {
    return false;
  }
  let roomNumber: number = Number(value) % 100;
  let floor: number = (Number(value) - roomNumber) / 100;

  return roomNumber < 21 && roomNumber > 0 && floor < 7 && floor >= 0;
}
