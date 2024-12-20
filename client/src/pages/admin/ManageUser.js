import React, { useEffect, useState } from "react";
import { Table, Input, Pagination, Modal, Button } from "antd";
import { apiGetUsers, apiUpdateUser, apiDeleteUser } from "apis/user";
import moment from "moment";
import useDebounce from "hooks/useDebounce";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { InputForm } from "components";
import { toast } from "react-toastify";
import { blockStatus, roles } from "ultils/constants";
import { Select } from "antd";

const ManageUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      email: "",
      firstname: "",
      lastname: "",
      phone: "",
      role: "",
      status: "",
      isBlocked: false,
    },
  });
  const [searchParams] = useSearchParams();
  const [users, setUsers] = useState([]);
  const [totalCounts, setTotalCounts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [queries, setQueries] = useState({ q: "" });
  const [editUser, setEditUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchUsers = async (params = {}) => {
    const response = await apiGetUsers({
      ...params,
      page: currentPage,
      limit: 5,
    });
    if (response.success) {
      setUsers(response.users);
      setTotalCounts(response.counts);
    }
  };

  const queryDebounce = useDebounce(queries.q, 800);
  useEffect(() => {
    const queries = Object.fromEntries([...searchParams.entries()]);
    if (queryDebounce) queries.q = queryDebounce;
    fetchUsers(queries);
  }, [queryDebounce, searchParams, currentPage]);

  const handleUpdateUser = async (data) => {
    if (
      !data.firstname ||
      data.firstname.trim() === "" ||
      !data.lastname ||
      data.lastname.trim() === "" ||
      !data.email ||
      data.email.trim() === "" ||
      !data.phone ||
      data.phone.trim() === ""
    ) {
      toast.error(
        "Please fill in all fields and ensure they are not just spaces."
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const response = await apiUpdateUser(
      { ...editUser, ...data },
      editUser._id
    );
    if (response.success) {
      toast.success(response.message);
      setIsModalVisible(false);
      fetchUsers();
    } else {
      toast.error(response.message);
    }
  };
  const handleEditUser = (user) => {
    setEditUser(user);
    reset({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isBlocked: user.isBlocked,
    });
    setIsModalVisible(true);
  };

  const handleDeleteUser = async (uid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteUser(uid);
        if (response.success) {
          fetchUsers();
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      }
    });
  };

  const columns = [
    {
      title: "#",
      render: (text, record, index) => index + 1 + (currentPage - 1) * 5,
    },
    {
      title: "First Name",
      dataIndex: "firstname",
    },
    {
      title: "Last Name",
      dataIndex: "lastname",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Status",
      render: (text, record) => (record.isBlocked ? "Blocked" : "Active"),
    },
    {
      title: "Created At",
      render: (text, record) => moment(record.createdAt).format("DD/MM/YYYY"),
    },
    {
      title: "Action",
      render: (text, record) => (
        <>
          <span
            onClick={() => handleEditUser(record)}
            className="cursor-pointer text-orange-500 hover:underline"
          >
            edit
          </span>
          <span
            onClick={() => handleDeleteUser(record._id)}
            className="cursor-pointer text-red-500 hover:underline"
            style={{ marginLeft: 8 }}
          >
            delete
          </span>
        </>
      ),
    },
  ];

  return (
    <div className="w-full">
      <h1 className="h-[75px] flex items-center justify-between text-3xl font-bold px-4 border-b">
        <span className="text-[25px] font-bold">Manage User</span>
      </h1>
      <div className="w-full p-4">
        <div className="flex justify-end py-4">
          <Input
            placeholder="Search by name or email..."
            value={queries.q}
            onChange={(e) => setQueries({ q: e.target.value })}
            style={{ width: 300, marginRight: 8 }}
            className="search-input"
          />
        </div>
        <Table
          columns={columns}
          dataSource={users}
          pagination={false}
          rowKey="_id"
        />
        <Pagination
          current={currentPage}
          pageSize={5}
          total={totalCounts}
          onChange={(page) => setCurrentPage(page)}
          style={{ marginTop: 16, textAlign: "right" }}
        />
      </div>

      <Modal
        title="Edit User"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <form onSubmit={handleSubmit(handleUpdateUser)}>
          <InputForm
            label="First Name"
            id="firstname"
            register={register}
            errors={errors}
            placeholder="Enter first name"
          />
          <InputForm
            label="Last Name"
            id="lastname"
            register={register}
            errors={errors}
            placeholder="Enter last name"
          />
          <InputForm
            label="Email"
            id="email"
            register={register}
            errors={errors}
            placeholder="Enter email"
          />
          <InputForm
            label="Phone"
            id="phone"
            register={register}
            errors={errors}
            placeholder="Enter phone number"
          />
          <div className="form-item">
            <label>Role</label>
            <Select
              value={editUser?.role || ""}
              onChange={(value) => {
                setEditUser((prev) => ({ ...prev, role: value }));
                setValue("role", value);
              }}
              placeholder="Select a role"
            >
              {roles.map((role) => (
                <Select.Option key={role.code} value={role.code}>
                  {role.value}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="form-item">
            <label>Status</label>
            <Select
              value={editUser?.isBlocked || false}
              onChange={(value) => {
                setEditUser((prev) => ({ ...prev, isBlocked: value }));
                setValue("isBlocked", value);
              }}
              placeholder="Select status"
            >
              {blockStatus.map((status) => (
                <Select.Option key={status.code} value={status.code}>
                  {status.value}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="flex justify-end mt-4">
            <Button
              onClick={() => setIsModalVisible(false)}
              style={{ marginRight: 8 }}
            >
              Back
            </Button>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageUser;
