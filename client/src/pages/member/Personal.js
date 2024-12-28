import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { InputForm } from "components";
import moment from "moment";
import { getCurrent } from "../../store/user.js/asyncAction";
import avatar from "assets/avatar_default.jpg";
import { toast } from "react-toastify";
import { apiUpdateCurrent } from "apis/user";
import { useSearchParams } from "react-router-dom";
import withBase from "hocs/withBase";
const Personal = ({ navigate }) => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm();
  const { current } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");
  console.log(current);
  useEffect(() => {
    reset({
      firstname: current?.firstname,
      lastname: current?.lastname,
      phone: current?.phone,
      email: current?.email,
      avatar: current?.avatar,
      address: current?.address,
    });
  }, [current]);
  const handleUpdateUser = async (data) => {
    const formData = new FormData();
    if (data.avatar.length > 0) formData.append("avatar", data.avatar[0]);
    delete formData.avatar;

    for (let i of Object.entries(data)) formData.append(i[0], i[1]);
    const response = await apiUpdateCurrent(formData);
    console.log("123123", response);
    if (response.success) {
      dispatch(getCurrent());
      toast.success(response.message || "Updated user successfully");
      if (redirect) {
        navigate(redirect);
      }
    } else {
      toast.error(response.message || "Updated user failed");
    }
  };

  return (
    <div className="w-full relative px-4 ">
      <header className="py-4 border-b border-gray-600 text-3xl font-bold">
        Personal
      </header>
      <form
        onSubmit={handleSubmit(handleUpdateUser)}
        className="w-3/5 mx-auto py-8 flex flex-col gap-4"
      >
        <InputForm
          label="First Name"
          register={register}
          errors={errors}
          id="firstname"
          validate={{ required: "First Name is required" }}
        />
        <InputForm
          label="Last Name"
          register={register}
          errors={errors}
          id="lastname"
          validate={{ required: "Last Name is required" }}
        />
        <InputForm
          label="Email"
          register={register}
          errors={errors}
          id="email"
          validate={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Email is not valid",
            },
          }}
        />
        <InputForm
          label="Phone"
          register={register}
          errors={errors}
          id="phone"
          validate={{
            required: "Phone is required",
            pattern: {
              value:
                /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gm,
              message: "Phone must be a valid phone number",
            },
          }}
        />
        <InputForm
          label="Address"
          register={register}
          errors={errors}
          id="address"
          validate={{ required: "Address is required" }}
        />
        <div className="flex items-center gap-2">
          <span className="font-medium">Account Status:</span>
          <span className="font-semibold">
            {current?.isBlocked ? "Blocked" : "Active"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Role:</span>
          <span className="font-semibold">
            {current?.role === "admin" ? "Admin" : "Member"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Created At:</span>
          <span className="font-semibold">
            {moment(current?.createdAt).fromNow()}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-medium">Avatar:</span>
          <label htmlFor="avatar" className="btn-primary">
            <img
              src={current?.avatar || avatar}
              alt="avatar"
              className="w-20 h-20 ml-8 rounded-full object-cover"
            />
            <input type="file" id="avatar" hidden {...register("avatar")} />
          </label>
        </div>
        {isDirty && (
          <div className="flex justify-end">
            <button type="submit" className="btn-primary">
              Update
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default withBase(Personal);
