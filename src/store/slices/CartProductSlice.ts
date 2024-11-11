import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosClient";
import { axiosInstanceUser } from "../../api/axiosClientUser";

interface IInitialState {
  card: any[];
  productId: string;
  cardId: any[];
  cartImg: any[];
  cardImg: any[];
  status: boolean;
}

const initialState: IInitialState = {
  card: [],
  productId: "",
  cardId: [],
  cartImg: [],
  cardImg: [],
  status: false,
};
export const fetchCartProductAPI = createAsyncThunk(
  "cartProductSlice/fetchCartProductAPI",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axiosInstance.get("http://localhost:5000/products", {
        baseURL: "/",
      });
      console.log(res, "resproduct");
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const fetchGetImgProduct = createAsyncThunk(
  "userProductSlice/fetchGetImgProduct",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res: any = await axiosInstance.get("/imgProduct");
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const fetchGetImgProductId = createAsyncThunk(
  "userProductSlice/fetchGetImgProductId",
  async (id: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res: any = await axiosInstance.get(`/imgProduct/${id}`);
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const fetchAddImgProduct = createAsyncThunk(
  "userProductSlice/fetchAddImgProduct",
  async (data: any, { rejectWithValue }) => {
    try {
      const response: any = await axiosInstance.post(`/imgProduct`, data);
      return response;
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
  async (id: any, thunkAPI) => {
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
export const fetchDeleteImgCart = createAsyncThunk(
  "cartProductSlice/fetchDeleteImgCart",
  async (id: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axiosInstance.delete(`/imgProduct/${id}`);
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

    builder.addCase(fetchGetImgProduct.pending, (state, action) => {});
    builder.addCase(
      fetchGetImgProduct.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.cartImg = action.payload;
      }
    );

    builder.addCase(fetchGetImgProduct.rejected, (state, action) => {});
    builder.addCase(fetchAddImgProduct.pending, (state, action) => {});
    builder.addCase(
      fetchAddImgProduct.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.status = !state.status;
      }
    );
    builder.addCase(fetchAddImgProduct.rejected, (state, action) => {});
    builder.addCase(fetchGetImgProductId.pending, (state, action) => {});
    builder.addCase(
      fetchGetImgProductId.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.cardImg = action.payload;
      }
    );
    builder.addCase(fetchGetImgProductId.rejected, (state, action) => {});
  },
});

export const { getProductId } = cartProductSlice.actions;
export default cartProductSlice.reducer;
