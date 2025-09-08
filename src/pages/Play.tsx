// src/pages/Play.tsx
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const sampleText = `The quick brown fox jumps over the lazy dog. Practice typing fast and accurately with this test to improve your skills.`;

const timeOptions = [1, 2, 3, 5]; // minutes
const difficulties = ["Easy", "Medium", "Hard"];

const Play = () => {
  const [text] = useState(sampleText);
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(2 * 60); // default 2 min
  const [selectedTime, setSelectedTime] = useState(2);
  const [timerRunning, setTimerRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [errors, setErrors] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [difficulty, setDifficulty] = useState("Medium");

  const hiddenInputRef = useRef<HTMLInputElement>(null);

  // Focus hidden input on mount
  useEffect(() => {
    hiddenInputRef.current?.focus();
  }, []);

  // Handle typing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (completed) return;
    if (!timerRunning) setTimerRunning(true);

    const value = e.target.value;
    setInput(value);

    if (value.length >= text.length) finishTest(value);
  };

  const finishTest = (finalInput: string) => {
    setCompleted(true);
    setTimerRunning(false);

    // Errors
    let errs = 0;
    for (let i = 0; i < finalInput.length; i++) {
      if (finalInput[i] !== text[i]) errs++;
    }
    setErrors(errs);

    // WPM
    const wordsTyped = finalInput.trim().split(/\s+/).length;
    const minutesElapsed = (selectedTime * 60 - timeLeft) / 60 || 1 / 60;
    setWpm(Math.round(wordsTyped / minutesElapsed));

    // Accuracy
    setAccuracy(Math.max(0, Math.round(((finalInput.length - errs) / finalInput.length) * 100)));
  };

  const handleRestart = () => {
    setInput("");
    setErrors(0);
    setWpm(0);
    setAccuracy(100);
    setTimeLeft(selectedTime * 60);
    setTimerRunning(false);
    setCompleted(false);
    hiddenInputRef.current?.focus();
  };

  const handleTimeChange = (minutes: number) => {
    setSelectedTime(minutes);
    setTimeLeft(minutes * 60);
    handleRestart();
  };

  const handleDifficultyChange = (diff: string) => setDifficulty(diff);

  // Timer
  useEffect(() => {
    if (!timerRunning || completed) return;
    if (timeLeft <= 0) {
      finishTest(input);
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timerRunning, timeLeft, completed]);

  // Ghost + typed overlay
  const renderText = () =>
    text.split("").map((char, idx) => {
      let className = "text-gray-400";
      if (idx < input.length) className = char === input[idx] ? "text-black" : "text-red-500";
      return (
        <span key={idx} className={`font-patrick ${className}`}>
          {char}
        </span>
      );
    });

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 md:px-12 py-12 gap-6">
      {/* Left: Ghost + Typing */}
      <div
        className="flex-1 max-w-3xl p-6 border-2 border-black rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,0.25)] bg-gray-50 cursor-text"
        onClick={() => hiddenInputRef.current?.focus()}
      >
        <div className="min-h-[200px] text-lg md:text-xl leading-relaxed">
          {renderText()}
        </div>

        {/* Hidden Input for capturing keystrokes */}
        <input
          ref={hiddenInputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          disabled={completed}
          className="absolute opacity-0 pointer-events-none"
        />
      </div>

      {/* Right: Controls */}
      <div className="w-64 flex flex-col gap-4">
        {/* Timer Dropdown */}
        <div className="flex flex-col gap-2">
          <label className="font-patrick text-lg">Select Time:</label>
          <select
            value={selectedTime}
            onChange={(e) => handleTimeChange(Number(e.target.value))}
            disabled={timerRunning}
            className="px-4 py-2 border-2 border-black rounded-md font-patrick shadow-[4px_4px_0px_rgba(0,0,0,0.25)]"
          >
            {timeOptions.map((t) => (
              <option key={t} value={t}>
                {t} min
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Dropdown */}
        <div className="flex flex-col gap-2">
          <label className="font-patrick text-lg">Difficulty:</label>
          <select
            value={difficulty}
            onChange={(e) => handleDifficultyChange(e.target.value)}
            className="px-4 py-2 border-2 border-black rounded-md font-patrick shadow-[4px_4px_0px_rgba(0,0,0,0.25)]"
          >
            {difficulties.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2 mt-4">
          <Link
            to="/"
            className="px-4 py-2 bg-black text-white rounded-md shadow-[4px_4px_0px_rgba(0,0,0,0.25)] font-patrick hover:scale-105 transition-transform text-center"
          >
            Back to Home
          </Link>
          <button
            onClick={handleRestart}
            className="px-4 py-2 bg-yellow-400 text-black rounded-md shadow-[4px_4px_0px_rgba(0,0,0,0.25)] font-patrick hover:scale-105 transition-transform"
          >
            Restart
          </button>
        </div>

        {/* Timer */}
        <div className="font-patrick text-lg mt-4">
          Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
      </div>

      {/* Results Modal */}
      {completed && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-[6px_6px_0px_rgba(0,0,0,0.25)] max-w-md w-full text-center">
            <h2 className="text-2xl mb-2 font-passero">Test Completed!</h2>
            <p>WPM: {wpm}</p>
            <p>Errors: {errors}</p>
            <p>Accuracy: {accuracy}%</p>
            <button
              onClick={handleRestart}
              className="mt-4 px-6 py-2 bg-yellow-400 text-black rounded-md shadow-[4px_4px_0px_rgba(0,0,0,0.25)] font-patrick hover:scale-105 transition-transform"
            >
              Restart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Play;
