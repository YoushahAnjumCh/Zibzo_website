import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useState } from "react";
import Header from "../header/header";

type ProductInput = {
  ProductTitle: string;
  ProductImage: string;
};

export const UploadHomeBanner: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  let dispatch = useDispatch();
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductInput>({ mode: "onChange" });

  const onSubmit = async (data: ProductInput) => {
    if (!file) {
      console.error("Please upload an image file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.ProductTitle);
    formData.append("homebanner", file);
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/upload/homebanner/", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result && result._id) {
        console.log("Product uploaded successfully with _id:", result._id);
        navigate("/homepage", { replace: true });
      } else {
        console.error(
          "Failed to upload product. The result is empty or missing _id."
        );
      }
    } catch (error) {
      console.error("Error uploading product:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-xl mx-auto my-auto p-8 bg-white shadow-lg rounded-lg space-y-6"
        >
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Add New Home Carousel
          </h1>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="txtProductTitle"
                className="block text-sm font-medium text-gray-700"
              >
                Title:
              </label>
              <input
                type="text"
                id="txtProductTitle"
                placeholder="Max 20 chars"
                {...register("ProductTitle", {
                  required: true,
                  maxLength: {
                    value: 20,
                    message: "You exceeded 20 char limit!",
                  },
                })}
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
              {errors.ProductTitle && (
                <p className="text-sm text-red-500">
                  {errors.ProductTitle.type === "maxLength"
                    ? errors.ProductTitle.message
                    : "Title required!"}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="txtProductImage"
                className="block text-sm font-medium text-gray-700"
              >
                Image:
              </label>
              <input
                type="file"
                accept="homebanner/*"
                id="txtProductImage"
                {...register("ProductImage", {
                  required: true,
                  onChange: (e) => setFile(e.target.files[0] || null),
                })}
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {loading ? "Loading..." : "Add new HomeBanner"}
            <i className="fa fa-plus-circle ml-2" aria-hidden="true"></i>
          </button>
        </form>
      </div>
    </>
  );
};
