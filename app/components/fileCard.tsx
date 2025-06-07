import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { IconType } from 'react-icons';
import { FaFolder } from 'react-icons/fa';

interface FileCardProps {
  id: number;
  name: string;
}

const FileCard: React.FC<FileCardProps> = ({ id, name  }) => {
  const pathname = usePathname();
  return (
    <Link href={`${pathname}/CostumCategory/${id}`}>
    <div className="w-40 h-40 flex flex-col items-center justify-center space-y-2 rounded-md bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer">
      <FaFolder className={`text-xl text-gray-400`} />
      <p className="text-lg font-bold">{name}</p>
      
    </div>
    </Link>
  );
};

export default FileCard;