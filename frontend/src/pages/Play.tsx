// src/pages/Play.tsx
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";

const sampleText = `The quick brown fox jumps over the lazy dog. Practice typing fast and accurately with this test to improve your skills.`;

const timeOptions = [1, 2, 3, 5]; // minutes
const difficulties = ["Easy", "Medium", "Hard"];

const Play = () => {
  const [input, setInput] = useState("");
  const [selectedTime, setSelectedTime] = useState(2);
  const [timeLeft, setTimeLeft] = useState(120); // 2 mins
  const [timerRunning, setTimerRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [errors, setErrors] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [difficulty, setDifficulty] = useState("Medium");

  const hiddenInputRef = useRef<HTMLInputElement>(null);

  // Always focus the hidden input
  useEffect(() => {
    hiddenInputRef.current?.focus();
  }, []);

  // Ghost + typed overlay
  const renderText = useMemo(
    () =>
      sampleText.split("").map((char, idx) => {
        if (idx < input.length) {
          return (
            <span
              key={idx}
              className={
                input[idx] === char ? "text-black" : "text-red-500"
              }
            >
              {char}
            </span>
          );
        }
        return (
          <span key={idx} className="text-gray-400">
            {char}
          </span>
        );
      }),
    [input]
  );

  // Finish test
  const finishTest = useCallback(
    (finalInput: string) => {
      setCompleted(true);
      setTimerRunning(false);

      let errs = 0;
      for (let i = 0; i < finalInput.length; i++) {
        if (finalInput[i] !== sampleText[i]) errs++;
      }
      setErrors(errs);

      const wordsTyped = finalInput.trim().split(/\s+/).length;
      const minutesElapsed = (selectedTime * 60 - timeLeft) / 60 || 1 / 60;
      setWpm(Math.round(wordsTyped / minutesElapsed));

      setAccuracy(
        Math.max(
          0,
          Math.round(((finalInput.length - errs) / finalInput.length) * 100)
        )
      );
    },
    [selectedTime, timeLeft]
  );

  // Handle typing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (completed) return;
    if (!timerRunning) setTimerRunning(true);

    const value = e.target.value;
    setInput(value);

    if (value.length >= sampleText.length) finishTest(value);
  };

  // Restart test
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

  // Timer
  useEffect(() => {
    if (!timerRunning || completed) return;
    if (timeLeft <= 0) {
      finishTest(input);
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timerRunning, timeLeft, completed, finishTest, input]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 md:px-12 py-12 gap-6">
      {/* Left: Typing area */}
      <div
        className="flex-1 max-w-3xl p-6 border-2 border-black rounded-lg shadow-md bg-gray-50 cursor-text"
        onClick={() => hiddenInputRef.current?.focus()}
      >
        <div className="min-h-[200px] text-lg md:text-xl leading-relaxed">
          {renderText}
        </div>
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
        <Dropdown
          label="Select Time"
          value={selectedTime}
          onChange={(val) => {
            setSelectedTime(val);
            setTimeLeft(val * 60);
            handleRestart();
          }}
          options={timeOptions.map((t) => ({ label: `${t} min`, value: t }))}
          disabled={timerRunning}
        />

        {/* Difficulty Dropdown */}
        <Dropdown
          label="Difficulty"
          value={difficulty}
          onChange={(val) => setDifficulty(val)}
          options={difficulties.map((d) => ({ label: d, value: d }))}
        />

        {/* Buttons */}
        <div className="flex flex-col gap-2 mt-4">
          <Link
            to="/"
            className="px-4 py-2 bg-black text-white rounded-md shadow-md font-patrick hover:scale-105 transition-transform text-center"
          >
            Back to Home
          </Link>
          <button
            onClick={handleRestart}
            className="px-4 py-2 bg-yellow-400 text-black rounded-md shadow-md font-patrick hover:scale-105 transition-transform"
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
        <Modal onRestart={handleRestart} wpm={wpm} errors={errors} accuracy={accuracy} />
      )}
    </div>
  );
};

// Reusable Dropdown
const Dropdown = ({
  label,
  value,
  onChange,
  options,
  disabled = false,
}: {
  label: string;
  value: any;
  onChange: (val: any) => void;
  options: { label: string; value: any }[];
  disabled?: boolean;
}) => (
  <div className="flex flex-col gap-2">
    <label className="font-patrick text-lg">{label}:</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="px-4 py-2 border-2 border-black rounded-md font-patrick shadow-md"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

// Modal Component
const Modal = ({
  onRestart,
  wpm,
  errors,
  accuracy,
}: {
  onRestart: () => void;
  wpm: number;
  errors: number;
  accuracy: number;
}) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
      <h2 className="text-2xl mb-2 font-passero">Test Completed!</h2>
      <p>WPM: {wpm}</p>
      <p>Errors: {errors}</p>
      <p>Accuracy: {accuracy}%</p>
      <button
        onClick={onRestart}
        className="mt-4 px-6 py-2 bg-yellow-400 text-black rounded-md shadow-md font-patrick hover:scale-105 transition-transform"
      >
        Restart
      </button>
    </div>
  </div>
);

export default Play;
