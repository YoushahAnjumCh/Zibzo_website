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
    if (response.status === 404) {
      const errorData = await response.json();
      return {
        cart: null,
        products: [],
        cartProductCount: 0,
        message: errorData.message || "Cart is Empty!",
      };
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch cart items");
    }

    const data = await response.json();

    if (!data.cart) {
      return data;
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
const deleteCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeProductFromState: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
      state.cartProductCount = Math.max(0, state.cartProductCount - 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteCartItems.pending, (state) => {})
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
          state.cart = action.payload.cart;
          state.products = action.payload.products;
          state.cartProductCount = action.payload.cartProductCount;
        }
      )
      .addCase(
        deleteCartItems.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "An error occurred";
        }
      );
  },
});

export const { removeProductFromState } = deleteCartSlice.actions;
export default deleteCartSlice.reducer;
