'use client';

import Link from 'next/link';
import { FaFileUpload, FaUserPlus, FaShareAlt, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa6';

export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="max-w-6xl px-4 py-8 sm:py-16 lg:px-8 flex flex-col justify-center items-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to Secure File Sharing Platform
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Simplify your file management with secure storage, easy sharing, and seamless collaboration.
          </p>
        </div>

        {/* Call-to-Action */}
        <div className="mt-8">
          <Link
            href="/login"
            className="inline-flex items-center px-5 py-3 text-base font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Get Started - Log In
          </Link>
        </div>
      </div>

      {/* Features Highlight */}
      <div className="max-w-6xl px-4 py-8 sm:py-16 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What You Can Do</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Feature Card 1 */}
          <div className="bg-white shadow-md hover:shadow-lg rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer">
            <FaFileUpload className="text-3xl text-indigo-500 mb-2" />
            <h3 className="text-lg font-semibold text-gray-900">Secure File Storage</h3>
            <p className="text-sm text-gray-600">Store files safely with solid access control list.</p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-white shadow-md hover:shadow-lg rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer">
            <FaUserPlus className="text-3xl text-green-500 mb-2" />
            <h3 className="text-lg font-semibold text-gray-900">Collaboration Made Easy</h3>
            <p className="text-sm text-gray-600">Share files securely with team members.</p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-white shadow-md hover:shadow-lg rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer">
            <FaShareAlt className="text-3xl text-yellow-500 mb-2" />
            <h3 className="text-lg font-semibold text-gray-900">Easy File Sharing</h3>
            <p className="text-sm text-gray-600">Send files directly from your dashboard.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-gray-500 hover:text-gray-600 text-2xl">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-600 text-2xl">
              <FaGithub />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-600 text-2xl">
              <FaLinkedin />
            </a>
          </div>
          <p className="mt-4 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}