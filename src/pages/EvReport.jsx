import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Footer } from "../comp/Footer";
import NavBar from "../comp/Navv2";
import EvidenceLogs from "../comp/EvidenceLogs";

const fetchLogs = async (id) => {
  const { data } = await axios.get(`http://localhost:3000/logs/${id}`);
  return data.events;
};

const fetchAccounts = async () => {
  const { data } = await axios.get("http://localhost:3000/accounts");
  return data.accounts;
};

const EvReport = () => {
  const { id } = useParams();
  const { account, disconnectMetaMask, loading } = useAuth();
  const navigate = useNavigate();

  const [selectedAccount, setSelectedAccount] = useState("");

  useEffect(() => {
    if (!account && !loading) {
      navigate("/login");
    }
  }, [account, loading, navigate]);

  const {
    data: logs,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["evidenceLogs", id],
    queryFn: () => fetchLogs(id),
  });

  const {
    data: accounts,
    isLoading: isLoadingAccounts,
    isError: isErrorAccounts,
    error: errorAccounts,
  } = useQuery({
    queryKey: ["accounts"],
    queryFn: fetchAccounts,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const owner = import.meta.env.VITE_APP_OWNER;
    const grantee = selectedAccount;

    if (!grantee) {
      alert("Please select an account.");
      return;
    }

    const payload = {
      evidenceId: Number(id),
      owner,
      grantee,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/grantAccess",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Access granted:", response.data);
      alert(`✅ Access granted to ${grantee}`);
    } catch (error) {
      console.error("❌ Failed to grant access:", error);
      alert("Error granting access. Check console.");
    }
  };

  if (isLoadingAccounts) return <p>Loading accounts...</p>;
  if (isErrorAccounts)
    return <p>Error fetching accounts: {errorAccounts.message}</p>;
  if (isLoading) return <p>Loading logs...</p>;
  if (isError) return <p>Error fetching logs: {error.message}</p>;

  return (
    <div>
      <NavBar account={account} disconnectMetaMask={disconnectMetaMask} />
      <br />

      {/* 🔍 Account Search Form */}
       <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 bg-white shadow rounded mb-6"
      >
        <label
          htmlFor="account-search"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Grant view access
        </label>
        <input
          list="accounts"
          id="account-search"
          name="account"
          value={selectedAccount}
          onChange={(e) => setSelectedAccount(e.target.value)}
          placeholder="Start typing address..."
          className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
        />
        <datalist id="accounts">
          {accounts.map((acc, idx) => (
            <option key={idx} value={acc} />
          ))}
        </datalist>

        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          Submit
        </button>
      </form>

      {/* 🧾 Evidence Logs Section */}
      <EvidenceLogs logs={logs} />
      <Footer />
    </div>
  );
};

export default EvReport;
