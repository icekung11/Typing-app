import { useState, useEffect, useRef } from "react";
import "./App.css";

const TEXTS = [
  "the quick brown fox jumps over the lazy dog",
  "practice makes perfect typing speed improves daily",
  "react is fun when you build real projects",
  "coding every day will make you better faster"
];

const KEYS = [
  ["q","w","e","r","t","y","u","i","o","p"],
  ["a","s","d","f","g","h","j","k","l"],
  ["z","x","c","v","b","n","m"]
];

export default function App() {
  const [text, setText] = useState(TEXTS[0]);
  const [input, setInput] = useState("");
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);
  const [finished, setFinished] = useState(false);
  const [activeKey, setActiveKey] = useState("");
  const [dark, setDark] = useState(true);

  const inputRef = useRef();

 useEffect(() => {
  if (!finished) inputRef.current.focus();
}, [text, finished]);

useEffect(() => {
  let interval;
  if (start && !finished) {
    interval = setInterval(() => {
      setTime(t => t + 1);
    }, 1000);
  }
  return () => clearInterval(interval);
}, [start, finished]);

  // keyboard highlight
  useEffect(() => {
    const down = (e) => setActiveKey(e.key.toLowerCase());
    const up = () => setActiveKey("");

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  const handleChange = (e) => {
    const nextInput = e.target.value.slice(0, text.length);
    if (!start) setStart(true);
    setInput(nextInput);
    if (nextInput.length === text.length && text.length > 0) {
      setStart(false);
      setFinished(true);
    }
  };

  const handleVirtualKey = (key) => {
    inputRef.current.focus();

    if (key === "backspace") {
      setInput((currentInput) => currentInput.slice(0, -1));
      return;
    }

    if (input.length < text.length) {
      const nextInput = input + key;
      if (!start) setStart(true);
      setInput(nextInput);
      if (nextInput.length === text.length) {
        setStart(false);
        setFinished(true);
      }
    }
  };

  const handleVirtualKeyDown = (event, key) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleVirtualKey(key);
    }
  };

  const getWPM = () => {
    if (!time) return 0;
    return Math.round((input.length / 5) / (time / 60));
  };

  const getAccuracy = () => {
    if (!input.length) return 100;

    let correct = 0;

    for (let i = 0; i < input.length; i++) {
      if (input[i] === text[i]) correct++;
    }

    return Math.round((correct / input.length) * 100);
  };

  const getCorrectChars = () => {
    return [...input].reduce(
      (correct, char, index) => correct + (char === text[index] ? 1 : 0),
      0
    );
  };

  const getMistakes = () => input.length - getCorrectChars();

  const resetGame = () => {
    const t = TEXTS[Math.floor(Math.random() * TEXTS.length)];
    setText(t);
    setInput("");
    setTime(0);
    setStart(false);
    setFinished(false);
    setTimeout(() => {inputRef.current.focus()}, 0);
  };

  const theme = dark
    ? {
        bg: "linear-gradient(135deg,#0f172a,#020617)",
        card: "rgba(255,255,255,0.05)",
        text: "#e2e8f0",
        sub: "#64748b",
        primary: "#a78bfa"
      }
    : {
        bg: "linear-gradient(135deg,#f8fafc,#ffffff)",
        card: "rgba(255,255,255,0.9)",
        text: "#0f172a",
        sub: "#94a3b8",
        primary: "#6366f1"
      };

  const header = (
    <header style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "16px",
      marginBottom: "30px",
      flexWrap: "wrap"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "11px" }}>
        <span aria-hidden="true" style={{
          display: "grid",
          placeItems: "center",
          width: "38px",
          height: "38px",
          borderRadius: "12px",
          background: dark ? "rgba(167,139,250,0.16)" : "rgba(99,102,241,0.1)",
          color: theme.primary,
          fontFamily: "Georgia, serif",
          fontSize: "23px",
          fontWeight: 700
        }}>t.</span>
        <div style={{ textAlign: "left" }}>
          <div style={{
            color: theme.text,
            fontFamily: "system-ui, sans-serif",
            fontSize: "17px",
            fontWeight: 700,
            letterSpacing: "-0.4px",
            lineHeight: 1.2
          }}>typing lab</div>
          <div style={{
            marginTop: "3px",
            color: theme.sub,
            fontFamily: "system-ui, sans-serif",
            fontSize: "11px",
            letterSpacing: "0.2px"
          }}>A place to practice</div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
        <button
          onClick={resetGame}
          aria-label="Start a new test"
          title="New test"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            minHeight: "40px",
            padding: "0 13px",
            border: `1px solid ${dark ? "rgba(148,163,184,0.2)" : "rgba(100,116,139,0.2)"}`,
            borderRadius: "11px",
            background: dark ? "rgba(255,255,255,0.05)" : "#ffffff",
            color: theme.text,
            fontSize: "13px",
            boxShadow: "none"
          }}
        >
          <span aria-hidden="true">↻</span>
          <span>New test</span>
        </button>
        <button
          onClick={() => setDark((currentDark) => !currentDark)}
          aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
          aria-pressed={dark}
          title={`Switch to ${dark ? "light" : "dark"} mode`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            minHeight: "40px",
            padding: "0 14px",
            border: `1px solid ${dark ? "rgba(167,139,250,0.35)" : "rgba(99,102,241,0.25)"}`,
            borderRadius: "11px",
            background: dark ? "rgba(167,139,250,0.12)" : "rgba(99,102,241,0.08)",
            color: theme.text,
            fontSize: "13px",
            fontWeight: 600,
            boxShadow: "none"
          }}
        >
          <span aria-hidden="true" style={{ fontSize: "16px", lineHeight: 1 }}>
            {dark ? "☾" : "☀"}
          </span>
          <span>{dark ? "Dark mode" : "Light mode"}</span>
          <span aria-hidden="true" style={{
            width: "25px",
            height: "14px",
            marginLeft: "2px",
            padding: "2px",
            borderRadius: "10px",
            background: dark ? theme.primary : "#cbd5e1",
            boxSizing: "border-box",
            display: "flex",
            justifyContent: dark ? "flex-end" : "flex-start"
          }}>
            <span style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#ffffff"
            }} />
          </span>
        </button>
      </div>
    </header>
  );

  // RESULT SCREEN
  if (finished) {
    return (
      <main className={`result-screen ${dark ? "result-screen--dark" : "result-screen--light"}`} style={{
        background: theme.bg,
        color: theme.text
      }}>
        <section className="result-card" style={{
          background: theme.card,
          boxShadow: dark
            ? "0 24px 80px rgba(0,0,0,0.45)"
            : "0 24px 80px rgba(15,23,42,0.1)"
        }}>
          {header}
          <div className="result-content">
            <div className="result-badge">
              <span className="result-badge__icon" aria-hidden="true">✓</span>
              <span>TEST COMPLETE</span>
            </div>
            <h1 className="result-title">Nice work.</h1>
            <p className="result-subtitle">Here’s your progress from this round.</p>

            <div className="result-score">
              <span className="result-score__number">{getWPM()}</span>
              <span className="result-score__unit">WPM</span>
              <span className="result-score__caption">typing speed</span>
            </div>

            <div className="result-accuracy">
              <div className="result-accuracy__heading">
                <span>Accuracy</span>
                <strong>{getAccuracy()}%</strong>
              </div>
              <div
                className="result-accuracy__track"
                role="progressbar"
                aria-label="Typing accuracy"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={getAccuracy()}
              >
                <span style={{ width: `${getAccuracy()}%` }} />
              </div>
            </div>

            <div className="result-metrics">
              <div className="result-metric">
                <span className="result-metric__icon" aria-hidden="true">◷</span>
                <span className="result-metric__label">Time</span>
                <strong>{time}<small> sec</small></strong>
              </div>
              <div className="result-metric">
                <span className="result-metric__icon result-metric__icon--correct" aria-hidden="true">✓</span>
                <span className="result-metric__label">Correct</span>
                <strong>{getCorrectChars()}<small> chars</small></strong>
              </div>
              <div className="result-metric">
                <span className="result-metric__icon result-metric__icon--mistake" aria-hidden="true">×</span>
                <span className="result-metric__label">Mistakes</span>
                <strong>{getMistakes()}<small> chars</small></strong>
              </div>
            </div>

            <button className="result-retry" onClick={resetGame}>
              <span>Try another passage</span>
              <span className="result-retry__arrow" aria-hidden="true">→</span>
            </button>
            <p className="result-note">Every round is a little more practice.</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      padding: "clamp(16px,3vw,40px)",
      background: theme.bg,
      display: "flex",
      justifyContent: "center"  ,
      alignItems: "center",
      fontFamily: "monospace",
      color: theme.text,

    }}>

      <div style={{
        width: "100%",
        maxWidth: "1200px",
        padding: "clamp(20px,4vw,60px)",
        borderRadius: "20px",
        background: theme.card,
        backdropFilter: "blur(20px)",
        boxShadow: dark
          ? "0 20px 80px rgba(0,0,0,0.6)"
          : "0 10px 40px rgba(0,0,0,0.1)"
      }}>

        {header}

        {/* TEXT */}
        <div
          onClick={() => inputRef.current?.focus()}
          style={{
            fontSize: "clamp(18px,3.5vw,30px)",
            lineHeight: "clamp(32px,5vw,48px)",
            letterSpacing: "1px",
            wordBreak: "break-word",
            cursor: "text"
          }}
        >
          {text.split("").map((char, i) => {
            let color = theme.sub;
            let opacity = 1;
            let backgroundColor = "transparent";

            if (i >= input.length) {
              opacity = 0.5;
            } else {
              const isCorrect = input[i] === char;
              color = isCorrect
                ? (dark ? "#86efac" : "#166534")
                : (dark ? "#fca5a5" : "#b91c1c");
              backgroundColor = isCorrect
                ? (dark ? "rgba(34,197,94,0.12)" : "rgba(22,101,52,0.09)")
                : (dark ? "rgba(239,68,68,0.2)" : "rgba(185,28,28,0.12)");
            }

            const active = i === input.length;

            return (
              <span key={i} style={{
                position: "relative",
                color,
                opacity,
                backgroundColor,
                borderRadius: "3px"
              }}>
                {char}

                {active && (
                  <span style={{
                    position: "absolute",
                    bottom: "-4px",
                    left: 0,
                    width: "100%",
                    height: "2px",
                    background: theme.primary,
                    boxShadow: `0 0 8px ${theme.primary}`,
                    animation: "blink 1s infinite"
                  }} />
                )}
              </span>
            );
          })}
        </div>

        <input
          ref={inputRef}
          value={input}
          onChange={handleChange}
          style={{ opacity: 0, position: "absolute" }}
        />

        {/* STATS */}
        <div style={{
          marginTop: "30px",
          display: "flex",
          gap: "30px",
          flexWrap: "wrap"
        }}>
          <div>⏱ {time}s</div>
          <div style={{ color: theme.primary }}>
            ⚡ {getWPM()} WPM
          </div>
          <div>🎯 {getAccuracy()}%</div>
        </div>

        {/* KEYBOARD */}
        <div style={{ marginTop: "40px" }}>
          {KEYS.map((row, i) => (
            <div key={i}>
              {row.map((key) => {
                const isActive = activeKey === key;

                return (
                  <span
                    key={key}
                    role="button"
                    tabIndex={0}
                    aria-label={`Type ${key}`}
                    onClick={() => handleVirtualKey(key)}
                    onKeyDown={(event) => handleVirtualKeyDown(event, key)}
                    style={{
                      display: "inline-block",
                      padding: "10px",
                      margin: "4px",
                      width: "40px",
                      textAlign: "center",
                      borderRadius: "8px",
                      cursor: "pointer",
                      userSelect: "none",
                      background: isActive
                        ? theme.primary
                        : "rgba(255,255,255,0.05)",
                      color: isActive ? "#000" : theme.sub,
                      transform: isActive ? "scale(1.1)" : "scale(1)",
                      transition: "0.1s"
                    }}
                  >
                    {key}
                  </span>
                );
              })}
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "4px" }}>
            <span
              role="button"
              tabIndex={0}
              aria-label="Type a space"
              onClick={() => handleVirtualKey(" ")}
              onKeyDown={(event) => handleVirtualKeyDown(event, " ")}
              style={{
                display: "inline-block",
                width: "220px",
                padding: "10px",
                margin: "4px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.05)",
                color: theme.sub,
                cursor: "pointer",
                userSelect: "none",
                textAlign: "center"
              }}
            >
              space
            </span>
            <span
              role="button"
              tabIndex={0}
              aria-label="Delete the last character"
              onClick={() => handleVirtualKey("backspace")}
              onKeyDown={(event) => handleVirtualKeyDown(event, "backspace")}
              style={{
                display: "inline-block",
                padding: "10px",
                margin: "4px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.05)",
                color: theme.sub,
                cursor: "pointer",
                userSelect: "none"
              }}
            >
              ⌫
            </span>
          </div>
        </div>

      </div>

      <style>
        {`

          button {
            background: linear-gradient(135deg,#6366f1,#a78bfa);
            border: none;
            padding: 8px 14px;
            border-radius: 10px;
            color: white;
            cursor: pointer;
            transition: 0.2s;
          }

          button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(99,102,241,0.4);
          }

          @keyframes blink {
            0%,100% { opacity:1 }
            50% { opacity:0 }
          }
        `}
      </style>

    </div>
  );
}
