import React, { useState, useEffect } from "react";
import { Cards } from "../comp/Cards";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext"; // Import the useAuth hook

export const Dash = () => {
  const { account, disconnectMetaMask, loading } = useAuth(); // Use the latest auth context
  const [showDropdown, setShowDropdown] = useState(false); // For the account dropdown
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

  return (
    <div style={{ background: "#171420" }} className="h-auto">
      <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              EMS
            </span>
          </a>
          <div className="flex items-center">
            {/* Account Information with Avatar */}
            {account && (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center text-sm text-white focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
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

                {/* Dropdown menu for MetaMask options */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg z-20">
                    <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                      Connected:{" "}
                      {`${account.slice(0, 6)}...${account.slice(-4)}`}
                    </div>
                    <div
                      onClick={disconnectMetaMask}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-red-500"
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

      <div className="flex items-center justify-center w-full p-5">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
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
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" />
        </label>
      </div>

      <div className="flex gap-3 flex-wrap align-middle justify-center m-5">
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
      </div>
    </div>
  );
};
