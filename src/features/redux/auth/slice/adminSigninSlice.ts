import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AuthModel } from "../model/auth.model";
import { AuthService } from "../service/AuthService";

// Async thunk for authentication
export const adminAuthSignIn = createAsyncThunk<
  AuthModel,
  { email: string; password: string },
  { rejectValue: string }
>("auth/adminLogin", async ({ email, password }, { rejectWithValue }) => {
  try {
    return await AuthService.adminlogin(email, password);
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
const adminAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminAuthSignIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        adminAuthSignIn.fulfilled,
        (state, action: PayloadAction<AuthModel>) => {
          state.loading = false;
          state.user = action.payload;
          state.isUserAuthenticated = true;
          localStorage.setItem("isUserAuthenticated", JSON.stringify(true));
        }
      )
      .addCase(
        adminAuthSignIn.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "An error occurred";
        }
      );
  },
});

export default adminAuthSlice.reducer;
