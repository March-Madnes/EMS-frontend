import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
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
  if (isLoadingAccounts) return <p>Loading accounts...</p>;
  if (isErrorAccounts)
    return <p>Error fetching accounts: {errorAccounts.message}</p>;

  if (isLoading) return <p>Loading logs...</p>;
  if (isError) return <p>Error fetching logs: {error.message}</p>;

  return (
    <div>
      <NavBar
        account={account}
        disconnectMetaMask={disconnectMetaMask}
      ></NavBar>
      <br />
      
      <EvidenceLogs logs={logs} />
      <Footer />
    </div>
  );
};

export default EvReport;
