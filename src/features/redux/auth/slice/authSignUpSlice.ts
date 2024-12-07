import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthService } from "../service/AuthService";
import { AuthModel } from "../model/auth.model";

// Async thunk for authentication
export const authSignUp = createAsyncThunk<
  string,
  {
    email: string;
    password: string;
    userName: string;
    userImage: File | null;
  },
  { rejectValue: string }
>(
  "auth/signup",
  async ({ email, password, userName, userImage }, { rejectWithValue }) => {
    try {
      return await AuthService.signup(
        email,
        password,

        userName,
        userImage
      );
    } catch (error: any) {
      return rejectWithValue(error.message || "An error occurred during login");
    }
  }
);

// Define the authentication state interface
interface AuthState {
  user: string | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// Slice definition
const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authSignUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authSignUp.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(
        authSignUp.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "An error occurred";
        }
      );
  },
});

export default signupSlice.reducer;
