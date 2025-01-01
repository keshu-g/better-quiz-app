import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [questionCount, setQuestionCount] = useState(10);
  const [loading, setLoading] = useState(true);

  const fetchQuizCategories = async () => {
    try {
      const response = await fetch("https://opentdb.com/api_category.php");
      const data = await response.json();
      setCategories(data.trivia_categories);
    } catch (error) {
      console.error("Error fetching quiz categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizCategories();
  }, []);

  return (
    <div className="container mx-auto p-6 max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Quiz Setup
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading categories...</p>
        ) : (
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Category
            </label>
            <select
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="0">Any Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Difficulty
          </label>
          <select
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Number of Questions
          </label>
          <input
            type="number"
            min="1"
            max="50"
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
            value={questionCount}
            onChange={(e) => setQuestionCount(e.target.value)}
          />
        </div>

        <Link
          to="/quiz"
          state={{
            category: selectedCategory,
            difficulty,
            questionCount,
          }}
        >
          <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200">
            Start Quiz
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
