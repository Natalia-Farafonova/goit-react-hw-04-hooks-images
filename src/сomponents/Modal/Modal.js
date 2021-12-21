import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ closeModal, modalImg }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      console.log('click');
      closeModal();
    }
  };

  const backDropClick = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={backDropClick}>
      <div className={s.Modal}>
        <img src={modalImg.img} alt={modalImg.tags} key={modalImg.id} />
      </div>
    </div>,
    modalRoot,
  );
}

// export default class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }
//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.closeModal();
//     }
//   };

//   backDropClick = event => {
//     console.log('click');
//     if (event.target === event.currentTarget) {
//       this.props.closeModal();
//     }
//   };
//   render() {
//     return createPortal(
//       <div className={s.Overlay} onClick={this.backDropClick}>
//         <div className={s.Modal}>
//           <img
//             src={this.props.modalImg.img}
//             alt={this.props.modalImg.tags}
//             key={this.props.modalImg.id}
//           />
//         </div>
//       </div>,
//       modalRoot,
//     );
//   }
// }

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalImg: PropTypes.object,
};
