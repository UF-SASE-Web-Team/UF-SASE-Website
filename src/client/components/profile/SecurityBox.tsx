import React, { useState } from "react";

const SecurityBox: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string, event: React.MouseEvent) => {
    event.preventDefault();
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <div className="group mx-auto w-full max-w-5xl rounded-2xl border border-white bg-transparent px-4 py-6 shadow-xl md:px-10">
      <h2 className="mb-6 text-xl font-bold">Security</h2>

      <div className="flex justify-between">
        {/* Left Section (Dropdowns) */}
        <div className="w-1/2">
          {/* Privacy Policy */}
          <details className="group mb-10" open={activeDropdown === "privacy"}>
            <summary onClick={(e) => toggleDropdown("privacy", e)} className="flex cursor-pointer items-center font-redhat text-lg font-semibold">
              <svg
                className={`mr-2 h-6 w-6 transition-transform duration-300 ${activeDropdown === "privacy" ? "rotate-90" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
              Privacy Policy
            </summary>
            {activeDropdown === "privacy" && (
              <div className="mt-2 max-h-40 overflow-y-auto rounded-lg bg-gray-100 p-4 font-redhat text-sm text-gray-700">
                <p>
                  This privacy policy ("policy") will help you understand how UF SASE ("us", "we", "our") uses and protects the data you provide to us
                  when you visit and use ufsase.com ("blog", "service").
                </p>
                <p>
                  We reserve the right to change this policy at any given time, of which you will be promptly updated. If you want to make sure that
                  you are up to date with the latest changes, we advise you to frequently visit this page.
                </p>
                <p>
                  <strong>What User Data We Collect</strong>
                </p>
                <ul className="list-disc pl-5">
                  <li>Your IP address.</li>
                  <li>Your contact information and email address.</li>
                  <li>Other information such as interests and preferences.</li>
                  <li>Data profile regarding your online behavior on our blog.</li>
                </ul>
                <p>
                  <strong>Why We Collect Your Data</strong>
                </p>
                <ul className="list-disc pl-5">
                  <li>To better understand your needs.</li>
                  <li>To improve our services and products.</li>
                  <li>To send you promotional emails containing information we think you will find useful.</li>
                </ul>
              </div>
            )}
          </details>

          {/* User Agreement */}
          <details className="group mb-10" open={activeDropdown === "user-agreement"}>
            <summary
              onClick={(e) => toggleDropdown("user-agreement", e)}
              className="flex cursor-pointer items-center font-redhat text-lg font-semibold"
            >
              <svg
                className={`mr-2 h-6 w-6 transition-transform duration-300 ${activeDropdown === "user-agreement" ? "rotate-90" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
              User Agreement
            </summary>
            {activeDropdown === "user-agreement" && (
              <div className="mt-2 max-h-40 overflow-y-auto rounded-lg bg-gray-100 p-4 font-redhat text-sm text-gray-700">
                <p>User agreement terms and conditions will go here.</p>
              </div>
            )}
          </details>

          {/* Cookie Policy */}
          <details className="group mb-10" open={activeDropdown === "cookie"}>
            <summary onClick={(e) => toggleDropdown("cookie", e)} className="flex cursor-pointer items-center font-redhat text-lg font-semibold">
              <svg
                className={`mr-2 h-6 w-6 transition-transform duration-300 ${activeDropdown === "cookie" ? "rotate-90" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
              Cookie Policy
            </summary>
            {activeDropdown === "cookie" && (
              <div className="mt-2 max-h-40 overflow-y-auto rounded-lg bg-gray-100 p-4 font-redhat text-sm text-gray-700">
                <p>We use cookies to improve user experience and collect analytics.</p>
              </div>
            )}
          </details>

          {/* Copyright Policy */}
          <details className="group mb-10" open={activeDropdown === "copyright"}>
            <summary onClick={(e) => toggleDropdown("copyright", e)} className="flex cursor-pointer items-center font-redhat text-lg font-semibold">
              <svg
                className={`mr-2 h-6 w-6 transition-transform duration-300 ${activeDropdown === "copyright" ? "rotate-90" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
              Copyright Policy
            </summary>
            {activeDropdown === "copyright" && (
              <div className="mt-2 max-h-40 overflow-y-auto rounded-lg bg-gray-100 p-4 font-redhat text-sm text-gray-700">
                <p>All content is copyrighted and should not be redistributed without permission.</p>
              </div>
            )}
          </details>
        </div>

        <div className="flex w-1/3 flex-col items-center">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2 h-5 w-5 font-redhat accent-black" />
            <span>Share my info to [some third party]</span>
          </label>
          <div className="ml-4 font-redhat text-gray-500">[Add more here]</div>
        </div>
      </div>
    </div>
  );
};

export default SecurityBox;
