import React, { useState } from 'react';

function AddQuestionForm({ onAddQuestion }) {
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correct_answer: '',
    points: 1,
  });

  const handleNewQuestionChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion({
      ...newQuestion,
      [name]: value
    });
    console.log(newQuestion);
  };

  const handleOptionChange = (e, index) => {
    const newOptions = [...newQuestion.options];
    newOptions[index] = e.target.value;
    setNewQuestion({
      ...newQuestion,
      options: newOptions
    });
  };

  const handleAddQuestion = () => {
    onAddQuestion(newQuestion);
    setNewQuestion({
      question: '',
      options: ['', '', '', ''],
      correct_answer: '',
      points: 1,
    });
  };

  return (
    <form className="add-question-form">
      <label className='questionform'>
        Question:
        <input
          type="text"
          name='question'
          value={newQuestion.question}
          onChange={handleNewQuestionChange}
        />
      </label >
      <div>
      {newQuestion.options.map((option, optionIndex) => (
        <label >
          Option {optionIndex + 1}:
          <input
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(e, optionIndex)}
          />
        </label>
      ))}
      </div>
      <label>
        Correct Answer:
        <input
          type="text"
          name="correct_answer"
          value={newQuestion.correct_answer}
          onChange={handleNewQuestionChange}
        />
      </label>
      <label>
        Points:
        <input
          type="number"
          name="points"
          value={newQuestion.points}
          onChange={handleNewQuestionChange}
        />
      </label>
      <div>
      <button type="button" onClick={handleAddQuestion}>Add Question</button>
      </div>
    </form>
  );
}

export default AddQuestionForm;
