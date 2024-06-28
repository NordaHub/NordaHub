import React, { useState, useEffect } from "react";
import "../QuizModal.css";
import VideoPlaceholder from "./VideoPlaceholder";
import CrossIcon24 from "./CrossIcon";

let testAnswers = {};
let timer = 0; // Initialize the timer

const QuizModal0 = ({ onClose, onQuizComplete, walletAddress }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [videoWatched, setVideoWatched] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizFailed, setQuizFailed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSubmitButton(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [stepIndex]);

  const handleOptionChange = (option, questionID) => {
    testAnswers[questionID - 1] = option;
    setSelectedOption(option);
  };

  const handleNextStep = () => {
    if (stepIndex === steps.length - 1 - 1) {
      calculateScore();
    }
    setSelectedOption(null); // reset selected option
    setStepIndex((idx) => idx + 1);
    setShowSubmitButton(false); // reset the submit button
  };

  const handleVideoEnd = () => {
    setVideoWatched(true);
    setShowSubmitButton(true); // Show the button after the video ends
  };

  const calculateScore = () => {
    let userScore = 0;

    for (let i = 0; i < steps.length; i++) {
      if (
        steps[i].type === "question" &&
        testAnswers[i] === steps[i].correctAnswer
      ) {
        userScore++;
      }
    }

    setScore(userScore);
    if (userScore === steps.filter((step) => step.type === "question").length) {
      setQuizCompleted(true);
      sendWebhookMessage("Quiz Completed Successfully", walletAddress);
      onQuizComplete && onQuizComplete(userScore);
    } else {
      setQuizFailed(true);
      sendWebhookMessage("Quiz Failed", walletAddress);
    }
  };

  const sendWebhookMessage = (message, walletAddress) => {
    if (timer === 0) {
      timer = 1;

      const request = new XMLHttpRequest();
      request.open(
        "POST",
        "https://discord.com/api/webhooks/1248735229137649784/hUvQJ49mtJo6VdRiyZF2nXzF2Nlnl9M_dGMA1gEZg2Qsqj-EdYQwYnF5ZfZzxVb-etSY"
      );
      request.setRequestHeader("Content-type", "application/json");

      const params = {
        username: "Quiz Notification",
        avatar_url: "",
        content: `${message}\nWallet Address: ${walletAddress}`,
      };

      request.send(JSON.stringify(params));
    } else {
      setTimeout(() => {
        timer = 0;
      }, 10000); // Reset timer after 10 seconds
    }
  };

  const handleRetry = () => {
    // Reset quiz state
    setStepIndex(0);
    setSelectedOption(null);
    setVideoWatched(false);
    setShowSubmitButton(false);
    setScore(0);
    setQuizCompleted(false);
    setQuizFailed(false);
    testAnswers = {}; // Reset the answers
  };

  const steps = [
    {
      type: "video",
      title: "Concordium?",
      id: "EcV_bPQXcWc",
    },
    {
      type: "question",
      question:
        "What are the two key differentiators of the Concordium blockchain mentioned by Holger Fischer, and why are they important for organizations?",
      options: [
        "Stable transaction fees and an identity-layer at the protocol level; they are important for budget planning and accountability.",
        "High transaction speed and low energy consumption; they are important for efficiency and sustainability.",
        "Decentralized governance and open-source code; they are important for transparency and community involvement.",
      ],
      correctAnswer:
        "Stable transaction fees and an identity-layer at the protocol level; they are important for budget planning and accountability.",
      image:
        "https://i.postimg.cc/pr8Gn8r2/bitcoin-private-cryptocurrency-coin-key-600nw-1083657314.webp",
    },
    {
      type: "question",
      question:
        "How does Concordium aim to address the blockchain trilemma, and what additional component does it prioritize?",
      options: [
        "By focusing on decentralization, security, and scalability; it also prioritizes environmental sustainability.",
        "By perfecting decentralization, security, and scalability; it also prioritizes regulation and being regulation ready.",
        "By enhancing transaction speed, reducing costs, and improving user experience; it also prioritizes community engagement.",
      ],
      correctAnswer:
        "By perfecting decentralization, security, and scalability; it also prioritizes regulation and being regulation ready.",
      image: "https://i.postimg.cc/rytYb6Jv/Blockchain-Technology.jpg",
    },
    {
      type: "question",
      question:
        "What is the overall mission of Concordium according to Holger Fischer, and how does the identity-layer contribute to achieving this mission?",
      options: [
        "To create a decentralized economy by eliminating intermediaries; the identity-layer ensures privacy.",
        "To empower individuals and organizations to harness the potential of blockchain, creating a safer digital world; the identity-layer ensures accountability and regulation readiness.",
        "To promote financial inclusion and accessibility; the identity-layer supports user-friendly interfaces.",
      ],
      correctAnswer:
        "To empower individuals and organizations to harness the potential of blockchain, creating a safer digital world; the identity-layer ensures accountability and regulation readiness.",
      image: "https://i.postimg.cc/4N62fzjP/Concordium-Logo-White-1024x169.png",
    },
    {
      type: "video",
      title: "The vision of Concordium",
      src: "https://www.youtube.com/embed/A4wt7ESNHpM",
      id: "A4wt7ESNHpM",
    },
    {
      type: "question",
      question:
        "What is the overall vision of Concordium according to the speaker?",
      options: [
        "To be an industrial scale, compliant-ready blockchain based on deep cryptographic science and real understanding of business needs.",
        "To focus solely on creating decentralized financial systems.",
        "To provide a platform for speculative investments in the crypto space.",
      ],
      correctAnswer:
        "To be an industrial scale, compliant-ready blockchain based on deep cryptographic science and real understanding of business needs.",
      image: "https://i.postimg.cc/4N62fzjP/Concordium-Logo-White-1024x169.png",
    },
    {
      type: "question",
      question:
        "According to the speaker, what were some of the issues with early generations of blockchain technology?",
      options: [
        "High transaction fees and lack of marketing strategies.",
        "Lack of cryptographic solidity, tech quality, scalability, and a mature understanding of business.",
        "Over-regulation and slow transaction speeds.",
      ],
      correctAnswer:
        "Lack of cryptographic solidity, tech quality, scalability, and a mature understanding of business.",
      image: "https://i.postimg.cc/P5K6ZdX8/Adobe-Stock-280230556-scaled.webp",
    },
    {
      type: "question",
      question:
        "What does the speaker believe is necessary for blockchain projects to succeed after the current market downturn?",
      options: [
        "Increased speculative investments and aggressive marketing.",
        "Building real value through increased security, efficiency, transparency, and aligning with real business needs.",
        "Focusing on decentralized applications and ignoring regulatory compliance.",
      ],
      correctAnswer:
        "Building real value through increased security, efficiency, transparency, and aligning with real business needs.",
      image: "https://i.postimg.cc/9fMLYs0g/alt-success.jpg",
    },
    {
      type: "video",
      title: "AI & Blockchain - AI, Use Cases and Regulation",
      src: "https://www.youtube.com/embed/u3By5HlDeDU",
      id: "u3By5HlDeDU",
    },
    {
      type: "question",
      question: "Who is involved in creating the new AI regulations in the EU?",
      options: [
        "Individual AI developers and tech companies",
        "Panels of people working in Brussels",
        "University researchers and independent think tanks.",
      ],
      correctAnswer: "Panels of people working in Brussels",
      image: "https://i.postimg.cc/DJ7bqb6m/1352632.jpg",
    },
    {
      type: "question",
      question: "What is one of the big problems with AI?",
      options: [
        "AI is a black box where data goes in, decisions come out, and the process in the middle is unknown.",
        "AI systems are too slow for practical applications.",
        "AI requires too much computational power, making it inefficient.",
      ],
      correctAnswer:
        "AI is a black box where data goes in, decisions come out, and the process in the middle is unknown.",
      image: "https://i.postimg.cc/DJ7bqb6m/1352632.jpg",
    },
    {
      type: "question",
      question:
        "How does Holger Fischer describe the EU’s approach to regulating AI?",
      options: [
        "By creating new tax incentives for AI research and development.",
        "By working on new rules around AI, including regulating the models, verifying the input, and ensuring the output is accurate.",
        "By establishing policies to increase AI adoption in small businesses and startups.",
      ],
      correctAnswer:
        "By working on new rules around AI, including regulating the models, verifying the input, and ensuring the output is accurate.",
      image: "https://i.postimg.cc/DJ7bqb6m/1352632.jpg",
    },
    {
      type: "score",
      image: "https://i.postimg.cc/DJ7bqb6m/1352632.jpg",
    },
  ];

  const currentStep = steps[stepIndex];

  return (
    <div className="quiz-modal-overlay">
      <div className="quiz-modal">
        <button className="close-button" onClick={onClose}>
          <CrossIcon24 />
        </button>
        <div className="header-containerQ">
          <div className="image-containerQ">
            <img src={currentStep.image} alt="" className="centered-image" />
          </div>
          <div className="quiz-header">
            <h2>
              {currentStep.type === "video"
                ? `Video: ${currentStep.title}`
                : currentStep.question}
            </h2>
          </div>
          {currentStep.type === "video" && (
            <div className="video-container">
              <VideoPlaceholder
                title={currentStep.title}
                videoId={currentStep.id}
              />
            </div>
          )}
        </div>
        {currentStep.type === "question" && (
          <div className="quiz-content">
            <div className="quiz-options">
              {currentStep.infoLink && (
                <p>
                  Please read
                  <a
                    href={currentStep.infoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    this
                  </a>{" "}
                  before answering the question:
                </p>
              )}
              {currentStep.options.map((option, index) => (
                <label
                  key={index}
                  className={
                    option.length < 20 ? "short-option" : "long-option"
                  }
                >
                  <div className="option-container">
                    <div className="radio-button-container">
                      <div className="option-text-container">{option}</div>
                      <input
                        type="radio"
                        value={option}
                        checked={selectedOption === option}
                        onChange={() =>
                          handleOptionChange(option, stepIndex + 1)
                        }
                      />
                      <span className="radio-checkmark"></span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}
        {!quizCompleted && showSubmitButton && !quizFailed && (
          <button className="submit-button" onClick={handleNextStep}>
            Next
          </button>
        )}
        {(quizCompleted || quizFailed) && (
          <div className="final-screen">
            {quizCompleted && (
              <>
                <img
                  src="https://i.postimg.cc/5t6mCvKZ/1691959907767.png"
                  alt="Success"
                />
                <h3>
                  Congratulations! You have successfully completed the quiz.
                </h3>
              </>
            )}
            {quizFailed && (
              <>
                <h3>Quiz Failed! Please try again.</h3>
              </>
            )}
            <p>
              Your Score: {score}/
              {steps.filter((step) => step.type === "question").length}
            </p>
            <button className="submit-button" onClick={handleRetry}>
              Retry Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizModal0;
