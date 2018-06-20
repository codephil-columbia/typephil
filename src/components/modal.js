import React from 'react';
import ReactModal from 'react-modal';

const modal = (props) => {
    return (
        <ReactModal 
           isOpen={true}
           contentLabel="Minimal Modal Example"
        >
          <button onClick={this.handleCloseModal}>Close Modal</button>
        </ReactModal>
    )
}

export default modal;