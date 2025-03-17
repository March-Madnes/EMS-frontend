import React from "react";

export const Cards = () => {
  return (
    <div>
      <div class="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow">
        <div class="flex flex-col items-center pb-10 mt-5">
          <h5 class="mb-1 text-xl font-medium text-gray-900">Evidence name</h5>
          <span class="text-sm text-gray-500">Digital Evidence</span>
          <div class="flex mt-4 md:mt-6 px-3">
            <a
              href="#"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              Download Copy
            </a>
            <a
              href="#"
              class="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
            >
              Generate Report
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
