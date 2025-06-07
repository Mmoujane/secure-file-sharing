'use client'

import { addNewUser } from '@/app/utils/addNewUser';
import React, { useState } from 'react';

const Login: React.FC = () => {
  
  const [username, setUsername] = useState<string>('');
  const [mail, setMail] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', mail);
    const {message, error} = await addNewUser(username, mail);
    console.log(message);
    setStatus(message);
    setError(error);
    
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#EBF2FC]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        
        <h1 className="text-2xl font-bold text-center text-[#2B548E]">Add User</h1>

        {status && (
          <div className={`p-3 ${error ? "text-red-600 bg-red-100" : "text-green-600 bg-green-100"} rounded-md`}>
            {status}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <input
            type="text"
            placeholder="USERNAME..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border-2 border-[#2B548E] rounded-md focus:outline-none focus:border-blue-800 text-lg"
          />

          
          <input
            type="mail"
            placeholder="MAIL..."
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            className="w-full px-4 py-2 border-2 border-[#2B548E] rounded-md focus:outline-none focus:border-blue-800 text-lg"
          />

          
          <button
            type="submit"
            className="w-full px-4 py-2 text-lg font-semibold text-[#2B548E] border-2 border-[#2B548E] rounded-md hover:bg-blue-600 hover:text-white transition duration-300 cursor-pointer"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;