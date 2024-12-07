import React, { useState } from "react";
import Buttons from "../../components/Buttons";
import { useParams } from "react-router-dom";
import { apiResetPassword } from "../../apis/user";
import { toast } from "react-toastify";
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const handleSubmitResetPassword = async () => {
    const response = await apiResetPassword({ password, token });
    if (response.success) {
      toast.success(response.msg);
    } else {
      toast.error(response.msg);
    }
  };
  return (
    <div className="absolute animate-slider-right top-0 bottom-0 left-0 right-0 bg-overlay flex-col items-center flex justify-center py-8 z-50">
      <div className=" gap-4 bg-white rounded-md flex flex-col items-center justify-center">
        <label htmlFor="password" className="text-2xl text-main">
          Enter your password
        </label>
        <input
          placeholder="Enter your password"
          type="text"
          id="password"
          className="w-[800px] placeholder:text-sm pb-2 border-b outline-none border-gray-300 rounded-md "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex gap-4 w-full items-center justify-end">
          <Buttons
            handleOnclick={handleSubmitResetPassword}
            name={"submit"}
            style="px-4 py-2 rounded-md text-white bg-blue-500 text-semibold my-2"
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
