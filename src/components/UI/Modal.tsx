import React from 'react';
import { useUIStore } from '../../store';

const Modal: React.FC = () => {
  const { isModalOpen, modalContent, closeModal } = useUIStore();
  
  if (!isModalOpen) return null;
  
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={closeModal}>
          &times;
        </button>
        {modalContent}
      </div>
    </div>
  );
};

export default Modal; 