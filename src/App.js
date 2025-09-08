import React, { useState } from "react";
import MicButton from "./MicButton";

function App() {
  const [listening, setListening] = useState(false);
  const [convo, setConvo] = useState([]);

  let recognition;

  if ("webkitSpeechRecognition" in window) {
    recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const userText = event.results[0][0].transcript;
      addMessage("User", userText);
      handleResponse(userText);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  }

  const addMessage = (speaker, text) => {
    setConvo((prev) => [...prev, { speaker, text }]);
  };

  const handleResponse = (text) => {
    let reply = "Sorry, I didn’t catch that.";
    if (text.toLowerCase().includes("hello")) {
      reply = "Hi there! How are you?";
    } else if (text.toLowerCase().includes("time")) {
      reply = `The current time is ${new Date().toLocaleTimeString()}`;
    } else if (text.toLowerCase().includes("name")) {
      reply = "My name is Voice Assistant.";
    }
    addMessage("Assistant", reply);
    speak(reply);
  };

  const speak = (message) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(message);
    synth.speak(utterance);
  };

  const toggleListening = () => {
    if (listening) {
      recognition.stop();
      setListening(false);
    } else {
      recognition.start();
      setListening(true);
    }
  };

  return (
    <div style={styles.page}>
      {/* Left half: mic controls */}
      <div style={styles.leftPane}>
        <h1 style={styles.title}>🎤 Voice Assistant</h1>
        <MicButton listening={listening} toggleListening={toggleListening} />
        <p style={{ marginTop: "20px" }}>
          {listening ? "Listening..." : "Click the mic to speak"}
        </p>
      </div>

      {/* Right half: transcript */}
      <div style={styles.rightPane}>
        <h2 style={styles.subtitle}>📝 Transcript</h2>
        <div style={styles.log}>
          {convo.map((msg, i) => (
            <p key={i}>
              <strong>{msg.speaker}:</strong> {msg.text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  leftPane: {
    flex: 1,
    backgroundColor: "#f0f4ff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  rightPane: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#fff",
    borderLeft: "2px solid #ccc",
    overflowY: "auto",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  subtitle: {
    fontSize: "1.5rem",
    marginBottom: "10px",
  },
  button: {
    fontSize: "1.2rem",
    padding: "15px 30px",
    borderRadius: "10px",
    cursor: "pointer",
    border: "none",
    backgroundColor: "#4c6ef5",
    color: "white",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
  },
  log: {
    background: "#fafafa",
    padding: "10px",
    borderRadius: "8px",
    height: "80%",
    overflowY: "auto",
    border: "1px solid #ddd",
  },
};

export default App;
