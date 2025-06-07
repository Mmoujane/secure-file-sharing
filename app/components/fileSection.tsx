import React, { useState, useEffect } from 'react';
import FileCard from './fileCard';
import { FaFolder, FaFolderOpen, FaTimes } from 'react-icons/fa';
import { addCategory } from '../utils/addCategory';
import { getCategories } from '../utils/getCategories';
import { useRouter } from 'next/navigation';

const files = [
  { id: 1, name: "Work", count: 480, iconColor: "text-indigo-500", icon: FaFolder },
  { id: 2, name: "Personal", count: 480, iconColor: "text-teal-500", icon: FaFolderOpen },
];

interface Categories {
  id: number,
  name: string,
  userId: number,
  createdAt: string
}

const FilesSection: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categories, setCategories] = useState<Categories[]>([]);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle category creation here
    const result = addCategory(newCategoryName);
    console.log(result);
    setNewCategoryName('');
    setIsModalOpen(false);
    window.location.reload();
    
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getCategories();
      console.log(result);
      setCategories(result.categories);
    };

    fetchCategories();
  }, []);


  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-4">Files</h2>
      <div className="flex space-x-4">
        {categories.map((file) => (
          <FileCard key={file.id} id={file.id} name={file.name} />
        ))}
        <div 
          className="w-40 h-40 flex flex-col items-center justify-center space-y-2 rounded-md bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="text-4xl font-bold text-gray-500">+</span>
        </div>
        {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop with blur */}
          <div 
            className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-lg p-6 w-96 shadow-xl">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FaTimes className="text-xl" />
            </button>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Category</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  id="categoryName"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#06367A] focus:border-transparent"
                  placeholder="Enter category name"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#06367A] text-white py-2 px-4 rounded-md hover:bg-[#052b5f] transition-colors"
              >
                Create Category
              </button>
            </form>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default FilesSection;