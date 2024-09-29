import React, { useState, useEffect } from "react";

const Login = () => {
  const [account, setAccount] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Function to connect to MetaMask
  const connectMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        // Request account access
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]); // Set the first account
      } catch (error) {
        setErrorMessage("Failed to connect to MetaMask");
        console.error(error);
      }
    } else {
      setErrorMessage(
        "MetaMask is not installed. Please install it to use this app."
      );
    }
  };

  useEffect(() => {
    // Listen for account changes
    window.ethereum?.on("accountsChanged", (accounts) => {
      setAccount(accounts.length ? accounts[0] : null);
    });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          MetaMask Authentication
        </h1>

        {!account ? (
          <button
            onClick={connectMetaMask}
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Connect MetaMask
          </button>
        ) : (
          <div className="text-center">
            <p className="text-lg text-gray-700 mb-4">
              <strong>Connected account:</strong> {account}
            </p>
            <button
              onClick={() => setAccount(null)}
              className="w-full bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-300"
            >
              Disconnect
            </button>
          </div>
        )}

        {errorMessage && (
          <p className="text-red-500 text-center mt-4">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
