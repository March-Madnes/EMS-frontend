import React from "react";

const EvidenceLogs = (logs) => {
  const evidenceLogs = logs.logs;
  console.log("Evidence Logs:", evidenceLogs);
  return (
    <div id="webcrumbs">
      <div className="w-full md:w-[800px] mx-auto bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="bg-primary-700 p-4">
          <h1 className="text-xl md:text-2xl font-bold mb-1">
            Evidence Activity Logs
          </h1>
          <p className="text-sm opacity-80">
            Track all events and user actions in real time
          </p>
        </div>

        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
            <div className="text-sm text-gray-600 mb-1">Evidence Status</div>
            <div className="flex items-center space-x-2">
              <span className="inline-block h-3 w-3 bg-green-500 rounded-full"></span>
              <span className="font-medium">Active</span>
            </div>
          </div>

          {evidenceLogs?.map((log) => (
            <div key={log.id} className="space-y-4 mb-4">
              <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-primary-300 transition-all duration-200 group shadow-sm hover:shadow">
                <div className="flex items-start p-3 md:p-4 bg-white">
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:justify-between mb-1 md:mb-0">
                      <h3 className="font-medium text-gray-900">{log.event}</h3>
                      <span className="text-xs md:text-sm text-gray-500 mt-1 md:mt-0">
                        {log.timestamp}
                      </span>
                    </div>
                    {log.user && (
                      <p className="text-sm text-gray-600 mt-1">
                        User: {log.user}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-4 md:mt-6 text-center text-xs md:text-sm text-gray-500">
            <p>Showing all events • Last updated just now</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvidenceLogs;
