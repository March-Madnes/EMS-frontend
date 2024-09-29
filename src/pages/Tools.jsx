import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import { Footer } from "../comp/Footer";

const Tools = () => {
  const { account, disconnectMetaMask, loading } = useAuth(); // Use the latest auth context
  const [showDropdown, setShowDropdown] = useState(false); // For the account dropdown

  const tools = [
    {
        name: "Bit by Bit Imaging",
        description: "Forensic tool for creating forensic images of hard drives and USB drives.",
        icon: "📀",
    },
    {
      name: "Autopsy & The Sleuth Kit",
      description: "Well-known forensics toolkits for analyzing hard drives and smartphones with user-friendly GUI.",
      icon: "🕵️‍♂️",
    },
    {
      name: "EnCase",
      description: "Powerful tool for recovering deleted files, analyzing data, and examining digital evidence.",
      icon: "🔍",
    },
    {
      name: "FTK Imager",
      description: "Enables forensic professionals to create forensic images and extract data from file systems.",
      icon: "🖼️",
    },
    {
      name: "X-Ways Forensic",
      description: "Efficient tool for handling large volumes of data, offering file carving, registry analysis, and timeline creation.",
      icon: "📊",
    },
    {
      name: "Cellebrite UFED Physical Analyzer",
      description: "Specializes in mobile forensics, extracting and analyzing data from smartphones and tablets.",
      icon: "📱",
    },
    {
      name: "Oxygen Forensic Suite",
      description: "Comprehensive mobile forensics tool supporting various devices with detailed reporting.",
      icon: "💻",
    },
  ];

  const navigate = useNavigate();

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
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Nav */}
      <nav className="border-b bg-white shadow">
        <div className="max-w-screen-xl mx-auto p-4 flex items-center justify-between">
          <a href="/dashboard" className="text-2xl font-semibold">
            EMS
          </a>
          <div className="flex items-center">
            <a href="/tools" className="text-md text-gray-800 mx-3">
              Tools
            </a>
            {account && (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center text-sm text-gray-800"
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
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-20">
                    <div className="px-4 py-2 text-sm text-gray-700">
                      Connected:{" "}
                      {`${account.slice(0, 6)}...${account.slice(-4)}`}
                    </div>
                    <div
                      onClick={disconnectMetaMask}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 cursor-pointer hover:bg-gray-100"
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

      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-screen-xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Our Tools
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
              >
                <div className="text-5xl mb-4">{tool.icon}</div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {tool.name}
                </h2>
                <p className="text-gray-600">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Tools;
