import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddQuestion = () => {
  const [question, setQuestion] = useState('');
  const [company, setCompany] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [topic, setTopic] = useState('');
  const [status, setStatus] = useState('To Do');
  const [notes, setNotes] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/questions', {
        question,
        company,
        difficulty,
        topic,
        status,
        notes,
      });
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Failed to add question');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-indigo-300 to-purple-200 px-4 py-10 flex items-center justify-center">
      <div className="max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-2xl border border-gray-300 transition-all">
        <h2 className="text-4xl font-extrabold text-center text-indigo-800 mb-8 tracking-tight">
          📝 Add Interview Question
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Question */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-800">
              Question
            </label>
            <input
              type="text"
              placeholder="e.g. Explain async/await in JavaScript"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-400 transition"
            />
          </div>

          {/* Company */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-800">
              Company
            </label>
            <input
              type="text"
              placeholder="e.g. Google"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-400 transition"
            />
          </div>

          {/* Difficulty */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-800">
              Difficulty
            </label>
            <input
              type="text"
              placeholder="Easy / Medium / Hard"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-400 transition"
            />
          </div>

          {/* Topic */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-800">
              Topic
            </label>
            <input
              type="text"
              placeholder="e.g. Arrays, Dynamic Programming"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-400 transition"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-800">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-400 transition"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-800">
              Notes <span className="text-gray-500">(optional)</span>
            </label>
            <textarea
              placeholder="Add any notes or explanations"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-400 transition"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-200"
            >
              ➕ Add Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQuestion;
