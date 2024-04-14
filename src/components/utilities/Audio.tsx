import React from 'react';

interface AudioProps {
  onClick: () => void;
  date: string;
  seen: boolean;
  right: boolean;
  audio: string;
}

const Audio: React.FC<AudioProps> = ({ onClick, date, seen, right, audio }) => {
  console.log(date, seen, right, audio);

  return (
    <div onClick={onClick}>
      {/* Your JSX content here */}
    </div>
  );
};

export default Audio;
