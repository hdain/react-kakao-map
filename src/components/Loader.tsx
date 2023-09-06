import React from 'react';

function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex cursor-wait items-center justify-center bg-white">
      <div className="border-10 border-t-10 h-20 w-20 animate-spin rounded-full border-solid border-blue-500 border-gray-300" />
    </div>
  );
}

export default Loader;
