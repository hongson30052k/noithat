import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosClient";

interface IInitialState {
  card: any[];
  productId: string;
  cardId: any[];
}

const initialState: IInitialState = {
  card: [],
  productId: "",
  cardId: [],
};
export const fetchCartProductAPI = createAsyncThunk(
  "cartProductSlice/fetchCartProductAPI",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axiosInstance.get("http://localhost:5000/products", {
        baseURL: "/",
      });

      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const fetchProductApi = createAsyncThunk(
  "cartProductSlice/fetchProductApi",
  async (id: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axiosInstance.get(
        `http://localhost:5000/products/${id}`,
        {
          baseURL: "/",
        }
      );
      console.log(res, "res");
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const fetchAddToCart = createAsyncThunk(
  "cartProductSlice/fetchAddToCart",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axiosInstance.post(`/products`, data);
      console.log(res, "resproduct");
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const fetchDeleteCart = createAsyncThunk(
  "cartProductSlice/fetchDeleteCart",
  async (id: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axiosInstance.delete(`/products/${id}`);
      console.log(res, "resproduct");
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const cartProductSlice = createSlice({
  name: "cartProductSlice",
  initialState: initialState,
  reducers: {
    getProductId: (state = initialState, action: PayloadAction<any>) => {
      state.productId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartProductAPI.pending, (state, action) => {});
    builder.addCase(
      fetchCartProductAPI.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.card = action.payload;
      }
    );
    builder.addCase(fetchCartProductAPI.rejected, (state, action) => {
      console.log(action);
    });

    builder.addCase(fetchProductApi.pending, (state, action) => {});
    builder.addCase(
      fetchProductApi.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.cardId = action.payload;
      }
    );
    builder.addCase(fetchProductApi.rejected, (state, action) => {
      console.log(action);
    });

    builder.addCase(fetchAddToCart.pending, (state, action) => {});
    builder.addCase(
      fetchAddToCart.fulfilled,
      (state, action: PayloadAction<any>) => {}
    );
    builder.addCase(fetchAddToCart.rejected, (state, action) => {
      console.log(action);
    });

    builder.addCase(fetchDeleteCart.pending, (state, action) => {});
    builder.addCase(
      fetchDeleteCart.fulfilled,
      (state, action: PayloadAction<any>) => {}
    );
    builder.addCase(fetchDeleteCart.rejected, (state, action) => {});
  },
});

export const { getProductId } = cartProductSlice.actions;
export default cartProductSlice.reducer;
