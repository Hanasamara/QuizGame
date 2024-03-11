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
  // const [highestScore, setHighestScore] = useState(0);

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

  const handleUpdateHighestScore = (quizId, newHighestScore) => {
    console.log("Updating highest score for quizId:", quizId);
    console.log("New highest score:", newHighestScore);

    const updatedQuizzes = quizzes.map(quiz => {
      if (quiz.id === quizId) {
        return { ...quiz, highest_score: newHighestScore };
      }
      return quiz;
    });
    setQuizzes(updatedQuizzes);
    setSelectedQuiz(updatedQuizzes.find(quiz => quiz.id === quizId));
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

  const handelDeletedQuestion = (quizid, questionid) => {
    const updatedQuizzes = quizzes.map(quiz => {
      if (quiz.id === quizid) {
        quiz.questions = quiz.questions.filter(question => question.id !== questionid);
      }
      return quiz; // return it to make sure we update quizzez state
    });
    setQuizzes(updatedQuizzes);
    
  };

  const handleAddQuestionToQuiz = (quizId, newQuestion) => {
    const updatedQuizzes = quizzes.map(quiz => {
      if (quiz.id === quizId) {
        return {
          ...quiz,
          questions: [...quiz.questions, newQuestion]
        };
      }
      return quiz;
    });
    setQuizzes(updatedQuizzes);
  };

  const onUpdateQuiz = (updatedQuiz) => {
    // Update the quiz after eding question
    const updatedQuizzes = quizzes.map(quiz => (quiz.id === updatedQuiz.id ? updatedQuiz : quiz));
    setQuizzes(updatedQuizzes);
  };


  const handleCreateQuiz = (newQuiz) => {
    console.log(newQuiz)
    setQuizzes([...quizzes, newQuiz]);
    
    const newQuizlist = [...quizzes, newQuiz].filter(quiz => quiz.id === newQuiz.id)
    console.log(newQuizlist);
    setSelectedQuiz(newQuizlist[0]);
    
    setAction('edit');
  };

  return (
    <div className='game'>
        {action === 'play' && selectedQuiz && (
          <PlayQuiz 
            quiz={selectedQuiz}
            onReturnToList={handleReturnToList}
            onUpdateHighestScore={handleUpdateHighestScore}
          />
        )}

        {action === 'edit' && selectedQuiz && (
          <EditQuiz 
            quiz={selectedQuiz}
            onReturnToList={handleReturnToList}
            onDeleteQuestion={handelDeletedQuestion}
            onAddQuestion={handleAddQuestionToQuiz}
            onUpdateQuiz={onUpdateQuiz}
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
            <CreateQuiz
            onCreateQuiz={handleCreateQuiz}
            />
          </div>
        )}
      
      
    </div>
  );
}

export default Game;