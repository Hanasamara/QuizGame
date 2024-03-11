import { v4 as uuidv4 } from 'uuid';
import React,{ useState} from 'react';

function CreateQuiz({onCreateQuiz}) {
  const [quizName, setQuizName] = useState('');

  const handleCreateQuiz = () => {
    if (quizName.trim() === '' ) {
      alert('Please enter a quiz name.');
      return;
    }

    const newQuiz = {
      id: uuidv4(),
      name: quizName,
      questions: [],
      highest_score: 0
    };

    onCreateQuiz(newQuiz);
  };


  return (
    <div className='creatediv' >
      <h3>Create New Quiz</h3>
      <div>
        <label>
          Quiz Name:
          <input
          type="text"
          value={quizName}
          onChange={(e) => setQuizName(e.target.value)}
        />
        </label>
        <button onClick={handleCreateQuiz}>Create</button>
      </div>
    </div>
  );
}

export default CreateQuiz;