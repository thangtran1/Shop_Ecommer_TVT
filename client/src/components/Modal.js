import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { showModal } from "store/app/appReducer";

const Modal = ({ children }) => {
  const dispatch = useDispatch();
  return (
    <div
      className="absolute z-50 inset-0 bg-overlay flex justify-center items-center"
      onClick={() =>
        dispatch(showModal({ isShowModal: false, modalChildren: null }))
      }
    >
      {children}
    </div>
  );
};

export default memo(Modal);
