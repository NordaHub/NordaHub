import React, { useState, useEffect } from 'react';
import '../QuizModal.css';
//concorduim
let testAnswers = {}
const QuizModal = ({ onClose, onQuizComplete }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [videoWatched, setVideoWatched] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizFailed, setQuizFailed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSubmitButton(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [stepIndex]);

  const handleOptionChange = (option, wuestionID) => {
      testAnswers[wuestionID - 1] = option
    setSelectedOption(option);
  };

  const handleNextStep = () => {
    if (stepIndex === videos.length + questions.length - 1) {
      calculateScore();
      return;
    }
    setSelectedOption();//test
    setStepIndex((prevIndex) => prevIndex + 1);
  };

  const handleVideoEnd = () => {
    setVideoWatched(true);
  };

  const calculateScore = () => {
    let userScore = 0;
    
    for (let i = 0; i < questions.length; i++) {  
       if (testAnswers[i] === questions[i].correctAnswer) {
         userScore++;
       }
     }
    
    setScore(userScore);
    if (userScore === questions.length) {
      setQuizCompleted(true);
    } else {
      setQuizFailed(true);
    }
  };
const currentStep = stepIndex < videos.length ? videos[stepIndex] : questions[stepIndex - videos.length];

const options = currentStep.options || []; // Ensure options array exists

  const handleRetry = () => {
    // Reset quiz state
    setStepIndex(0);
    setSelectedOption(null);
    setVideoWatched(false);
    setWalletAddress('');
    setShowSubmitButton(false);
    setScore(0);
    setQuizCompleted(false);
    setQuizFailed(false);
  };

  const videos = [
    {
      title: 'What is concordium?',
      src: 'https://www.youtube.com/embed/NbxfjI2QG98',
    },
    // Add more videos as needed
  ];

  const questions = [
    {
      type: 'text',
      question: '1. What is the unique feature of the Concordium blockchain and what does it provide?',
      options: [' BTC', 'CCD', 'ETH', 'USDT'],
      correctAnswer: 'CCD',
    },
    {
      type: 'video',
      title: 'Another Video',
      src: 'https://www.youtube.com/embed/AnotherVideo',
      question: 'What role does CCD play within the Concordium ecosystem?',
      correctAnswer: 'Facilitating value transfer and transaction fees',
    },
    {
      type: 'text',
      question: 'How does Concordium aim to address the challenges faced by legacy blockchains in supporting enterprise demands?',
      options: ['By offering a compliant platform with privacy assurance', 'By prioritizing gaming development over business application', 'By focusing solely on social media integration'],
      correctAnswer: 'By offering a compliant platform with privacy assurance',
    },
    {
      type: 'video',
      title: 'Yet Another Video',
      src: 'https://www.youtube.com/embed/YetAnotherVideo',
      question: 'What should investors consider before deciding to invest in Concordium?',
      correctAnswer: 'Both technical and fundamental factors',
    },
    // Add more questions as needed
  ]

  return (
    <div className="quiz-modal-overlay">
      <div className="quiz-modal">
        <button className="close-button" onClick={onClose}>X</button>
          <div className="header-container">
           <div className="quiz-header">
            <h2>{stepIndex < videos.length ? `Video: ${currentStep.title}` : `Question ${stepIndex - videos.length + 1}`}</h2>
            {stepIndex >= videos.length && (
            <img src={currentStep.image} alt="Question Image" />
             )}
           </div>
            {stepIndex < videos.length ? (
          <div className="video-container">
          <iframe
        title="YouTube Video"
        width="560"
        height="315"
        src={currentStep.src}
        frameBorder="0"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        onEnded={handleVideoEnd}
      ></iframe>
    </div>
  ) : null}
</div>
        <div className="quiz-content">
          {stepIndex >= videos.length && (
            <p>{currentStep.question}</p>
          )}
          {stepIndex >= videos.length && currentStep.options.map((option, index) => (
            <label key={index}>
              <input
                type="radio"
                value={option}
                checked={selectedOption === option}
                onChange={() => handleOptionChange(option, stepIndex)}
              />
              {option}
            </label>
          ))}
          {!quizCompleted && showSubmitButton && !quizFailed &&(
            <button className="submit-button" onClick={handleNextStep}>
              Next (Questions)
            </button>
          )}
        </div>
        {quizCompleted && (
          <div>
            <h3>Congratulations! You have successfully completed the quiz.</h3>
            <p>Your Score: {score}/{questions.length}</p>
          </div>
        )}
        {quizFailed && (
          <div>
            <h3>Quiz Failed! Please try again.</h3>
            <p>Your Score: {score}/{questions.length}</p>
            <button onClick={handleRetry}>Retry Quiz</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizModal;
