import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import BookButton from "./components/BookButton";
import Calendar from "./components/Calendar";

function App() {
  return (
    <div className="">
      <Navbar />
      <div className="flex justify-center p-3">
        <BookButton />
      </div>
      <Calendar />
    </div>
  );
}
export default App;
