import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons';
import { usePathname } from 'next/navigation';

interface CategoryCardProps {
  id: number;
  name: string;
  count: number;
  color: string;
  iconColor: string;
  icon: IconType;

}

const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, count, color, iconColor, icon: Icon }) => {
  const pathname = usePathname();
  return (
    <Link href={`${pathname}/FileType/${name}`}>
    <div
      className={`w-40 h-40 flex flex-col items-center justify-center space-y-2 rounded-md ${color} hover:shadow-lg transition-shadow cursor-pointer`}
    >
      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
        <Icon className={`text-xl ${iconColor}`} />
      </div>
      <p className="text-white text-lg font-bold">{name}</p>
      
    </div>
    </Link>
  );
};

export default CategoryCard;