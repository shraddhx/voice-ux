import React from "react";
import "./MicButton.css";
import { Tooltip } from "@mantine/core";

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
      <Tooltip label={listening ? "Listening..." : "Click the mic to speak"} position="top">
      <button className="mic-button">
        🎤
      </button>
      </Tooltip>
    </div>
  );
}
