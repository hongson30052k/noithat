import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosClient";

const initialState = {
  items: [],
};

export const fetchCreateOrder = createAsyncThunk(
  "CartOderSlice/fetchCreateOrder",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    console.log(data)
    try {
      const res = await axiosInstance.post("/orders", data);
      return res;
    } catch (error) {
      rejectWithValue("bạn order thất bạn rồi");
    }
  }
);

export const CartOderSlice = createSlice({
  name: "CartOderSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCreateOrder.pending, (state, action) => {}),
      builder.addCase(fetchCreateOrder.fulfilled, (state, action) => {}),
      builder.addCase(fetchCreateOrder.rejected, (state, action) => {});
  },
});

export const {} = CartOderSlice.actions;
export default CartOderSlice.reducer;
