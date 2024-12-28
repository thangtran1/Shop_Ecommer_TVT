import React, { useEffect, useState } from "react";
import { Table, Input, Pagination, Modal, Button } from "antd";
import { apiGetProducts } from "apis/product";
import moment from "moment";
import { redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { InputForm, Loading } from "components";
import { apiDeleteProduct, apiUpdateProduct } from "apis/product";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { showModal } from "store/app/appReducer";
import { Varrients } from "components";
const ManageProduct = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const [products, setProducts] = useState([]);
  const [totalCounts, setTotalCounts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [customizeVarrient, setCustomizeVarrient] = useState(false);
  const fetchProducts = async (params = {}) => {
    const response = await apiGetProducts({
      ...params,
      page: currentPage,
      limit: 5,
    });
    if (response.success) {
      setProducts(response.products);
      setTotalCounts(response.counts);
    } else {
      setProducts([]);
      setTotalCounts(0);
    }
  };

  useEffect(() => {
    const queries = {
      q: searchQuery || undefined,
      page: currentPage,
      limit: 5,
    };
    fetchProducts(queries);
  }, [searchQuery, currentPage]);

  useEffect(() => {
    const searchParams = {
      q: searchQuery || null,
    };
    fetchProducts(searchParams);
  }, [searchQuery, currentPage]);

  const handleEditProduct = (product) => {
    setEditProduct(product);
    reset({
      thumb: product.thumb,
      title: product.title,
      brand: product.brand,
      price: product.price,
      quantity: product.quantity,
      sold: product.sold,
      color: product.color,
      category: product.category,
      ratings: product.ratings[0]?.star || "",
    });
    setIsModalVisible(true);
  };

  const handleDeleteProduct = async (pid) => {
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
        const response = await apiDeleteProduct(pid);
        if (response.success) {
          fetchProducts();
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      }
    });
  };
  const handleUpdateProduct = async (data) => {
    const errors = {};
    if (!data.thumb || data.thumb.trim() === "") {
      errors.thumb = "Thumb is required.";
    }
    if (!data.title || data.title.trim() === "") {
      errors.title = "Title is required.";
    }
    if (!data.brand || data.brand.trim() === "") {
      errors.brand = "Brand is required.";
    }
    if (!data.category || data.category.trim() === "") {
      errors.category = "Category is required."; // Kiểm tra trường category
    }
    if (
      !data.price ||
      (typeof data.price !== "string" && typeof data.price !== "number") ||
      String(data.price).trim() === ""
    ) {
      errors.price = "Price is required.";
    }
    if (
      !data.quantity ||
      (typeof data.quantity !== "string" &&
        typeof data.quantity !== "number") ||
      String(data.quantity).trim() === ""
    ) {
      errors.quantity = "Quantity is required.";
    }
    if (
      !data.sold ||
      (typeof data.sold !== "string" && typeof data.sold !== "number") ||
      String(data.sold).trim() === ""
    ) {
      errors.sold = "Sold is required.";
    }
    if (!data.color || data.color.trim() === "") {
      errors.color = "Color is required.";
    }
    if (!data.ratings || data.ratings.trim() === "") {
      errors.ratings = "Ratings is required."; // Kiểm tra trường ratings
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    dispatch(showModal({ isOpen: true, component: <Loading /> }));
    const response = await apiUpdateProduct(
      { ...editProduct, ...data },
      editProduct._id
    );
    dispatch(showModal({ isOpen: false, component: null }));

    if (response.success) {
      fetchProducts();
      const message = response.message || "Cập nhật thành công!";
      toast.success(message);
      setIsModalVisible(false);
    } else {
      setFormErrors({ api: response.message || "Cập nhật thất bại!" });
    }
  };
  const columns = [
    {
      title: "#",
      render: (text, record, index) => index + 1 + (currentPage - 1) * 5,
    },
    {
      title: "Thumb",
      dataIndex: "thumb",
      render: (text, record) => (
        <img src={record.thumb} alt={record.title} className="w-[100px]" />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Sold",
      dataIndex: "sold",
    },
    {
      title: "Color",
      dataIndex: "color",
    },
    {
      title: "Ratings",
      render: (text, record) => {
        if (record.ratings && record.ratings.length > 0) {
          return record.ratings[0].star;
        }
        return 0;
      },
    },
    {
      title: "Updated At",
      render: (text, record) => moment(record.updatedAt).format("DD/MM/YYYY"),
    },
    {
      title: "Action",
      render: (text, record) => (
        <>
          <span
            onClick={() => handleEditProduct(record)}
            className="cursor-pointer text-orange-500 hover:underline"
          >
            edit
          </span>
          <span
            onClick={() => handleDeleteProduct(record._id)}
            className="cursor-pointer text-red-500 hover:underline"
            style={{ marginLeft: 8 }}
          >
            delete
          </span>
          <span
            onClick={() => setCustomizeVarrient(record)} // Pass the selected record to setCustomizeVarrient
            className="cursor-pointer text-red-500 hover:underline"
            style={{ marginLeft: 8 }}
          >
            Varient
          </span>
        </>
      ),
    },
  ];

  return (
    <div className="w-full">
      <h1 className="h-[75px] flex items-center justify-between text-3xl font-bold px-4 border-b">
        <span className="text-[25px] font-bold">Manage Product</span>
      </h1>
      <div className="w-full p-4">
        <div className="flex justify-end py-4">
          <Input
            placeholder="Search by title, brand, etc..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật trạng thái tìm kiếm
            style={{ width: 300, marginRight: 8 }}
            className="search-input"
          />
        </div>
        {products.length > 0 ? (
          <Table
            columns={columns}
            dataSource={products}
            pagination={false}
            rowKey="_id"
          />
        ) : (
          <div className="text-center">No data</div>
        )}
        <Pagination
          current={currentPage}
          pageSize={5}
          total={totalCounts}
          onChange={(page) => setCurrentPage(page)}
          style={{ marginTop: 16, textAlign: "right" }}
        />
      </div>
      {customizeVarrient && (
        <Varrients
          customizeVarrient={customizeVarrient} // Use the selected variant data
          render={redirect}
          setCustomizeVarrient={setCustomizeVarrient}
        />
      )}

      <Modal
        title="Edit Product"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <form onSubmit={handleSubmit(handleUpdateProduct)}>
          <InputForm
            label="Thumb"
            id="thumb"
            register={register}
            errors={errors}
            placeholder="Enter product thumb"
          />
          {formErrors.thumb && (
            <div className="text-red-500">{formErrors.thumb}</div>
          )}
          <InputForm
            label="Title"
            id="title"
            register={register}
            errors={errors}
            placeholder="Enter product title"
          />
          {formErrors.title && (
            <div className="text-red-500">{formErrors.title}</div>
          )}
          <InputForm
            label="Brand"
            id="brand"
            register={register}
            errors={errors}
            placeholder="Enter product brand"
          />
          {formErrors.brand && (
            <div className="text-red-500">{formErrors.brand}</div>
          )}
          <InputForm
            label="Category"
            id="category"
            register={register}
            errors={errors}
            placeholder="Enter product category"
          />
          {formErrors.category && (
            <div className="text-red-500">{formErrors.category}</div>
          )}
          <InputForm
            label="Price"
            id="price"
            register={register}
            errors={errors}
            placeholder="Enter product price"
          />
          {formErrors.price && (
            <div className="text-red-500">{formErrors.price}</div>
          )}
          <InputForm
            label="Quantity"
            id="quantity"
            register={register}
            errors={errors}
            placeholder="Enter product quantity"
          />
          {formErrors.quantity && (
            <div className="text-red-500">{formErrors.quantity}</div>
          )}
          <InputForm
            label="Sold"
            id="sold"
            register={register}
            errors={errors}
            placeholder="Enter product sold"
          />
          {formErrors.sold && (
            <div className="text-red-500">{formErrors.sold}</div>
          )}
          <InputForm
            label="Color"
            id="color"
            register={register}
            errors={errors}
            placeholder="Enter product color"
          />
          {formErrors.color && (
            <div className="text-red-500">{formErrors.color}</div>
          )}
          <InputForm
            label="Ratings"
            id="ratings"
            register={register}
            errors={errors}
            placeholder="Enter product ratings"
          />
          {formErrors.ratings && (
            <div className="text-red-500">{formErrors.ratings}</div>
          )}
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
      {customizeVarrient && <Varrients />}
    </div>
  );
};

export default ManageProduct;
