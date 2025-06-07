'use client'

import React, { useState } from 'react';
import { addNewDepartement } from '@/app/utils/addNewDepartement';

const Login: React.FC = () => {
  
  const [departement, setDepartement] = useState<string>('');
  const [admin, setAdmin] = useState<string>('');
  const [adminmail, setAdminMail] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //console.log('Username:', departement);
    //console.log('Password:', admin);
    //console.log('email:', adminmail);
    const {message, error} = await addNewDepartement(departement, admin, adminmail);
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
            placeholder="DEPARTEMENT..."
            value={departement}
            onChange={(e) => setDepartement(e.target.value)}
            className="w-full px-4 py-2 border-2 border-[#2B548E] rounded-md focus:outline-none focus:border-blue-800 text-lg"
          />

          
          <input
            type="text"
            placeholder="ADMIN..."
            value={admin}
            onChange={(e) => setAdmin(e.target.value)}
            className="w-full px-4 py-2 border-2 border-[#2B548E] rounded-md focus:outline-none focus:border-blue-800 text-lg"
          />

          <input
            type="mail"
            placeholder="ADMIN MAIL..."
            value={adminmail}
            onChange={(e) => setAdminMail(e.target.value)}
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