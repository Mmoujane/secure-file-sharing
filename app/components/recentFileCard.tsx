import React, { useState } from 'react';
import { FaCog, FaShare, FaPaperPlane, FaTrash } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { shareWithDepatement } from '../utils/shareWithDepartement';
import { shareWithUser } from '../utils/shareWithUser';
import { deleteFile } from '../utils/deleteFile';

interface RecentFileCardProps {
  id: number;
  name: string;
  type: string;
  size: string;
  color: string;
  iconColor: string;
  icon: React.ElementType;
}

const RecentFileCard: React.FC<RecentFileCardProps> = ({ id, name, type, size, color, iconColor, icon: Icon }) => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [sendTo, setSendTo] = useState('');

  const handleShare = () => {
    setIsShareOpen(!isShareOpen);
    setIsDeleteOpen(false);
  };

  const handleSettings = () => {
    setIsDeleteOpen(!isDeleteOpen);
    setIsShareOpen(false);
  };

  const handleSend = async (fileId: number) => {
    const {message} = await shareWithDepatement(fileId);
    console.log(message);
    setIsShareOpen(false);
    alert(message);
};

const handleSendToPerson = async (fileId: number) => {

    const {message} = await shareWithUser(fileId, sendTo);
    console.log(message);
    setIsShareOpen(false);
    alert(message); // Error alert
  
};

  const handleDelete = async (fileId: number) => {
    // Handle delete logic here
    console.log('Deleting file:', fileId);
    const result = await deleteFile(fileId);
    setIsDeleteOpen(false);
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 mb-2 bg-white rounded-md shadow-md cursor-pointer">
      <div className="flex items-center space-x-4">
        <div className={`w-10 h-10 ${color} rounded-full flex items-center justify-center`}>
            <Icon className={`text-xl text-white`} />
        </div>
        <div>
          <p className="text-lg font-bold">{name.split('-')[1].slice(0, 15)}</p>
          <p className="text-sm text-gray-500">{type}</p>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500">{(Number(size)/(2024*2024)).toFixed(1)} mb</p>
      </div>
      <div className="relative">
        <button 
          className="p-2 text-gray-500 hover:text-indigo-500 transition-colors cursor-pointer"
          onClick={handleShare}
        >
          <FaShare className="text-lg" />
        </button>

        {isShareOpen && (
          <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl p-4 z-50">
            <div className="space-y-4">
              <button
                onClick={() => handleSend(id)}
                className="px-4 py-2 bg-[#06367A] text-white rounded-md hover:bg-[#052b5f] transition-colors flex items-center gap-2"
              >
                <FaPaperPlane />
                Send to departement
              </button>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={sendTo}
                  onChange={(e) => setSendTo(e.target.value)}
                  placeholder="Send to"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#06367A] focus:border-transparent"
                />
                <button
                  onClick={() => handleSendToPerson(id)}
                  className="px-4 py-2 bg-[#06367A] text-white rounded-md hover:bg-[#052b5f] transition-colors flex items-center gap-2"
                >
                  <FaPaperPlane />
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="relative">
        <button 
          className="p-2 text-gray-500 hover:text-indigo-500 transition-colors cursor-pointer"
          onClick={handleSettings}
        >
          <FaCog className="text-lg"/>
        </button>

        {isDeleteOpen && (
          <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-xl p-4 z-50">
            <button
              onClick={() => handleDelete(id)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center gap-2"
            >
              <FaTrash />
              Delete File
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentFileCard;