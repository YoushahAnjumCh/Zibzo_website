import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CartModel } from "../model/CartModel";
import { ProductsModel } from "../../homepage/model/ProductModel";
import ApiService from "../../../../constant/Environment";

export const fetchCartItems = createAsyncThunk<
  {
    cart: CartModel | null;
    products: ProductsModel[];
    cartProductCount: number;
  },
  { userID: string; token: string },
  { rejectValue: string }
>("fetchCart", async ({ userID, token }, { rejectWithValue }) => {
  const apiService = ApiService.getInstance();
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

    if (response.status === 404) {
      return {
        cart: null,
        products: [],
        cartProductCount: 0,
      };
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch cart items");
    }

    const data = await response.json();

    if (!data.cart) {
      throw new Error("Cart not found");
    }

    const cart = new CartModel(
      data.cart.userID,
      data.cart.productID,
      data.cart.__v
    );

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
    const cartProductCount = data.cartProductCount || 0;

    return { cart, products, cartProductCount };
  } catch (error: any) {
    console.error(error);
    return rejectWithValue(error.message);
  }
});

interface UserState {
  products: ProductsModel[];
  cart: CartModel | null;
  loading: boolean;
  cartProductCount: number;
  error: string | null;
}

const initialState: UserState = {
  products: [],
  cart: null,
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
            cart: CartModel | null;
            products: ProductsModel[];
            cartProductCount: number;
          }>
        ) => {
          state.loading = false;
          state.cart = action.payload.cart;
          state.products = action.payload.products;
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
