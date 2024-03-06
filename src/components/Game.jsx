import quizzesJson from '/data/quiz.json';
import React,{ useState, useEffect } from 'react';
import QuizList from './QuizList';
import CreateQuiz from './CreateQuiz';
import EditQuiz from './EditQuiz'
import PlayQuiz from './PlayQuiz';
import fetchData from '../services/QuizzesService';


function Game() {

  const [action, setAction] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [highestScore, setHighestScore] = useState(0);

  // const path = '/data/quiz.json'

  useEffect(() => {
    setQuizzes(quizzesJson);
  }, []); 

  const handleDeleteQuiz = (e,quizid) => {
    e.preventDefault()
    console.log(quizid);
    // should add code to update json file after deletion
    const newQuizlist = quizzes.filter(quiz => quiz.id !== quizid)
    setQuizzes(newQuizlist);
  };

  const handlePlayQuiz = (e,quizid) => {
    e.preventDefault()
    console.log(quizid);
    const newQuizlist = quizzes.filter(quiz => quiz.id === quizid)
    console.log(newQuizlist[0]);
    setSelectedQuiz(newQuizlist[0]);
    setAction('play');
  };

  const handleEditQuiz = (e,quizid) => {
    e.preventDefault()
    console.log(quizid);
    // should add code to update json file after edit it
    const newQuizlist = quizzes.filter(quiz => quiz.id === quizid)
    setSelectedQuiz(newQuizlist[0]);
    setAction('edit');
  };

  const handleReturnToList = () => {
    setAction(null);
    setSelectedQuiz(null);
  };


  return (
    <div className='game'>
        {action === 'play' && selectedQuiz && (
          <PlayQuiz 
            quiz={selectedQuiz}
            onReturnToList={handleReturnToList}
          />
        )}

        {action === 'edit' && selectedQuiz && (
          <EditQuiz 
            quiz={selectedQuiz}
            onReturnToList={handleReturnToList}
          />
        )}

        {action === 'create' && (
          <EditQuiz 
            quiz={selectedQuiz}
            onReturnToList={handleReturnToList}
          />
        )}

        {action === null && (
          <div className="quiz-game-content">
            <QuizList 
              quizzes={quizzes}
              onDeleteQuiz={handleDeleteQuiz}
              onPlayQuiz={handlePlayQuiz}
              onEditQuiz={handleEditQuiz}
            />
            <CreateQuiz />
          </div>
        )}
      
      
    </div>
  );
}

export default Game;