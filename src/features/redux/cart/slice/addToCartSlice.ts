import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ProductsModel } from "../../homepage/model/ProductModel";
import { CartModel } from "../model/CartModel";
import ApiService from "../../../../constant/Environment";

export const addToCartDB = createAsyncThunk<
  {
    cart: CartModel;
  },
  { userID: string; productID: string; token: string },
  { rejectValue: string }
>("fetchCart", async ({ userID, productID, token }, { rejectWithValue }) => {
  const apiService = ApiService.getInstance();

  const API_URL = apiService.getApiUrl();
  try {
    const response = await fetch(`${API_URL}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userID: userID,
        productID: productID,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch cart items");
    }

    const data = await response.json();

    const cart = new CartModel(
      data._id,
      data.userID,
      data.productID,
      data.cartProductCount
    );

    return { cart };
  } catch (error: any) {
    console.error(error);
    return rejectWithValue(error.message);
  }
});

interface CartState {
  cart: CartModel | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

const addToCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartDB.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addToCartDB.fulfilled,
        (
          state,
          action: PayloadAction<{
            cart: CartModel;
          }>
        ) => {
          state.loading = false;
          state.cart = action.payload.cart;
        }
      )
      .addCase(
        addToCartDB.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "An error occurred";
        }
      );
  },
});

export default addToCartSlice.reducer;
