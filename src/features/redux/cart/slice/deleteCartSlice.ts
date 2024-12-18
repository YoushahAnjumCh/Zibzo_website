import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CartModel } from "../model/CartModel";
import { ProductsModel } from "../../homepage/model/ProductModel";
import ApiService from "../../../../constant/Environment";

export const deleteCartItems = createAsyncThunk<
  {
    cart: CartModel;
    products: ProductsModel[];
    cartProductCount: number;
  },
  { userID: string; productID: string; token: string },
  { rejectValue: string }
>("fetchCart", async ({ userID, productID, token }, { rejectWithValue }) => {
  const apiService = ApiService.getInstance();

  // Example usage in an API call
  const API_URL = apiService.getApiUrl();
  try {
    const response = await fetch(
      `${API_URL}/cart`,

      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userID: userID,
          productID: productID,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch cart items");
    }

    const data = await response.json();

    if (!data.cart) {
      return data;
    }
    // Map cart data to CartModel
    const cart = new CartModel(
      data.cart.userID,
      data.cart.productID,
      data.cart.__v
    );

    // Map products data to ProductsModel
    const products = Array.isArray(data.products)
      ? data.products.map(
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
        )
      : [];
    const cartProductCount = data.cartProductCount || 0; // Default to 0 if not provided

    return { cart, products, cartProductCount };
  } catch (error: any) {
    console.error(error);
    return rejectWithValue(error.message);
  }
});

interface UserState {
  products: ProductsModel[];
  cart: CartModel | null; // Adjusted type for initial state
  loading: boolean;
  cartProductCount: number;
  error: string | null;
}

const initialState: UserState = {
  products: [],
  cart: null, // Correctly initialize as `null`
  loading: false,
  cartProductCount: 0,
  error: null,
};

const deleteCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteCartItems.fulfilled,
        (
          state,
          action: PayloadAction<{
            cart: CartModel;
            products: ProductsModel[];
            cartProductCount: number;
          }>
        ) => {
          state.loading = false;
          state.cart = action.payload.cart; // Store cart
          state.products = action.payload.products; // Store products
          state.cartProductCount = action.payload.cartProductCount;
        }
      )
      .addCase(
        deleteCartItems.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "An error occurred";
        }
      );
  },
});

export default deleteCartSlice.reducer;
