import React from "react";
import "./MicButton.css";

export default function MicButton({ listening, toggleListening }) {
  return (
    <div className="mic-container" onClick={toggleListening}>
      {listening && 
        <>
          <div className={`pulse-ring`} />
          <div className={`pulse-ring delay1`} />
          <div className={`pulse-ring delay2`} />
        </>
      }
      <button className="mic-button">
        🎤
      </button>
    </div>
  );
}
