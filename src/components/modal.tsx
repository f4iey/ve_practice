// components/Modal.tsx
import React from 'react';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onSelect: (choice: 'Basic' | 'Advanced') => void;
}

export const Modal: React.FC<ModalProps> = ({ show, onClose, onSelect }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl mb-4">Choose an Option</h2>
        <div className="flex space-x-4">
          <button
            className="btn btn-primary"
            onClick={() => onSelect('Basic')}
          >
            Basic
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => onSelect('Advanced')}
          >
            Advanced
          </button>
        </div>
        <button
          className="mt-4 btn btn-ghost"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};