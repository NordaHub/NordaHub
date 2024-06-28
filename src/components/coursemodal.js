import React, { useState } from 'react';
import './Modal.css'; // Import your modal styling

function CoursesModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <button className="clickable-button2" onClick={openModal}>
        Courses
      </button>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Courses</h2>
            <p>This is the content of the modal.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CoursesModal;