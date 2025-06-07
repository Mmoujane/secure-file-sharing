import React from 'react';
import Image from 'next/image';
import { colaborate } from '../utils/colaborate';

interface CollaborateCardProps {
  id: number;
  name: string;
  color: string;
  image: string;
}

const CollaborateCard: React.FC<CollaborateCardProps> = ({ id, name, color, image }) => {

  const handleColaboration = async (departement: string) => {
      const {message} = await colaborate(departement);
      console.log(message);
      alert(message);
    };

  return (
    <div
      className={`w-40 h-40 flex flex-col items-center justify-center space-y-2 rounded-md ${color} cursor-pointer`}
      onClick={() => handleColaboration(name)}
    >
      <div className="relative w-16 h-16 rounded-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          priority
        />
      </div>
      <p className="text-white text-lg font-bold text-center">{name}</p>
    </div>
  );
};

export default CollaborateCard;