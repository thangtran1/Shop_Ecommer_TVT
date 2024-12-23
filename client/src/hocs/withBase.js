import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
const withBase = (Component) => (props) => {
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.user);
  const { categories } = useSelector((state) => state.app);
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Component
      {...props}
      navigate={navigate}
      dispatch={dispatch}
      current={current}
      location={location}
      categories={categories}
    />
  );
};
export default withBase;
