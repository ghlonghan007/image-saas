"use client"
import React from 'react';
import { RandomAvatar } from "react-random-avatars";
interface RandomAvatarProps {
  name: string;
  size: number;
}

export const RandomUserAvatar: React.FC<RandomAvatarProps> = ({ name, size }) => {
  return (
    <div>
      <RandomAvatar name={name} size={size} mode='colors'/>
    </div>
  );
}

