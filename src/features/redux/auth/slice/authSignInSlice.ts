import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AuthModel } from "../model/auth.model";
import { AuthService } from "../service/AuthService";

// Async thunk for authentication
export const authSignIn = createAsyncThunk<
  AuthModel,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    return await AuthService.login(email, password);
  } catch (error: any) {
    return rejectWithValue(error.message || "An error occurred during login");
  }
});

// Define the authentication state interface
interface AuthState {
  isUserAuthenticated: boolean;
  user: AuthModel | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  isUserAuthenticated: JSON.parse(
    localStorage.getItem("isUserAuthenticated") || "false"
  ),

  user: null,
  loading: false,
  error: null,
};

// Slice definition
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authSignIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        authSignIn.fulfilled,
        (state, action: PayloadAction<AuthModel>) => {
          state.loading = false;
          state.user = action.payload;
          state.isUserAuthenticated = true;
          localStorage.setItem("isUserAuthenticated", JSON.stringify(true));
        }
      )
      .addCase(
        authSignIn.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "An error occurred";
        }
      );
  },
});

export default authSlice.reducer;

// let initialState: AuthModel = {
//   isUserAuthenticated: false,
//   token: "",
// };
// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUserAuthenticated: (store, action: PayloadAction<AuthModel>) => {
//       store.isUserAuthenticated = action.payload.isUserAuthenticated;
//       store.token = action.payload.token;
//       return store;
//     },
//   },
// });

// export const { setUserAuthenticated } = authSlice.actions;
// export default authSlice.reducer;
