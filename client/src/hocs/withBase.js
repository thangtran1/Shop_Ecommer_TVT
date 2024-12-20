import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const withBase = (Component) => (props) => {
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Component
      {...props}
      navigate={navigate}
      dispatch={dispatch}
      current={current}
      location={location}
    />
  );
};

export default withBase;
