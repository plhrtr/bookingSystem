import { useState } from "react";
import PopUp from "./PopUp";

interface Props {
  roomNumber: number;
  statingPoint: string;
  endingPoint: string;
  description: string;
}

function Date({ roomNumber, statingPoint, endingPoint, description }: Props) {
  const [isVisible, setVisible] = useState(false);

  return (
    <div className="p-3 flex-shrink-0">
      <div
        onClick={() => setVisible(true)}
        className="bg-customBlue rounded-3xl p-1 flex flex-col items-center flex-shrink-0 hover:brightness-125 transition-all"
      >
        <p className="font-normal text-customLightGray px-10">{statingPoint}</p>
        <p className="text-3xl font-extrabold text-white py-2">{roomNumber}</p>
        <p className="font-normal text-customLightGray ">{endingPoint}</p>
      </div>
      <PopUp isVisible={isVisible} onClose={() => setVisible(false)}>
        <div className="flex flex-col space-y-3">
          <div>
            <p>Zimmernummer:</p>
            <p className="font-normal">{roomNumber}</p>
          </div>
          <div>
            <p>Start:</p>
            <p className="font-normal">{statingPoint}</p>
          </div>
          <div>
            <p>Ende:</p>
            <p className="font-normal">{endingPoint}</p>
          </div>
          <div>
            <p>Beschreibung:</p>
            <p className="font-normal">{description}</p>
          </div>
        </div>
      </PopUp>
    </div>
  );
}

export default Date;
