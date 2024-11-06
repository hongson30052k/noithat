import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosClient";

const initialState: any = {
  userProduct: [],
  loading: false,
  error: null,
};

export const fetchCreateProductId = createAsyncThunk(
  "userProductSlice/fetchCreateUserProduct",
  async (productId: any, { getState, rejectWithValue }) => {
    const state: any = getState();
    const idUser = state.userState.userRender;
    try {
      const res = await axiosInstance.get(`/users/${idUser.id}`);
      const user: any = res;
      console.log(user, "user");

      const updateReponsive = await axiosInstance.patch(`/users/${idUser.id}`, {
        product: [...user.product, productId],
      });
      console.log(updateReponsive, "updateReponsive");
      return updateReponsive;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const userProductSlice = createSlice({
  name: "userProductSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCreateProductId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCreateProductId.fulfilled, (state, action) => {
      state.loading = false;
      state.userProduct = action.payload;
    });
    builder.addCase(fetchCreateProductId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong!";
    });
  },
});

export default userProductSlice.reducer;
