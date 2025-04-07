import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext"; // Import the useAuth hook
import EvidenceListing from "../comp/EvidenceListing";
import axios from "axios";
import { Footer } from "../comp/Footer";
import NavBar from "../comp/Navv2";

export const Dash = () => {
  const { account, disconnectMetaMask, loading } = useAuth(); // Use the latest auth context
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileDescription, setFileDescription] = useState(""); // State for file description
  const [fileName, setFileName] = useState(""); // State for file name

  const navigate = useNavigate();

  // Redirect to login if not connected
  useEffect(() => {
    if (!account && !loading) {
      navigate("/login");
    }
  }, [account, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleFileChange = (event) => {
    const selected = event.target.files[0];
    setFile(selected);
    setSelectedFile(selected);
  };

  const handleFileUpload = async () => {
    if (!file || !fileName || !fileDescription) {
      setUploadStatus("Please provide a file, name, and description.");
      return;
    }

    let data = new FormData();
    data.append("file", file);
    data.append("owner", account); // Include the owner's MetaMask ID
    data.append("fileName", fileName); // Include the file name
    data.append("fileDescription", fileDescription); // Include the file description

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
        setSelectedFile(null);
        setFile(null);
        setFileName("");
        setFileDescription("");
      } else {
        setUploadStatus("Upload failed");
      }
    } catch (error) {
      console.error(error);
      setUploadStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <NavBar account={account} disconnectMetaMask={disconnectMetaMask} ></NavBar>

      {/* File Upload Section */}
      <form className="max-w-screen-xl mx-auto p-6">
        <div className="flex justify-between items-start space-x-6">
          {/* Form on the left */}
          <div className="w-1/2">
            <input
              type="text"
              placeholder="File Name"
              className="mb-4 p-2 border border-gray-300 rounded w-full"
              value={fileName}
              required
              onChange={(e) => setFileName(e.target.value)}
            />
            <textarea
              placeholder="File Description"
              className="mb-4 p-2 border border-gray-300 rounded w-full"
              value={fileDescription}
              required
              onChange={(e) => setFileDescription(e.target.value)}
            />

            {/* Selected File Preview */}
            {selectedFile && (
              <div className="mb-4 p-2 border border-gray-300 rounded">
                <h3 className="font-semibold">Selected File:</h3>
                <p className="text-sm">{selectedFile.name}</p>
                <p className="text-xs text-gray-500">
                  Size: {selectedFile.size} bytes
                </p>
                <p className="text-xs text-gray-500">
                  Type: {selectedFile.type}
                </p>
              </div>
            )}

            <button
              onClick={handleFileUpload}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-500"
            >
              Upload File
            </button>
            {uploadStatus && <p className="mt-4 text-sm">{uploadStatus}</p>}
          </div>

          {/* Upload section on the right */}
          <div className="w-1/2">
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
                  PNG, JPG, or PDF
                </p>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </label>
          </div>
        </div>
      </form>

      {/* Evidence Listing Section */}
      <EvidenceListing />
      <Footer />
    </div>
  );
};

export default Dash;
