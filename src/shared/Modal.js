import React from 'react';
import ReactDOM from "react-dom";
import './modal.scss'
import { Paper } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';



const Modal = ({ handleClose, show,  children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    const JSX_MODAL  = (
      <div  className={showHideClassName}>
        <Paper className="modal-main">
          <IconButton className='icon' onClick={handleClose}> <CloseIcon /> </IconButton>
          {children}
        </Paper>
      </div>
    );

    return ReactDOM.createPortal(JSX_MODAL, document.querySelector("#modal"));
  };

  export default Modal