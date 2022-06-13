import React from "react";



import styles from "./index.module.css"
import { AiOutlineCloseCircle } from 'react-icons/ai';




function Modal({ children, ...rest }) {
  return (
    <>
      <div className={styles.ContainerModal}>
        <div className={styles.ModalContent}>
          <div className={styles.Title}>
            <h1>{rest.title}</h1>
            <AiOutlineCloseCircle className={styles.IconClose} onClick={() => {rest.setOpen(false)}} size={40}/>
           
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
