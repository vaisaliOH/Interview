import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const statusColors = {
  Done: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Skipped: "bg-red-100 text-red-700",
};

const difficultyColors = {
  Easy: "text-green-600",
  Medium: "text-yellow-600",
  Hard: "text-red-600",
};

const QuestionList = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [highlightedId, setHighlightedId] = useState(null);
  const [lastRandomId, setLastRandomId] = useState(null);
  const [randomQuestion, setRandomQuestion] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const cardRefs = useRef({});

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/questions");
      setQuestions(res.data);
    } catch (err) {
      console.error("Error fetching questions:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/questions/${id}`);
      setQuestions((prev) => prev.filter((q) => q._id !== id));
    } catch (err) {
      console.error("Error deleting question:", err);
    }
  };

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topic?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDifficulty = selectedDifficulty
      ? q.difficulty === selectedDifficulty
      : true;
    const matchesStatus = selectedStatus ? q.status === selectedStatus : true;

    return matchesSearch && matchesDifficulty && matchesStatus;
  });

  const handlePickRandom = () => {
    if (filteredQuestions.length === 0) return;

    let random;
    let attempts = 0;

    do {
      const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
      random = filteredQuestions[randomIndex];
      attempts++;
    } while (random._id === lastRandomId && attempts < 10);

    setRandomQuestion(random);
    setLastRandomId(random._id);
    setHighlightedId(random._id);
    setShowPopup(true);

    setTimeout(() => {
      cardRefs.current[random._id]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-indigo-300 to-purple-200 px-4 py-10 flex items-center justify-center">
      <div className="p-6 md:p-10 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-indigo-800 mb-8">
          <br></br>📚 All Questions
        </h2>

        {/* Controls */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <input
            type="text"
            placeholder="Search by question, company, or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
          >
            <option value="">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
          >
            <option value="">All Status</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <button
            onClick={handlePickRandom}
            className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
          >
            🎲 Pick Random
          </button>
        </div>

        {/* Question List */}
        {filteredQuestions.length === 0 ? (
          <p className="text-center text-gray-600">No matching questions found.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredQuestions.map((q) => (
              <div
                key={q._id}
                ref={(el) => (cardRefs.current[q._id] = el)}
                className={`bg-white border p-6 rounded-2xl shadow-md transition-all duration-300 ${
                  highlightedId === q._id
                    ? "ring-4 ring-purple-300"
                    : "hover:shadow-xl"
                }`}
              >
                <h3 className="text-xl font-semibold text-blue-700 mb-2">{q.question}</h3>
                <p className="text-sm text-gray-700"><strong>Company:</strong> {q.company || "N/A"}</p>
                <p className="text-sm text-gray-700"><strong>Topic:</strong> {q.topic || "N/A"}</p>

                <div className="flex justify-between items-center mt-4">
                  <span className={`font-medium ${difficultyColors[q.difficulty] || "text-gray-700"}`}>
                    Difficulty: {q.difficulty}
                  </span>
                  <span className={`px-2 py-1 rounded text-sm font-medium ${statusColors[q.status] || "bg-gray-100 text-gray-700"}`}>
                    {q.status}
                  </span>
                </div>

                {q.notes && (
                  <p className="mt-4 text-sm text-gray-600 italic">
                    <strong>Notes:</strong> {q.notes}
                  </p>
                )}

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => navigate(`/edit/${q._id}`)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(q._id)}
                    className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Popup Modal */}
        {showPopup && randomQuestion && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative border border-indigo-200">
              <h3 className="text-xl font-bold mb-4">🎯 Random Question</h3>
              <p className="text-lg font-medium mb-2">{randomQuestion.question}</p>
              <p className="text-sm text-gray-600"><strong>Company:</strong> {randomQuestion.company || "N/A"}</p>
              <p className="text-sm text-gray-600"><strong>Topic:</strong> {randomQuestion.topic || "N/A"}</p>
              <p className="text-sm text-gray-600"><strong>Difficulty:</strong> {randomQuestion.difficulty}</p>
              <p className="text-sm text-gray-600"><strong>Status:</strong> {randomQuestion.status}</p>
              {randomQuestion.notes && (
                <p className="mt-2 text-sm text-gray-600 italic">
                  <strong>Notes:</strong> {randomQuestion.notes}
                </p>
              )}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Optional Floating Button for Mobile */}
        <div className="md:hidden fixed bottom-5 right-5 z-50">
          <button
            onClick={handlePickRandom}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition"
          >
            🎲
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionList;
