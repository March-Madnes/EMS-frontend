import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import NavBar from "../../comp/Navv2";
import { useNavigate } from "react-router-dom";

const CaseManager = () => {
  const [cases, setCases] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loadingCases, setLoadingCases] = useState(false);
  const [creating, setCreating] = useState(false);
  const [expandedCaseId, setExpandedCaseId] = useState(null);
  const [caseEvidenceMap, setCaseEvidenceMap] = useState({}); // {caseId: [evidences]}

  const { account, disconnectMetaMask, loading } = useAuth();
  const owner = import.meta.env.VITE_APP_OWNER;
  const navigate = useNavigate();

  useEffect(() => {
    if (!account && !loading) navigate("/login");
  }, [account, loading, navigate]);

  const fetchCases = async () => {
    setLoadingCases(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/cases?owner=${owner}`
      );
      setCases(res.data.cases || []);
    } catch (err) {
      console.error("❌ Failed to fetch cases:", err);
    }
    setLoadingCases(false);
  };

  const handleCreateCase = async () => {
    const cleanTitle = title.trim();
    const cleanDesc = description.trim();
    if (!cleanTitle) return alert("Please enter a title");

    setCreating(true);
    try {
      const res = await axios.post("http://localhost:3000/createCase", {
        title: cleanTitle,
        description: cleanDesc,
        owner: owner,
      });

      alert("✅ Case created successfully!");
      setTitle("");
      setDescription("");
      fetchCases();
    } catch (err) {
      console.error("❌ Error creating case:", err);
      alert("Failed to create case.");
    }
    setCreating(false);
  };

  const toggleCaseDetails = async (caseId) => {
    if (expandedCaseId === caseId) {
      setExpandedCaseId(null); // collapse
    } else {
      try {
        const res = await axios.get(`http://localhost:3000/case/${caseId}`);
        setCaseEvidenceMap((prev) => ({
          ...prev,
          [caseId]: res.data.case.evidences || [],
        }));
        setExpandedCaseId(caseId);
      } catch (err) {
        console.error("❌ Failed to fetch case details:", err);
        alert("Could not load case.");
      }
    }
  };

  useEffect(() => {
    if (account) fetchCases();
  }, [account]);

  return (
    <div>
      <NavBar account={account} disconnectMetaMask={disconnectMetaMask} />

      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-6">📁 Create and View Cases</h2>

        <div className="bg-white border rounded-lg p-4 mb-8 shadow">
          <h3 className="font-semibold mb-2">Create a New Case</h3>
          <input
            type="text"
            placeholder="Case Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-2 p-2 w-full border border-gray-300 rounded"
          />
          <textarea
            placeholder="Case Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-2 p-2 w-full border border-gray-300 rounded"
          />
          <button
            onClick={handleCreateCase}
            disabled={creating}
            className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-500 disabled:opacity-50"
          >
            {creating ? "Creating..." : "Create Case"}
          </button>
        </div>

        {loadingCases ? (
          <p className="text-gray-600">Loading cases...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {cases.map((c) => (
              <div
                key={c._id}
                className="p-4 border rounded shadow bg-gray-50 "
              >
                <h4 className="font-bold text-lg">{c.title}</h4>
                <p className="text-sm text-gray-600 mb-2">
                  {c.description || "No description."}
                </p>
                <div className="flex gap-2">
                  <Link
                    to={`/case-settings/${c._id}`}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    Open Settings
                  </Link>
                  <button
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    onClick={() => toggleCaseDetails(c._id)}
                  >
                    {expandedCaseId === c._id
                      ? "Hide Evidence"
                      : "View Evidence in Case"}
                  </button>
                </div>

                {expandedCaseId === c._id && (
                  <div className="mt-4 bg-white border border-gray-200 rounded p-3">
                    <h5 className="font-semibold mb-2 text-sm">
                      Evidence List:
                    </h5>
                    {caseEvidenceMap[c._id]?.length === 0 ? (
                      <p className="text-gray-500 text-sm italic">
                        No evidence in this case yet.
                      </p>
                    ) : (
                      <ul className="list-disc pl-5 text-sm">
                        {caseEvidenceMap[c._id].map((ev) => (
                          <li key={ev._id}>
                            <span className="font-medium">{ev.name}</span>{" "}
                            <span className="text-gray-500">
                              ({ev.originalName})
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseManager;
