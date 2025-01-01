import React from "react";
import { useLocation } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const quizData = location.state || [];

  let correctAnswers = 0;

  quizData.forEach((question) => {
    if (question.userAnswerIndex === question.correctAnswerIndex) {
      correctAnswers += 1;
    }
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Quiz Results</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <p className="text-xl text-center">
          <span className="font-semibold text-green-600">{correctAnswers}</span>{" "}
          out of{" "}
          <span className="font-semibold text-blue-600">{quizData.length}</span>{" "}
          questions answered correctly!
        </p>
      </div>

      <div className="space-y-6">
        {quizData.map((question, index) => (
          <div
            key={index}
            className={`border rounded-lg p-4 ${
              question.userAnswerIndex === question.correctAnswerIndex
                ? "bg-green-50"
                : "bg-red-50"
            }`}
          >
            <h2 className="font-semibold text-lg mb-2">
              Q{index + 1}: {question.question}
            </h2>
            <p className="text-sm">
              <span className="font-medium">Correct Answer:</span>{" "}
              <span className="text-green-600">
                {question.options[question.correctAnswerIndex]}
              </span>
            </p>
            <p className="text-sm">
              <span className="font-medium">Your Answer:</span>{" "}
              <span
                className={
                  question.userAnswerIndex === question.correctAnswerIndex
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {question.userAnswerIndex !== null
                  ? question.options[question.userAnswerIndex]
                  : "Not Answered"}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
