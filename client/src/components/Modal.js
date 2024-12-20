import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { showModal } from "store/app/appReducer";

const Modal = ({ children }) => {
  const dispatch = useDispatch();

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

export default memo(Modal);
