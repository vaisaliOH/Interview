import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    question: "",
    company: "",
    topic: "",
    difficulty: "",
    status: "",
    todo: "",
    notes: "",
    
  });

  // ✅ Fetch existing question data on mount
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/questions/${id}`)
      .then((res) => {
        setFormData(res.data); // Fill form with fetched data
      })
      .catch((err) => {
        console.error("Failed to fetch question:", err);
      });
  }, [id]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle update form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://interview-d45g.onrender.com/api/questions/${id}`, formData)
      .then(() => {
        navigate("/view"); // Redirect to home
      })
      .catch((err) => {
        console.error("Failed to update question:", err);
      });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Edit Question</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="question"
          value={formData.question}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Question"
          required
        />
        <input
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Company"
        />
        <input
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Topic"
        />
        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Status</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <input
          name="todo"
          value={formData.todo}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="To-Do (e.g., revise, solve again)"
        />
        <textarea
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        placeholder="Notes (e.g., edge cases, insights)"
        > </textarea>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Update Question
        </button>
      </form>
    </div>
  );
};

export default EditQuestion;
