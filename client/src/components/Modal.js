import React from "react";
import { showModal } from "store/app/appReducer";
import withBase from "hocs/withBase";
const Modal = ({ children, dispatch }) => {
  return (
    <div
      className="bg-overlay"
      onClick={() =>
        dispatch(showModal({ isShowModal: false, modalChildren: null }))
      }
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default withBase(Modal);
