import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [longURL, setLongURL] = useState('');
  const [shortURL, setShortURL] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/shorten', { longURL });
      setShortURL(res.data.shortURL);
    } catch (err) {
      console.error('Shortening failed', err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">Paste a long URL to Minify it 🔗</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="url"
          value={longURL}
          onChange={(e) => setLongURL(e.target.value)}
          placeholder="https://example.com"
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
        >
          Minify URL
        </button>
      </form>

      {shortURL && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md text-center">
          <p className="text-sm text-gray-600">Your short URL:</p>
          <a
            href={shortURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 font-medium underline"
          >
            {shortURL}
          </a>
        </div>
      )}
    </div>
  );
};

export default Home;
