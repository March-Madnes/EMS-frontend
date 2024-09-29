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
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setLoading(false);
      } catch (error) {
        console.error("Failed to connect MetaMask", error);
        setLoading(false);
      }
    } else {
      alert("Please install MetaMask to use this app.");
      setLoading(false);
    }
  };

  const checkMetaMaskConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error checking MetaMask connection:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    } else {
      navigate("/login");
    }
  };

  const disconnectMetaMask = () => {
    setAccount(null);
    navigate("/login");
  };

  useEffect(() => {
    checkMetaMaskConnection();

    window.ethereum?.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        disconnectMetaMask();
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ account, connectMetaMask, disconnectMetaMask, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
