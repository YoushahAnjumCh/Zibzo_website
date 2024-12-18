import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CartModel } from "../model/CartModel";
import { ProductsModel } from "../../homepage/model/ProductModel";
import ApiService from "../../../../constant/Environment";

export const fetchCartItems = createAsyncThunk<
  {
    cart: CartModel;
    products: ProductsModel[];
    cartProductCount: number;
  },
  { userID: string; token: string },
  { rejectValue: string }
>("fetchCart", async ({ userID, token }, { rejectWithValue }) => {
  const apiService = ApiService.getInstance();

  // Example usage in an API call
  const API_URL = apiService.getApiUrl();
  try {
    const response = await fetch(
      `${API_URL}/cart/?userID=${encodeURIComponent(userID)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch cart items");
    }

    const data = await response.json();
    // Handle case where data.cart or data.products is missing
    if (!data.cart) {
      throw new Error("Cart not found");
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

const fetchCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCartItems.fulfilled,
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
        fetchCartItems.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "An error occurred";
        }
      );
  },
});

export default fetchCartSlice.reducer;
