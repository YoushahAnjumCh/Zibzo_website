import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <img src="/loading.gif" alt="Loading..." className="w-24 h-24" />
    </div>
  );
};

export default Loading;
