import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import { Footer } from "../comp/Footer";
import NavBar from "../comp/Navv2";

const Tools = () => {
  const { account, disconnectMetaMask, loading } = useAuth(); // Use the latest auth context
  const [showDropdown, setShowDropdown] = useState(false); // For the account dropdown

  const tools = [
    {
      name: "Bit by Bit Imaging Windows",
      description:
        "Forensic tool for creating forensic images of hard drives and USB drives.",
      icon: "📀",
      link: "https://github.com/March-Madnes/DigitalForensicTool/raw/refs/heads/main/dist/BlockIntel.exe",
    },
    {
      name: "Bit by Bit Imaging Linux",
      description:
        "Forensic tool for creating forensic images of hard drives and USB drives.",
      icon: "🔍",
      link: "https://github.com/March-Madnes/DigitalForensicTool/raw/refs/heads/main/dist/BlockIntel",
    },
    // {
    //   name: "EnCase",
    //   description:
    //     "Powerful tool for recovering deleted files, analyzing data, and examining digital evidence.",
    //   icon: "🔍",
    // },
    // {
    //   name: "FTK Imager",
    //   description:
    //     "Enables forensic professionals to create forensic images and extract data from file systems.",
    //   icon: "🖼️",
    // },
    // {
    //   name: "X-Ways Forensic",
    //   description:
    //     "Efficient tool for handling large volumes of data, offering file carving, registry analysis, and timeline creation.",
    //   icon: "📊",
    // },
    // {
    //   name: "Cellebrite UFED Physical Analyzer",
    //   description:
    //     "Specializes in mobile forensics, extracting and analyzing data from smartphones and tablets.",
    //   icon: "📱",
    // },
    // {
    //   name: "Oxygen Forensic Suite",
    //   description:
    //     "Comprehensive mobile forensics tool supporting various devices with detailed reporting.",
    //   icon: "💻",
    // },
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
      <NavBar account={account} disconnectMetaMask={disconnectMetaMask} />
      
      {/* Main */}

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
                <p className="text-gray-600 mb-5">{tool.description}</p>
                <a href={tool.link} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Download</a>
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
