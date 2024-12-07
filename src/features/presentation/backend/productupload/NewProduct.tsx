import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import { AppState } from "../../../redux/store";
import Header from "../header/header";

type ProductInput = {
  ProductTitle: string;
  ProductSubTitle: string;
  ProductCategory: string;
  ProductOfferPrice: number;
  ProductOfferPercentage: number;
  ProductActualPrice: number;
  ProductImage: string;
  ProductDescription: string;
};

export const NewProduct: React.FC = () => {
  let products = useSelector((store: AppState) => store.products);
  let auth = useSelector((store: AppState) => store.auth);

  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  let dispatch = useDispatch();
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductInput>({ mode: "onChange" });

  const onSubmit = async (data: ProductInput) => {
    console.log(files);
    if (files.length === 0) {
      console.error("Please upload at least one image file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.ProductTitle);
    formData.append("subtitle", data.ProductSubTitle);
    formData.append("category", data.ProductCategory);
    formData.append("offerPrice", String(data.ProductOfferPrice));
    formData.append("offerPercentage", String(data.ProductOfferPercentage));
    formData.append("actualPrice", String(data.ProductActualPrice));
    // Append each image to the form data
    files.forEach((file) => {
      formData.append("ProductImage", file); // Make sure the name here matches upload.array("ProductImage", 10) on the server
    });
    setLoading(true);
    try {
      console.log(formData);
      const response = await fetch("http://localhost:4000/upload/", {
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
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log(e.target.files);
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <>
      <Header />
      <div>
        <div className="flex py-7 justify-content-center align-items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-xl mx-auto p-8 bg-white shadow-lg rounded-lg space-y-6"
          >
            <h1 className="text-2xl font-bold text-gray-800 text-center">
              Add New Product
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
                  placeholder="Max 30 chars"
                  {...register("ProductTitle", {
                    required: true,
                    maxLength: 30,
                  })}
                  className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
                {errors.ProductTitle && (
                  <p style={{ color: "red" }}>
                    {" "}
                    {errors.ProductTitle.type === "maxLength"
                      ? errors.ProductTitle.message
                      : "Title required !"}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="txtProductSubTitle"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subtitle:
                </label>
                <input
                  type="text"
                  id="txtProductSubTitle"
                  {...register("ProductSubTitle", { required: true })}
                  className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
                {errors.ProductSubTitle && (
                  <p className="text-sm text-red-500">Subtitle required!</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="txtProductCategory"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category:
                </label>
                <input
                  type="text"
                  id="txtProductCategory"
                  {...register("ProductCategory", { required: true })}
                  className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
                {errors.ProductCategory && (
                  <p className="text-sm text-red-500">Category required!</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="txtProductOfferPrice"
                  className="block text-sm font-medium text-gray-700"
                >
                  Offer Price:
                </label>
                <input
                  type="number"
                  id="txtProductOfferPrice"
                  {...register("ProductOfferPrice", { required: true })}
                  className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              <div>
                <label
                  htmlFor="txtProductOfferPercentage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Offer Percentage:
                </label>
                <input
                  type="number"
                  id="txtProductOfferPercentage"
                  {...register("ProductOfferPercentage", { required: true })}
                  className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              <div>
                <label
                  htmlFor="txtProductActualPrice"
                  className="block text-sm font-medium text-gray-700"
                >
                  Actual Price:
                </label>
                <input
                  type="number"
                  id="txtProductActualPrice"
                  {...register("ProductActualPrice", { required: true })}
                  className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              <div>
                <label
                  htmlFor="txtProductImage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Choose Multiple Product Images:
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  id="txtProductImage"
                  {...register("ProductImage", { onChange: handleFileChange })}
                  className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {loading ? "Loading..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
