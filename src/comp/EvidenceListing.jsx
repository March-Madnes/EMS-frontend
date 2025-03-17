import React, { useState, useEffect } from "react";
import axios from "axios";

const EvidenceListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [evidence, setEvidence] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvidence = async () => {
      try {
        const response = await axios.get("http://localhost:3000/evidence");
        console.log("Fetched evidence:", response.data.data); // Log the fetched evidence
        setEvidence(response.data.data);
      } catch (err) {
        console.error("Error fetching evidence:", err);
        setError("Error fetching evidence.");
      }
    };

    fetchEvidence();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery) {
      setError("Please enter a CID to search.");
      return;
    }

    try {
      // Reset the evidence to an empty array when a new search starts
      setEvidence([]);

      const response = await axios.get(
        `http://localhost:3000/evidence/search/${searchQuery}`
      );

      const responseData = response.data.data;

      // Make sure we handle both array and object cases
      const evidenceArray = Array.isArray(responseData)
        ? responseData
        : [responseData]; // Wrap a single object in an array

      setEvidence(evidenceArray); // Replace the current evidence with new search result
      setError(""); // Clear any previous errors

      console.log("Search result:", responseData);
    } catch (err) {
      setError("Error fetching evidence. Please check the CID and try again.");
      console.error("Error fetching evidence:", err);
    }
  };

  useEffect(() => {
    // Log updated evidence to ensure re-render
    console.log("Evidence state updated:", evidence);
  }, [evidence]);

  return (
    <div className="max-w-screen-xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-end mb-6">
        <input
          type="text"
          placeholder="Enter CID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleSearch}
          className="ml-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>

      {error && (
        <p className="text-red-600 text-center font-semibold mb-4">{error}</p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
        {evidence && evidence.length > 0 ? (
          evidence.map((item, index) => (
            <div
              key={item.cid || index} // Use CID as key if available
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-start transition-transform transform hover:scale-105 duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                {item.name || "Evidence File"}
              </h2>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Description:</span>{" "}
                {item.description || "No description"}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Original Name:</span>{" "}
                {item.originalName || "N/A"}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">MIME Type:</span>{" "}
                {item.mimeType || "N/A"}
              </p>
              <p className="text-gray-600 mb-2 break-all">
                <span className="font-semibold">CID:</span> {item.cid}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Timestamp:</span>{" "}
                {new Date(item.timestamp).toLocaleString()}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Owner MetaMask ID:</span>{" "}
                {item.owner}
              </p>

              <div className="mt-4">
                <a
                  href={`http://localhost:3000/retrieve-file/${item.cid}`}
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-300 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download
                </a>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-300 underline ml-4"
                >
                  Report
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No evidence found.</p>
        )}
      </div>
    </div>
  );
};

export default EvidenceListing;
