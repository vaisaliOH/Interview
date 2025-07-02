const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: { 
    type: String, 
    required: true 
},
  company: String,
  topic: String,
  difficulty: { 
    type: String, 
    enum: ['Easy', 'Medium', 'Hard'] 
},
  status: {
     type: String, 
     enum: ['To Do', 'In Progress', 'Done'] 
    },
  notes: String
}, { 
    timestamps: 
    true 
});

module.exports = mongoose.model("Question", questionSchema);
