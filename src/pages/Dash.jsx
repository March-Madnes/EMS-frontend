import React, { useState, useEffect } from "react";
import { Cards } from "../comp/Cards";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext"; // Import the useAuth hook
import axios from "axios";
import { Footer } from "../comp/Footer";

export const Dash = () => {
  const { account, disconnectMetaMask, loading } = useAuth(); // Use the latest auth context
  const [showDropdown, setShowDropdown] = useState(false); // For the account dropdown
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();

  // Redirect to login if not connected
  useEffect(() => {
    if (!account && !loading) {
      navigate("/login");
    }
  }, [account, loading, navigate]);

  // Display a loading spinner or message while checking the connection
  if (loading) {
    return <div>Loading...</div>;
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setUploadStatus("No file selected");
      return;
    }

    let data = new FormData();
    data.append("file", file);

    let config = {
      method: "post",
      maxBodyLength: Infinity, // Ensure large files are handled
      url: "http://localhost:3000/upload",
      headers: {
        "Content-Type": "multipart/form-data", // This is enough in the browser
      },
      data: data,
    };

    try {
      setUploadStatus("Uploading...");

      const response = await axios.request(config);

      if (response.data.success) {
        setUploadStatus(`File uploaded! IPFS Hash: ${response.data.ipfsHash}`);
      } else {
        setUploadStatus("Upload failed");
      }
    } catch (error) {
      console.error(error);
      setUploadStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Nav */}
      <nav className="border-b bg-white shadow">
        <div className="max-w-screen-xl mx-auto p-4 flex items-center justify-between">
          <a href="/dashboard" className="text-2xl font-semibold">
            EMS
          </a>
          <div className="flex items-center gap-2">
            <a href="/tools" className="text-md text-gray-800 mx-3 font-medium text-gray-500">
              Tools
            </a>
            {account && (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center text-sm text-gray-800"
                >
                  <img
                    className="w-8 h-8 rounded-full"
                    src={`https://avatars.dicebear.com/api/pixel-art/${account}.svg`}
                    alt="Account Avatar"
                  />
                  <span className="ml-2">
                    {`${account.slice(0, 6)}...${account.slice(-4)}`}
                  </span>
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-20">
                    <div className="px-4 py-2 text-sm text-gray-700">
                      Connected:{" "}
                      {`${account.slice(0, 6)}...${account.slice(-4)}`}
                    </div>
                    <div
                      onClick={disconnectMetaMask}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 cursor-pointer hover:bg-gray-100"
                    >
                      Disconnect
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* File Upload Section */}
      <div className="max-w-screen-xl mx-auto p-6">
        <div className="flex items-center justify-center w-full mb-4">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* Display selected file */}
        {selectedFile && (
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow">
              <img
                src="/path/to/icon.svg"
                alt="File Icon"
                className="w-8 h-8"
              />
              <span>{selectedFile.name}</span>
            </div>
          </div>
        )}

        <button
          onClick={handleFileUpload}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Upload File
        </button>

        {/* Upload status message */}
        <p className="mt-4 text-center text-gray-800">{uploadStatus}</p>

        {/* Cards */}
        <div className="flex gap-3 flex-wrap justify-center mt-5">
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
        </div>
      </div>
      <Footer/>
    </div>
  );
};
