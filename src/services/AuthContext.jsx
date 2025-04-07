import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const connectMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      } catch (error) {
        console.error("🛑 MetaMask connection error:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to continue.");
    }
  };

  const checkMetaMaskConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
        }
      } catch (error) {
        console.error("🛑 Error checking MetaMask connection:", error);
      }
    } else {
      console.warn("🦊 MetaMask not found");
    }
    setLoading(false);
  };

  const disconnectMetaMask = () => {
    setAccount(null);
    navigate("/login");
  };

  useEffect(() => {
    checkMetaMaskConnection();

    const handleAccountChange = (accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        disconnectMetaMask();
      }
    };

    window.ethereum?.on("accountsChanged", handleAccountChange);

    // Cleanup the listener to avoid duplicate triggers
    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountChange);
    };
  }, []);

  useEffect(() => {
    if (!loading && !account) {
      navigate("/login");
    }
  }, [account, loading, navigate]);

  return (
    <AuthContext.Provider value={{ account, connectMetaMask, disconnectMetaMask, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
