'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [problem, setProblem] = useState(null);
  const [category, setCategory] = useState('calculus');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const maxRetries = 3; // Maximum retries to avoid infinite loop

  const fetchProblem = async (retryCount = 0) => {
    setLoading(true);
    setError(null);
    setShowSolution(false);
    try {
      const response = await axios.get(`https://mathxp-api.onrender.com/${category}`);
      setProblem(response.data);
    } catch (err) {
      if (retryCount < maxRetries) {
        console.log(`Retrying... Attempt ${retryCount + 1}`);
        fetchProblem(retryCount + 1); // Retry fetching the problem
      } else {
        setError('Error fetching problem after multiple attempts');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblem();
  }, [category]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="lg:w-1/4 bg-slate-700 text-white flex flex-col items-center lg:fixed lg:h-full p-4">
        <h1 className="text-4xl font-bold mb-8">MathXP</h1>
        <nav className="space-y-4 lg:space-y-8">
          <button
            className={`py-2 px-4 w-full rounded ${category === 'calculus' ? 'bg-slate-500' : 'bg-slate-600'}`}
            onClick={() => setCategory('calculus')}
          >
            Calculus
          </button>
          <button
            className={`py-2 px-4 w-full rounded ${category === 'algebra' ? 'bg-slate-500' : 'bg-slate-600'}`}
            onClick={() => setCategory('algebra')}
          >
            Algebra
          </button>
          <button
            className={`py-2 px-4 w-full rounded ${category === 'linear_algebra' ? 'bg-slate-500' : 'bg-slate-600'}`}
            onClick={() => setCategory('linear_algebra')}
          >
            Linear Algebra
          </button>
          <button
            className={`py-2 px-4 w-full rounded ${category === 'statistics' ? 'bg-slate-500' : 'bg-slate-600'}`}
            onClick={() => setCategory('statistics')}
          >
            Statistics
          </button>
        </nav>
      </div>

      <div className="flex-1 p-8  bg-slate-600 lg:ml-1/4">
        <div className="text-center mb-8">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
        </div>
        {problem && (
          <div className="text-center">
            <h3 className="text-xl">Problem:</h3>
            <p className="my-4">{problem.problem}</p>

            <button
              className="bg-blue-500 text-white py-2 px-4 rounded m-4"
              onClick={() => fetchProblem()}
            >
              Get New Problem
            </button>

            {!showSolution && (
              <button
                className="bg-green-500 text-white py-2 px-4 rounded m-4"
                onClick={() => setShowSolution(true)}
              >
                Show Solution
              </button>
            )}

            {showSolution && (
              <div className="mt-4">
                <h3 className="text-xl">Solution:</h3>
                <p>{JSON.stringify(problem.solution)}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="lg:hidden fixed bottom-0 w-full bg-slate-700 text-white flex justify-around p-4">
        <button
          className={`py-2 px-4 ${category === 'calculus' ? 'bg-slate-500' : 'bg-slate-600'}`}
          onClick={() => setCategory('calculus')}
        >
          Calculus
        </button>
        <button
          className={`py-2 px-4 ${category === 'algebra' ? 'bg-slate-500' : 'bg-slate-600'}`}
          onClick={() => setCategory('algebra')}
        >
          Algebra
        </button>
        <button
          className={`py-2 px-4 ${category === 'linear_algebra' ? 'bg-slate-500' : 'bg-slate-600'}`}
          onClick={() => setCategory('linear_algebra')}
        >
          Linear Algebra
        </button>
        <button
          className={`py-2 px-4 ${category === 'statistics' ? 'bg-slate-500' : 'bg-slate-600'}`}
          onClick={() => setCategory('statistics')}
        >
          Statistics
        </button>
      </div>
    </div>
  );
}
