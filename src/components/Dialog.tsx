// src/components/Dialog.tsx
import React from 'react';

interface DialogProps {
  title: string;
  description: string;
  onClose: () => void;
}

const Dialog: React.FC<DialogProps> = ({ title, description, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      {/* Modal box */}
      <div className="bg-white rounded-lg shadow-xl p-6 w-11/12 max-w-sm animate-fade-in">
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-3">{title}</h2>
        <p className="text-gray-600 text-center text-sm mb-5">{description}</p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
