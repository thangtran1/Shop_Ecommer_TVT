import React, { useState } from "react";
import { Form, Input, Button, Card } from "antd";
import { UserOutlined, LockOutlined, PhoneOutlined } from "@ant-design/icons";
import {
  apiLogin,
  apiRegister,
  apiForgotPassword,
  apiFinalRegister,
} from "../../apis/user";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import path from "../../ultils/path";
import { useDispatch } from "react-redux";
import { login } from "../../store/user.js/userSlice";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isRegister, setIsRegister] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [token, setToken] = useState("");
  const [isVerifyEmail, setIsVerifyEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onFinish = async (values) => {
    const { firstname, lastname, phone, ...data } = values;

    setIsLoading(true);
    try {
      if (isRegister) {
        const response = await apiRegister(values);
        if (response.success) {
          setIsVerifyEmail(true);
        } else {
          Swal.fire("Oops!", response.msg, "error");
        }
      } else {
        const response = await apiLogin(data);
        if (response.success) {
          navigate(`/${path.HOME}`);
          dispatch(
            login({
              isLoggedIn: true,
              userData: response.userData,
              token: response.accessToken,
            })
          );
        } else {
          Swal.fire("Oops!", response.msg, "error");
        }
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong!", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (values) => {
    const response = await apiForgotPassword(values);
    if (response.success) {
      toast.success(response.msg);
      setIsForgotPassword(false);
    } else {
      toast.error(response.msg);
    }
  };

  const finalRegister = async () => {
    const response = await apiFinalRegister(token);
    if (response.success) {
      Swal.fire("Congratulation", response.msg, "success").then(() => {
        setIsRegister(false);
        form.resetFields();
      });
    } else {
      toast.error(response.msg);
    }
    setIsVerifyEmail(false);
    setToken("");
  };

  return (
    <div className="w-full h-screen relative">
      {isVerifyEmail && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-overlay z-50 flex flex-col items-center justify-center">
          <div className="bg-white w-[500px] rounded-md p-4">
            <h3 className="text-2xl font-semibold text-main text-center mb-4">
              Confirm register account
            </h3>
            <input
              placeholder="Enter code"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4 outline-none"
            />
            <Button type="primary" htmlType="submit" onClick={finalRegister}>
              Confirm
            </Button>
            <p className="text-center">
              Please check your email to complete the registration
            </p>
          </div>
        </div>
      )}
      {isForgotPassword && (
        <div className="absolute animate-slider-right top-0 bottom-0 left-0 right-0 bg-overlay flex-col items-center flex justify-center py-8 z-50">
          <Card className="w-[500px]">
            <h2 className="text-2xl text-main text-center mb-4">
              Forgot Password
            </h2>
            <Form onFinish={handleForgotPassword}>
              <Form.Item
                name="email"
                validateFirst={true}
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Invalid email format!" },
                  {
                    validator: (_, value) =>
                      value.trim()
                        ? Promise.resolve()
                        : Promise.reject("Firstname cannot be just spaces!"),
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Email" />
              </Form.Item>
              <div className="flex gap-4 justify-end">
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button onClick={() => setIsForgotPassword(false)}>
                  Cancel
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      )}

      <img
        src="https://img.freepik.com/free-vector/gradient-glassmorphism-background_23-2149489059.jpg?size=626&ext=jpg"
        alt="login"
        className="w-full h-full object-cover"
      />

      <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
        <Card className="min-w-[500px]">
          <h1 className="text-[28px] font-semibold text-main mb-8 text-center">
            {isRegister ? "Register" : "Login"}
          </h1>

          <Form
            className="text-center"
            form={form}
            name="login"
            onFinish={onFinish}
            layout="vertical"
          >
            {isRegister && (
              <div className="flex gap-2">
                <Form.Item
                  name="firstname"
                  validateFirst={true}
                  rules={[
                    { required: true, message: "Please input your firstname!" },
                    {
                      validator: (_, value) =>
                        value.trim()
                          ? Promise.resolve()
                          : Promise.reject("Firstname cannot be just spaces!"),
                    },
                  ]}
                  className="flex-1"
                >
                  <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item
                  name="lastname"
                  validateFirst={true}
                  rules={[
                    { required: true, message: "Please input your lastname!" },
                    {
                      validator: (_, value) =>
                        value.trim()
                          ? Promise.resolve()
                          : Promise.reject("Lastname cannot be just spaces!"),
                    },
                  ]}
                  className="flex-1"
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
              </div>
            )}

            <Form.Item
              name="email"
              validateFirst={true}
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Invalid email format!" },
                {
                  validator: (_, value) =>
                    value.trim()
                      ? Promise.resolve()
                      : Promise.reject("Email cannot be just spaces!"),
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>

            {isRegister && (
              <Form.Item
                name="phone"
                validateFirst={true}
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "Please input valid phone number!",
                  },
                  {
                    validator: (_, value) =>
                      value.trim()
                        ? Promise.resolve()
                        : Promise.reject("Phone number cannot be just spaces!"),
                  },
                ]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
              </Form.Item>
            )}

            <Form.Item
              name="password"
              validateFirst={true}
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password must be at least 6 characters!" },
                {
                  validator: (_, value) =>
                    value.trim()
                      ? Promise.resolve()
                      : Promise.reject("Password cannot be just spaces!"),
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                loading={isLoading}
              >
                {isRegister ? "REGISTER" : "SIGN IN"}
              </Button>
            </Form.Item>

            <div className="flex items-center justify-between my-2 w-full text-sm">
              {!isRegister && (
                <span
                  onClick={() => setIsForgotPassword(true)}
                  className="text-gray-800 hover:text-main hover:underline cursor-pointer"
                >
                  Forgot your password?
                </span>
              )}
              <span
                onClick={() => {
                  setIsRegister(!isRegister);
                  form.resetFields();
                }}
                className="text-gray-800 hover:underline hover:text-main cursor-pointer"
              >
                {isRegister ? "Sign in" : "Create an account"}
              </span>
            </div>
            <Link
              to={`/${path.HOME}`}
              className=" text-sm  text-blue-500 hover:underline cursor-pointer"
            >
              Go Home
            </Link>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
