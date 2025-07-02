import React, { useEffect, useState } from "react";
import { FaBuilding, FaBookOpen, FaChartLine, FaStickyNote } from "react-icons/fa";


// Utility to shuffle array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Flashcard Component
const Flashcard = ({ question, flipped, onFlip, timeLeft }) => {
  return (
    <div
      className="relative w-full max-w-xl h-64 mx-auto mb-6"
      onClick={onFlip}
      style={{ perspective: "1000px" }}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 ${
          flipped ? "rotate-y-180" : ""
        }`}
        style={{
          transformStyle: "preserve-3d",
          position: "relative",
        }}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 bg-white rounded-3xl shadow-xl flex items-center justify-center text-center px-8 py-6"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <h2 className="text-2xl font-semibold text-gray-800">
            {question.question}
          </h2>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 bg-gray-100 rounded-3xl shadow-xl px-8 py-6 text-gray-700 font-medium leading-relaxed transform rotate-y-180"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
         <p>
            <span className="text-indigo-600 font-semibold text-l text-center block tracking-wide px-1.5 py-0.5 rounded-md bg-indigo-100 shadow-sm">Company:</span>{" "}
            {question.company}
          </p>
          <p> 
            <span className="text-indigo-600 font-semibold text-l text-center block tracking-wide px-1.5 py-0.5 rounded-md bg-indigo-100 shadow-sm">Topic:</span>{" "}
            {question.topic}
          </p>
          <p>
            <span className="text-indigo-600 font-semibold text-l text-center block tracking-wide px-1.5 py-0.5 rounded-md bg-indigo-100 shadow-sm">Difficulty:</span>{" "}
            {question.difficulty}
          </p>
          <p>
            <span className="text-indigo-600 font-semibold text-l text-center block tracking-wide px-1.5 py-0.5 rounded-md bg-indigo-100 shadow-sm">Notes:</span>{" "}
            {question.notes || "No notes"}
          </p>
        </div>
      </div>

      {/* Timer Ring */}
      {!flipped && (
        <div className="absolute top-4 right-4 w-10 h-10">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e6e6e6"
              strokeWidth="2"
            />
            <path
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831"
              fill="none"
              stroke="#4f46e5"
              strokeWidth="2"
              strokeDasharray={`${(timeLeft / 10) * 100}, 100`}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-indigo-700">
            {timeLeft}s
          </span>
        </div>
      )}
    </div>
  );
};

// Main Revision Component
const Revision = () => {
  const [originalQuestions, setOriginalQuestions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch("http://localhost:5000/api/questions");
      const data = await res.json();
      setOriginalQuestions(data);
      setQuestions(shuffleArray(data));
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (!questions.length || paused) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          nextCard();
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [current, questions, paused]);

  const handleFlip = () => {
    if (timeLeft === 0) return;
    setFlipped((prev) => !prev);
    setPaused((prev) => !prev);
  };

  const nextCard = () => {
    setFlipped(false);
    setPaused(false);
    setCurrent((prev) => (prev + 1) % questions.length);
    setTimeLeft(10);
  };

  const prevCard = () => {
    setFlipped(false);
    setPaused(false);
    setCurrent((prev) => (prev === 0 ? questions.length - 1 : prev - 1));
    setTimeLeft(10);
  };

  const reshuffleCards = () => {
    const shuffled = shuffleArray(originalQuestions);
    setQuestions(shuffled);
    setCurrent(0);
    setFlipped(false);
    setPaused(false);
    setTimeLeft(10);
  };

  return (
    <div className="p-8 min-h-screen  bg-gradient-to-br from-indigo-200 via-indigo-300 to-purple-200   ">
      <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-6">
        <br></br><br></br>✨ Revision Mode
      </h1>

      {questions.length > 0 ? (
        <>
          <p className="text-center mb-4 text-gray-600 font-medium">
            Card {current + 1} of {questions.length}
          </p>

          <Flashcard
            question={questions[current]}
            flipped={flipped}
            onFlip={handleFlip}
            timeLeft={timeLeft}
          />

          <div className="flex justify-center flex-wrap gap-4 mt-6">
            <button
              onClick={prevCard}
              className="bg-indigo-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-indigo-600 transition-all"
            >
              ⬅ Previous
            </button>
            <button
              onClick={nextCard}
              className="bg-green-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-600 transition-all"
            >
              Next ➡
            </button>
            <button
              onClick={reshuffleCards}
              className="bg-blue-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-600 transition-all"
            >
              🔄 Reshuffle
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-8">
          Loading questions...
        </p>
      )}
    </div>
  );
};

export default Revision;
