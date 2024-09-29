import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";

const Login = () => {
  const { connectMetaMask, account, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if the account is connected
  useEffect(() => {
    if (account) {
      navigate("/dashboard");
    }
  }, [account, navigate]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          MetaMask Authentication
        </h1>
        
        <button
          onClick={connectMetaMask}
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          {loading ? "Connecting..." : "Connect MetaMask"}
        </button>

        {account && (
          <p className="text-green-500 text-center mt-4">Connected: {account}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
