import React, { useState } from "react";
import { FaCheckCircle, FaRedo, FaSpinner } from "react-icons/fa";

const CompanyTest = () => {
  const [companies, setCompanies] = useState([
    "Google",
    "Amazon",
    "Microsoft",
    "Meta",
    "Netflix",
  ]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);

  const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const fetchTestQuestions = async (company) => {
    if (!company) return;
    setLoading(true);
    try {
      const res = await fetch(`https://interview-d45g.onrender.com/api/tests/${company}`);
      const data = await res.json();
      setQuestions(shuffleArray(data));
      setCurrentIndex(0);
      setScore(0);
      setShowScore(false);
      setSelectedCompany(company);
      if (!companies.includes(company)) {
        setCompanies([...companies, company]);
      }
    } catch (err) {
      console.error("Error fetching questions", err);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowScore(true);
    }
  };

  const handleOptionClick = () => {
    setScore(score + 1);
    handleNext();
  };

  const handleSkip = () => {
    handleNext();
  };

  const restartTest = () => {
    fetchTestQuestions(selectedCompany);
  };

  const goBackToSelection = () => {
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setShowScore(false);
    setSelectedCompany("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-indigo-300 to-purple-200 px-20 py-5 flex items-center justify-center">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 relative">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-6">
          <br></br>🏢 Company Mock Test
        </h1>

        {/* Back Button */}
        {questions.length > 0 && !showScore && !loading && (
          <button
            onClick={goBackToSelection}
            className="absolute top-4 right-4 bg-gray-200 px-3 py-1 text-sm rounded-lg hover:bg-gray-300"
          >
            ← Back
          </button>
        )}

        {/* Company Selection View */}
        {questions.length === 0 && !loading && (
          <>
            <h2 className="text-lg font-medium text-center mb-4 text-gray-700">
              Select a company to begin:
            </h2>

            {/* Company Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              {companies.map((company, idx) => (
                <button
                  key={idx}
                  onClick={() => fetchTestQuestions(company)}
                  className="bg-indigo-200 hover:bg-indigo-300 transition p-4 rounded-xl shadow text-center font-semibold text-indigo-800"
                >
                  {company}
                </button>
              ))}
            </div>

            {/* Manual Company Input */}
            <div className="flex flex-col items-center gap-2">
              <label className="text-sm font-medium text-gray-700">
                Or type your own company:
              </label>
              <input
                list="company-list"
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") fetchTestQuestions(selectedCompany);
                }}
                placeholder="e.g., Adobe"
                className="border border-indigo-300 p-2 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-64"
              />
              <datalist id="company-list">
                {companies.map((company, idx) => (
                  <option key={idx} value={company} />
                ))}
              </datalist>
              <button
                onClick={() => fetchTestQuestions(selectedCompany)}
                className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Start Test
              </button>
            </div>
          </>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center text-indigo-600 font-semibold text-lg flex items-center justify-center gap-2">
            <FaSpinner className="animate-spin" /> Loading questions...
          </div>
        )}

        {/* Quiz Section */}
        {questions.length > 0 && !showScore && !loading && (
          <div className="bg-indigo-50 p-6 rounded-xl shadow-md mt-4">
            <h2 className="text-lg text-indigo-600 font-semibold mb-2">
              📌 Company: {selectedCompany}
            </h2>

            {/* Progress Bar */}
            <div className="mb-4 w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentIndex + 1) / questions.length) * 100}%`,
                }}
              ></div>
            </div>

            {/* Question */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-1">
                Question {currentIndex + 1} of {questions.length}
              </h3>
              <p className="text-gray-800 mb-3">
                {questions[currentIndex].question}
              </p>

              <div className="text-sm text-gray-600 space-x-4">
                <span className="bg-blue-100 px-2 py-1 rounded-full">
                  Topic: {questions[currentIndex].topic}
                </span>
                <span className="bg-yellow-100 px-2 py-1 rounded-full">
                  Difficulty: {questions[currentIndex].difficulty}
                </span>
                <span className="bg-green-100 px-2 py-1 rounded-full">
                  Status: {questions[currentIndex].status}
                </span>
              </div>
            </div>

            {/* Answer Buttons */}
            <div className="mt-4 flex flex-col md:flex-row gap-4">
              <button
                onClick={handleOptionClick}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2 w-full md:w-auto"
              >
                <FaCheckCircle /> Mark as Solved
              </button>
              <button
                onClick={handleSkip}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition flex items-center gap-2 w-full md:w-auto"
              >
                ❌ Didn’t Solve
              </button>
            </div>
          </div>
        )}

        {/* Score Display */}
        {showScore && (
          <div className="text-center mt-10 bg-green-50 p-6 rounded-xl shadow-md">
            <h2 className="text-3xl font-bold text-green-700">
              🎉 Test Completed!
            </h2>
            <p className="text-xl mt-3 text-gray-800">
              Score: <span className="font-semibold">{score}</span> /{" "}
              {questions.length}
            </p>

            <div className="mt-4 text-sm text-gray-700 space-y-1">
              <p>
                ✅ Easy:{" "}
                {questions.filter((q) => q.difficulty === "Easy").length}
              </p>
              <p>
                ⚠️ Medium:{" "}
                {questions.filter((q) => q.difficulty === "Medium").length}
              </p>
              <p>
                🚨 Hard:{" "}
                {questions.filter((q) => q.difficulty === "Hard").length}
              </p>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={restartTest}
                className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition flex items-center gap-2"
              >
                <FaRedo /> Restart Test
              </button>
              <button
                onClick={goBackToSelection}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                🔙 Back to Company Selection
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyTest;
