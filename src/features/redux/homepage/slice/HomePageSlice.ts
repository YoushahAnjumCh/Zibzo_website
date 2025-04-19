import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import {
  HomeBannerModel,
  OfferDealModel,
  ProductsModel,
} from "../model/ProductModel";
import ApiService from "../../../../constant/Environment";

export const fetchProductsAndBanners = createAsyncThunk<
  {
    products: ProductsModel[];
    homebanner: HomeBannerModel[];
    category: HomeBannerModel[];
    offerbanner: HomeBannerModel[];
    offerdeal: OfferDealModel[];
    cartProductCount: number;
  },
  { userID: string; token: string },
  { rejectValue: string }
>("users/fetchProducts", async ({ userID, token }, { rejectWithValue }) => {
  const apiService = ApiService.getInstance();

  try {
    const response = await fetch(
      `${apiService.getFullUrl("products")}?userID=${userID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    if (response.ok) {
      const products = data.products.map(
        (product: any) =>
          new ProductsModel(
            product.productName,
            product.brand,
            product.image,
            product._id,
            product.offerPrice,
            product.actualPrice,
            product.discount
          )
      );
      const cartProductCount = data.cartProductCount;
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
          state.products = action.payload.products;
          state.homebanner = action.payload.homebanner;
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
