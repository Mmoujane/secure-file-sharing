import Link from 'next/link';
import React from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';

interface SharedFileProps {
  id: number | undefined;
}

const StorageInfo = ({ id }: SharedFileProps) => {
  return (
    <div>
      <Link href={`/space/${id}/upload`} className='flex flex-col items-center justify-center p-4 bg-[#F5F9FD] cursor-pointer'>
        <FaCloudUploadAlt className="text-7xl text-[#377dff] mb-4" />
        <div>
          Add New File
        </div>
      </Link>
    </div>

  );
};

export default StorageInfo;