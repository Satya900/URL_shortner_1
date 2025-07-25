import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/all")
      .then(res => setUrls(res.data))
      .catch(err => {
        console.error("Error fetching URLs:", err);
      });
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">📊 URL Dashboard</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-indigo-600 text-white dark:bg-indigo-700">
            <tr>
              <th className="text-left px-6 py-3">Long URL</th>
              <th className="text-left px-6 py-3">Short URL</th>
              <th className="text-left px-6 py-3">Clicks</th>
              <th className="text-left px-6 py-3">Created At</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url) => (
              <tr key={url._id} className="border-t border-gray-200 dark:border-gray-700">
                <td className="px-6 py-4">
                  <a
                    href={url.longURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline break-words"
                  >
                    {url.longURL}
                  </a>
                </td>
                <td className="px-6 py-4">
                  <a
                    href={`http://localhost:3000/${url.shortCode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-500 dark:text-indigo-300 hover:underline"
                  >
                    /{url.shortCode}
                  </a>
                </td>
                <td className="px-6 py-4 dark:text-gray-200">{url.clicks}</td>
                <td className="px-6 py-4 dark:text-gray-200">
                  {new Date(url.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
