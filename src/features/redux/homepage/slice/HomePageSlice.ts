// src/store/slices/userSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  HomeBannerModel,
  OfferDealModel,
  ProductsModel,
} from "../model/ProductModel";
import { off } from "process";
import { API_URL } from "../../../../constant/AppConstant";

// Async thunk for fetching products and home banners with error handling
export const fetchProductsAndBanners = createAsyncThunk<
  {
    products: ProductsModel[];
    homebanner: HomeBannerModel[];
    category: HomeBannerModel[];
    offerbanner: HomeBannerModel[];
    offerdeal: OfferDealModel[];
    cartProductCount: number;
  },
  { userID: string },
  { rejectValue: string }
>("users/fetchProducts", async ({ userID }, { rejectWithValue }) => {
  console.log("API new " + API_URL);
  try {
    const response = await fetch(
      `${API_URL}?userID=${encodeURIComponent(userID)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      // Map the data to your model classes
      const products = data.products.map(
        (product: any) =>
          new ProductsModel(
            product.title,
            product.subtitle,
            product.image,
            product._id,
            product.offerPrice,
            product.actualPrice,
            product.offerPercentage
          )
      );
      const cartProductCount = data.cartProductCount;
      console.log(products);
      const homebanner = data.homebanner.map(
        (banner: any) =>
          new HomeBannerModel(banner._id, banner.id, banner.image, banner.title)
      );

      const category = data.category.map(
        (banner: any) =>
          new HomeBannerModel(banner._id, banner.id, banner.image, banner.title)
      );

      const offerdeal = data.offerdeal.map(
        (offerdeal: any) =>
          new OfferDealModel(
            offerdeal._id,
            offerdeal.image,
            offerdeal.title,

            offerdeal.logo,
            offerdeal.offer
          )
      );

      const offerbanner = data.offerbanner.map(
        (banner: any) =>
          new HomeBannerModel(banner._id, banner.id, banner.image, banner.title)
      );
      console.log(`offer ${offerdeal[0].image}`);
      return {
        products,
        homebanner,
        category,
        offerdeal,
        offerbanner,
        cartProductCount,
      };
    } else {
      throw new Error(data.message);
    }
  } catch (error: any) {
    console.error(error);
    return rejectWithValue(error.message);
  }
});
interface UserState {
  products: ProductsModel[];
  homebanner: HomeBannerModel[];
  category: HomeBannerModel[];
  offerbanner: HomeBannerModel[];
  offerdeal: OfferDealModel[];
  cartProductCount: number;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  products: [],
  homebanner: [],
  category: [],
  offerbanner: [],
  offerdeal: [],
  cartProductCount: 0,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAndBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProductsAndBanners.fulfilled,
        (
          state,
          action: PayloadAction<{
            products: ProductsModel[];
            homebanner: HomeBannerModel[];
            category: HomeBannerModel[];
            offerbanner: HomeBannerModel[];
            offerdeal: OfferDealModel[];
            cartProductCount: number;
          }>
        ) => {
          state.loading = false;
          state.products = action.payload.products; // Store products
          state.homebanner = action.payload.homebanner; // Store home banners
          state.category = action.payload.category;
          state.offerdeal = action.payload.offerdeal;
          state.offerbanner = action.payload.offerbanner;
          state.cartProductCount = action.payload.cartProductCount;
        }
      )
      .addCase(
        fetchProductsAndBanners.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "An error occurred";
        }
      );
  },
});

export default userSlice.reducer;
