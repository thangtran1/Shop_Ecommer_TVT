import React, { useState, useCallback, useEffect } from "react";
import InputForm from "components/InputForm";
import { useForm } from "react-hook-form";
import { apiGetCategories } from "store/app/asyncActions";
import { useSelector } from "react-redux";
import { Select, Buttons, MarkdownEditer, Loading } from "components";
import { validate } from "ultils/helper";
import { Button } from "antd";
import { fileToBase64 } from "ultils/helper";
import { toast } from "react-toastify";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { apiCreateProduct } from "apis/product";
import { showModal } from "store/app/appReducer";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const [invalidFields, setInvalidFields] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    watch,
  } = useForm();
  const [payload, setPayload] = useState({
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hover, setHover] = useState(null);
  const [preview, setPreview] = useState({
    thumb: null,
    images: [],
  });
  const changeValue = useCallback((value) => {
    setPayload((prev) => ({ ...prev, description: value }));
  }, []);
  const { categories } = useSelector((state) => state.app);

  const handlePreviewThumb = async (file) => {
    const base64 = await fileToBase64(file);
    setPreview((prev) => ({ ...prev, thumb: base64 }));
  };
  const handlePreviewImages = async (files) => {
    console.log("files", files);
    const imagesPreview = [];
    for (let file of files) {
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        toast.warning("File không phải là ảnh");
        return;
      } else {
        const base64 = await fileToBase64(file);
        imagesPreview.push({ name: file.name, url: base64 });
      }
    }
    setPreview((prev) => ({ ...prev, images: imagesPreview }));
  };

  useEffect(() => {
    handlePreviewThumb(watch("thumb")[0]);
  }, [watch("thumb")]);

  useEffect(() => {
    handlePreviewImages(watch("images"));
  }, [watch("images")]);

  const handleCreateProduct = async () => {
    const data = getValues();
    console.log("Dữ liệu form:", data);
    const invalids = validate(data, setInvalidFields);
    if (invalids === 0) {
      if (data.category) {
        data.category = categories?.find(
          (item) => item._id === data.category
        )?.title;
        const finalData = { ...payload, ...data };
        console.log("Dữ liệu cuối cùng:", finalData);
        const formData = new FormData();
        for (let [key, value] of Object.entries(finalData)) {
          formData.append(key, value);
        }
        // Chỉnh sửa cách thêm thumb
        if (watch("thumb") && watch("thumb").length > 0) {
          formData.append("thumb", watch("thumb")[0]); // Chỉ thêm file đầu tiên
        }
        // Chỉnh sửa cách thêm images
        if (watch("images") && watch("images").length > 0) {
          for (let file of watch("images")) {
            formData.append("images", file); // Thêm từng file
          }
        }
        console.log("formData", formData);
        console.log("Dữ liệu gửi đến API:", formData);
        dispatch(showModal({ isLoading: true, modalChild: <Loading /> }));
        const response = await apiCreateProduct(formData);
        console.log("Phản hồi từ API:", response);
        dispatch(showModal({ isLoading: false, modalChild: null }));
        if (response.success) {
          toast.success(response.message);
          reset();
          setPreview({ thumb: "", images: [] });
        } else {
          toast.error(response.message);
        }
      }
    } else {
      console.log("Có trường không hợp lệ:", invalidFields);
    }
  };
  const handleDeleteImage = (url) => {
    const files = [...watch("images")];
    reset({
      images: files?.filter((item) => item.url !== url),
    });
    if (preview?.images?.some((item) => item.url === url)) {
      setPreview((prev) => ({
        ...prev,
        images: prev.images?.filter((item) => item.url !== url),
      }));
    }
  };
  return (
    <div className="w-full">
      <h1 className="h-[75px] flex items-center justify-between text-3xl font-bold px-4 border-b">
        <span className="text-[25px] font-bold">Create Product</span>
      </h1>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleCreateProduct)}>
          <div className="flex text-black flex-col gap-4">
            <InputForm
              label="Name Product"
              register={register}
              errors={errors}
              id="title"
              validate={{ required: "Name Product is required" }}
              fullWidth
              placeholder="Name of New Product"
            />
            {invalidFields > 0 && (
              <div className="text-red-500">
                Có {invalidFields} trường không hợp lệ. Vui lòng kiểm tra lại.
              </div>
            )}
            <div className="w-full my-6 flex gap-4">
              <InputForm
                label="Price"
                register={register}
                errors={errors}
                id="price"
                validate={{ required: "Price is required" }}
                placeholder="Price of New Product"
                type="number"
                style="flex-auto"
              />
              {invalidFields > 0 && (
                <div className="text-red-500">
                  Có {invalidFields} trường không hợp lệ. Vui lòng kiểm tra lại.
                </div>
              )}
              <InputForm
                label="Quantity"
                register={register}
                errors={errors}
                id="quantity"
                validate={{ required: "Quantity is required" }}
                placeholder="Quantity of New Product"
                type="number"
                style="flex-auto"
              />
              {invalidFields > 0 && (
                <div className="text-red-500">
                  Có {invalidFields} trường không hợp lệ. Vui lòng kiểm tra lại.
                </div>
              )}
              <InputForm
                label="Color"
                register={register}
                errors={errors}
                id="color"
                validate={{ required: "Color is required" }}
                placeholder="Color of New Product"
                style="flex-auto"
              />
            </div>
            <div className="w-full my-6 flex gap-4">
              <Select
                label="Category"
                options={categories?.map((item) => ({
                  code: item._id,
                  value: item.title,
                }))}
                register={register}
                id="category"
                validate={{ required: "Category is required" }}
                style="flex-auto"
                errors={errors}
                fullWidth
              />
              <Select
                label="Brand (Optional)"
                options={
                  watch("category")
                    ? categories
                        ?.find((item) => item._id === watch("category"))
                        ?.brand?.map((item) => ({
                          code: item,
                          value: item,
                        })) || []
                    : [{ code: "", value: "Vui lòng chọn danh mục trước" }]
                }
                register={register}
                id="brand"
                validate={{
                  required: watch("category")
                    ? "Brand is required"
                    : "Vui lòng chọn danh mục trước",
                }}
                style="flex-auto"
                errors={errors}
                fullWidth
              />
            </div>
            <MarkdownEditer
              value={payload.description}
              name="description"
              changeValue={changeValue}
              label="Description"
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
              errors={errors}
            />

            <div className="flex flex-col gap-2 mt-8">
              <label className="font-semibold" htmlFor="thumb">
                Upload Thumbnail
              </label>
              <input
                type="file"
                id="thumb"
                {...register("thumb", { required: "Thumbnail is required" })}
              />
              {errors.thumb && (
                <small className="text-main text-sm">
                  {errors.thumb.message}
                </small>
              )}
            </div>
            {preview.thumb && (
              <div className="my-4">
                <img
                  src={preview.thumb}
                  alt="Thumbnail"
                  className="w-[200px] object-contain"
                />
              </div>
            )}
            <div className="flex flex-col gap-2 mt-8">
              <label className="font-semibold" htmlFor="images">
                Upload Image of Product
              </label>
              <input
                type="file"
                id="images"
                multiple
                {...register("images", { required: "Image is required" })}
              />
              {errors.images && (
                <small className="text-main text-sm">
                  {errors.images.message}
                </small>
              )}
            </div>
            {preview?.images?.length > 0 && (
              <div div className="my-4 flex w-full gap-4 flex-wrap">
                {preview?.images?.map((item, index) => (
                  <div
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(null)}
                    className="w-fit relative bg-gray-200"
                    key={index}
                  >
                    <img
                      src={item.url}
                      alt="product-image"
                      className="w-[200px] object-contain"
                    />
                    {/* {hover === index && (
                      <div
                        onClick={() => handleDeleteImage(item.url)}
                        className="cursor-pointer animate-scale-up-center bg-overlay absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-md"
                      >
                        <RiDeleteBin6Line size={24} color="white" />
                      </div>
                    )} */}
                  </div>
                ))}
              </div>
            )}
            <div className=" my-6">
              <Button
                type="button"
                onClick={handleSubmit(handleCreateProduct)}
                className="w-full"
              >
                Create New Product
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
