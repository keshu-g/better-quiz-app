import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Quiz = () => {
  const location = useLocation();
  const [quizData, setQuizData] = useState([]);
  const {
    category,
    difficulty = "easy",
    questionCount = 10,
  } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const fetchQuizData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://opentdb.com/api.php?amount=${questionCount}&${
          category ? `category=${category}` : ""
        }&difficulty=${difficulty}&type=multiple`
      );
      const data = await response.json();

      if (data.response_code === 0) {
        setQuizData(data.results.map(formatQuestion));
      } else {
        console.error("Error fetching quiz data:", data);
      }
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    } finally {
      setLoading(false);
    }
  };

  const decodeHtml = (text) => {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = text;
    return textArea.value;
  };

  const formatQuestion = (question) => {
    const options = [...question.incorrect_answers, question.correct_answer];
    options.sort(() => 0.5 - Math.random());

    return {
      ...question,
      question: decodeHtml(question.question),
      options,
      correctAnswerIndex: options.indexOf(question.correct_answer),
      userAnswerIndex: null,
    };
  };

  const handleAnswerSelection = (index) => {
    setSelectedOption(index);
  };

  const saveSelectedOption = () => {
    const updatedQuizData = [...quizData];
    updatedQuizData[currentQuestionIndex].userAnswerIndex = selectedOption;
    setQuizData(updatedQuizData);
    setSelectedOption(null);
  };

  const nextQuestion = () => {
    if (selectedOption === null) return;

    saveSelectedOption();
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  if (loading) return <p>Loading quiz, please wait...</p>;
  if (!quizData.length)
    return <p>No quiz available for the selected options.</p>;

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Question {currentQuestionIndex + 1} of {quizData.length}
        </h2>
        <p className="text-lg mb-6 text-gray-700">{currentQuestion.question}</p>
        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`w-full p-3 rounded-lg border transition duration-200
                ${
                  selectedOption === index
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-800 hover:bg-gray-100"
                }`}
              onClick={() => handleAnswerSelection(index)}
            >
              {decodeHtml(option)}
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-between">
          {currentQuestionIndex + 1 === quizData.length ? (
            <Link
              to="/results"
              state={quizData}
              onClick={saveSelectedOption}
              className={`py-2 px-6 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition duration-200 ${
                selectedOption === null && "opacity-50 cursor-not-allowed"
              }`}
            >
              Submit
            </Link>
          ) : (
            <button
              onClick={nextQuestion}
              disabled={selectedOption === null}
              className={`py-2 px-6 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition duration-200 ${
                selectedOption === null && "opacity-50 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
