import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Modal = () => {
  return ReactDOM.createPortal(
    <aside className="c-modal-cover">
      <div className="c-modal">
        <button className="c-modal__close" aria-label="Close Modal">
          <span className="u-hide-visually">Close</span>
          <svg className="c-modal__close-icon" viewBox="0 0 40 40"><path d="M 10,10 L 30,30 M 30,10 L 10,30"></path></svg>
        </button>
        <div className="c-modal__body">
          CONTENT WILL GO HERE
        </div>
      </div>
    </aside>,
    document.body
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool
}

export default Modal;