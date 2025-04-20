import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import NavBar from "../../comp/Navv2";
import { useParams, useNavigate } from "react-router-dom";

const CaseSettingsPage = () => {
  const { id: caseId } = useParams();
  const { account, disconnectMetaMask, loading } = useAuth();
  const owner = import.meta.env.VITE_APP_OWNER;
  const navigate = useNavigate();

  const [selectedCase, setSelectedCase] = useState(null);
  const [userEvidences, setUserEvidences] = useState([]);
  const [selectedEvidenceId, setSelectedEvidenceId] = useState("");
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    if (!account && !loading) navigate("/login");
  }, [account, loading, navigate]);

  const fetchCaseDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/case/${caseId}`);
      setSelectedCase(res.data.case);
    } catch (err) {
      console.error("❌ Error fetching case details:", err);
      alert("Could not load case");
    }
  };

  const fetchUserEvidences = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/userEvidence?owner=${owner}`
      );
      console.log("User evidences:", res.data.evidences);
      setUserEvidences(res.data.evidences || []);
    } catch (err) {
      console.error("❌ Error fetching evidence:", err);
    }
  };

  const handleAssignEvidence = async () => {
    if (!selectedEvidenceId) return alert("Please select evidence");

    setAssigning(true);
    try {
      await axios.post("http://localhost:3000/addEvidenceToCase", {
        evidenceId: selectedEvidenceId,
        caseId,
      });

      alert("✅ Evidence added to case!");
      setSelectedEvidenceId("");
      fetchCaseDetails();
    } catch (err) {
      console.error("❌ Failed to assign evidence:", err);
      alert("Could not assign evidence.");
    }
    setAssigning(false);
  };

  useEffect(() => {
    if (account && caseId) {
      fetchCaseDetails();
      fetchUserEvidences();
    }
  }, [account, caseId]);

  return (
    <div>
      <NavBar account={account} disconnectMetaMask={disconnectMetaMask} />

      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">⚙️ Case Settings</h1>

        {selectedCase ? (
          <div className="bg-white border rounded p-6 shadow">
            <h2 className="text-xl font-bold mb-2">
              Editing Case: {selectedCase.title}
            </h2>

            <div className="mt-4 mb-6">
              <label className="block text-sm font-medium mb-1">
                Add Evidence:
              </label>
              <div className="flex gap-2">
                <select
                  value={selectedEvidenceId}
                  onChange={(e) => setSelectedEvidenceId(e.target.value)}
                  className="border p-2 rounded w-full"
                >
                  <option value="">-- Select your evidence --</option>
                  {userEvidences.map((ev) => (
                    <option key={ev.evidenceId} value={ev.evidenceId}>
                      {ev.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleAssignEvidence}
                  disabled={assigning}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 disabled:opacity-50"
                >
                  {assigning ? "Assigning..." : "Assign"}
                </button>
              </div>
            </div>

            <h4 className="font-semibold text-md mb-2">
              📦 Evidence in this Case:
            </h4>
            <div className="grid gap-4">
              {selectedCase.evidences.length === 0 ? (
                <p className="italic text-gray-500">No evidence yet.</p>
              ) : (
                selectedCase.evidences.map((ev) => (
                  <div
                    key={ev._id}
                    className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center"
                  >
                    <div className="mb-2 sm:mb-0 flex-col">
                      <p className="text-base font-semibold">{ev.name}</p>
                      <p className="text-sm text-gray-500">{ev.description}</p>
                    </div>
                    <Link
                      to={`/report/${ev.evidenceId}`}
                      className="inline-block text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      View Report
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <p>Loading case...</p>
        )}
      </div>
    </div>
  );
};

export default CaseSettingsPage;
