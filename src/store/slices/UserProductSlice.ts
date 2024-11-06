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
    console.log(productId, "productIdfecth");
    const state: any = getState();
    const idUser = state.userState.userRender;
    const data = productId.map((item: any) => {
      return {
        ...productId,
        userId: idUser,
      };
    });
    try {
      const response = await axiosInstance.post(
        `cart`,
        data,
      )
      return response
    } catch (error: any) {
      console.log("lỗi rồi nha!");
    }
  }
);

export const fetchGetUserProduct = createAsyncThunk(
  "userProductSlice/fetchGetUserProduct",
  async (idUser: any, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/cart?userId=${idUser}`);
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
)


export const userProductSlice = createSlice({
  name: "userProductSlice",
  initialState: initialState,
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
    builder.addCase(fetchGetUserProduct.pending, (state) => {
    })
    builder.addCase(fetchGetUserProduct.fulfilled, (state, action) => {
      const data = [userProductSlice, action.payload];
      console.log(data, "data")
      state.userProduct = data
    })
    builder.addCase(fetchGetUserProduct.rejected, (state, action) => {
    })
  },
});

export default userProductSlice.reducer;
