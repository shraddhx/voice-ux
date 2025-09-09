import React, { useState } from "react";
import MicButton from "./MicButton";
import { Tooltip, Button } from "@mantine/core";

function App() {
  const [listening, setListening] = useState(false);
  const [convo, setConvo] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

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
    addMessage("Assistant", "…"); // placeholder

    let reply = "Sorry, I didn’t catch that.";
    if (text.toLowerCase().includes("hello")) {
      reply = "Hi there! How are you?";
    } else if (text.toLowerCase().includes("time")) {
      reply = `The current time is ${new Date().toLocaleTimeString()}`;
    } else if (text.toLowerCase().includes("name")) {
      reply = "My name is Voice Assistant.";
    } else if (text.toLowerCase().includes("switch") && text.toLowerCase().includes("theme")) {
      reply = "I have switched the theme for you. Please let me know if there is anything else I can do";
      setDarkMode(!darkMode);
    } else if (text.toLowerCase().includes("clear") && text.toLowerCase().includes("chat")) {
      setConvo([]);
      return;
    } else if (text.toLowerCase().includes("increase") && text.toLowerCase().includes("font")) {
      // increase the font
    } else if (text.toLowerCase().includes("decrease") && text.toLowerCase().includes("font")) {
      // decrease the font
    }

    setTimeout(() => {
      setConvo((prev) => prev.slice(0, -1)); // remove placeholder
      addMessage("Assistant", reply);
      speak(reply);
    }, 1000);
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
    <div
      style={{
        ...styles.page,
        backgroundColor: darkMode ? "#121212" : "#ffffff",
        color: darkMode ? "#f1f1f1" : "#000000",
      }}
    >
      {/* Toggle button in top-left corner */}
      <Tooltip label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"} position="bottom" withArrow>
        <Button
          onClick={() => setDarkMode(!darkMode)}
          variant="light"
          color={darkMode ? "yellow" : "blue"}
          radius="md"
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
          }}
        >
          {darkMode ? "☀️" : "🌙"}
        </Button>
      </Tooltip>

      <Tooltip label={"Decrease Font"} position="bottom" withArrow>
        <Button
          onClick={() => setDarkMode(!darkMode)}
          variant="light"
          color={darkMode ? "yellow" : "blue"}
          radius="md"
          style={{
            position: "absolute",
            top: "10px",
            left: "70px",
          }}
        >
          {"➖"}
        </Button>
      </Tooltip>

      <Tooltip label={"Increase Font"} position="bottom" withArrow>
        <Button
          onClick={() => setDarkMode(!darkMode)}
          variant="light"
          color={darkMode ? "yellow" : "blue"}
          radius="md"
          style={{
            position: "absolute",
            top: "10px",
            left: "130px",
          }}
        >
          {"➕"}
        </Button>
      </Tooltip>

      {/* Left half: mic controls */}
      <div
        style={{
          ...styles.leftPane,
          backgroundColor: darkMode ? "#1e1e1e" : "#f0f4ff",
        }}
      >
        <h1 style={styles.title}>🎤 Voice Assistant</h1>
        <MicButton listening={listening} toggleListening={toggleListening} />
        <p style={{ marginTop: "80px" }}>
          {listening ? "Listening..." : "Click the mic to speak"}
        </p>
      </div>

      {/* Right half: transcript */}
      <div
        style={{
          ...styles.rightPane,
          backgroundColor: darkMode ? "#181818" : "#fff",
          borderLeft: darkMode ? "2px solid #333" : "2px solid #ccc",
        }}
      >
        <h2 style={styles.subtitle}>📝 Transcript</h2>
        <div
          style={{
            ...styles.log,
            background: darkMode ? "#222" : "#fafafa",
            border: darkMode ? "1px solid #444" : "1px solid #ddd",
          }}
        >
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  rightPane: {
    flex: 1,
    padding: "20px",
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
  log: {
    padding: "10px",
    borderRadius: "8px",
    height: "80%",
    overflowY: "auto",
  },
};

export default App;
