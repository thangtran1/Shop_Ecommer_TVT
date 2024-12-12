import React, { useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import path from "ultils/path";
import Swal from "sweetalert2";
const FinalRegister = () => {
  const { status } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (status === "failed") {
      Swal.fire({
        title: "Failed",
        text: "Register is failed. Please try again",
        icon: "error",
      }).then(() => {
        navigate(`/${path.LOGIN}`);
      });
    }
    if (status === "success") {
      Swal.fire({
        title: "Success",
        text: "Register is successfully. Please go login",
        icon: "success",
      }).then(() => {
        navigate(`/${path.LOGIN}`);
      });
    }
  }, [navigate, status]);
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <Navigate to={`/${path.LOGIN}`} state={{ status }} />;
    </div>
  );
};

export default FinalRegister;
