import React, { useState } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import AddQuestionForm from "./AddQuestionForm";


function EditQuiz({quiz , onReturnToList}) {
  const [questions, setQuestions] = useState(quiz.questions);
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', '',''],
    correct_answer: '',
    points: 1,
  });

  const handleEdit = (index) => {
    console.log(index)
    const updatedQuestions = questions.filter((question, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleDelete = (index) => {
    // Handle delete event
  };
  
  console.log(questions);
  return (
    <div className='editquizdiv' >
      <h1>Edit {quiz.name} Quiz</h1>
      {questions.map((question, index) => (
        <div className='questionseditdiv'>
          <div className='questionsedittitle'>
            <p>{index+1}. {question.question}</p>
            <div className='questionsediticons'>
              < FaEdit className='delicon' onClick={() => handleDelete(index)} />
              < RiDeleteBin6Line className='edicon' onClick={() => handleEdit(index)} />
            </div>
          </div>
          <div className='optionseditdiv'>
            <ul className='optionseditlist'>
              {question.options.map((option, optionIndex) => (
                <li className='optionedit'>{option}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      <AddQuestionForm />    
      <button className='return' onClick={onReturnToList}>Return to Quiz Game</button>
      
      
    </div>
  );
}

export default EditQuiz;