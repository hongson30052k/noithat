import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosClient";

const initialState: any = {
  userProduct: [],
  userProducts: [],
  loading: false,
  error: null,
  quantity: "",
  action: "nul",
};

export const fetchCreateProductId = createAsyncThunk(
  "userProductSlice/fetchCreateUserProduct",
  async (productId: any, { getState, rejectWithValue }) => {
    const state: any = getState();
    const idUser = state.userState.userRender;
    const idForUser: any = await axiosInstance.get(`/cart`);
    const exist = idForUser.find(
      (item: any) => item.productId === productId && item.userId === idUser.id
    );
    if (exist) {
      console.log("sản phẩm đã tồn tại trong giỏ hàng");
      return rejectWithValue("Sản phẩm đã tồn tại trong giỏ hàng");
    } else {
      const data = {
        id: Number(Math.random() * 1000),
        userId: idUser.id,
        quantity: 1,
        productId: productId,
      };
      console.log(data, "data");
      const response = await axiosInstance.post(`cart`, data);
      return response;
    }
  }
);

export const fetchGetUserProduct = createAsyncThunk(
  "userProductSlice/fetchGetUserProduct",
  async (idUser: any, { rejectWithValue }) => {
    try {
      const res: any = await axiosInstance.get(
        `/cart?_expand=product&userId=${idUser}`
      );

      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const fetchIncrease = createAsyncThunk(
  "userProductSlice/fetchIncrease",
  async (id: any, { rejectWithValue, getState }) => {
    const state: any = getState();
    const idUser = state.userState.userRender;
    console.log(id, "id");
    try {
      const idForUser: any = await axiosInstance.get(`/cart`);
      const exist = idForUser.find((item: any) => item.id === id);
      const data = { ...exist.quantity, quantity: exist.quantity + 1 };
      const response: any = await axiosInstance.patch(
        `/cart/${exist.id}`,
        data
      );
      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const fetchDecrease = createAsyncThunk(
  "userProductSlice/fetchDecrease",
  async (id: any, { rejectWithValue, getState }) => {
    const state: any = getState();
    const idUser = state.userState.userRender;
    console.log(id, "id");
    try {
      const idForUser: any = await axiosInstance.get(`/cart`);
      const exist = idForUser.find((item: any) => item.id === id);
      const data = { ...exist.quantity, quantity: exist.quantity - 1 };
      if (exist.quantity === 1) {
        return;
      }
      const response: any = await axiosInstance.patch(
        `/cart/${exist.id}`,
        data
      );
      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const fetchDeleteProduct = createAsyncThunk(
  "userProductSlice/fetchDeleteproduct",
  async (id: any, { rejectWithValue }) => {
    console.log(id, "id");
    try {
      const idForUser: any = await axiosInstance.get(`/cart`);
      const exist = idForUser.find((item: any) => item.id === id);
      const response: any = await axiosInstance.delete(`/cart/${exist.id}`);
      return id;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const fetchDeleteUserProduct = createAsyncThunk(
  "userProductSlice/fetchDeleteUserProduct",
  async (idUser: any, { rejectWithValue }) => {
    try {
      const res: any = await axiosInstance.get(`/cart?userId=${idUser}`);
      const data = res.filter((item: any) => item.userId === idUser);
      data.map((item: any) => axiosInstance.delete(`/cart/${item.id}`));
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const userProductSlice = createSlice({
  name: "userProductSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCreateProductId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCreateProductId.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(fetchCreateProductId.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(fetchGetUserProduct.pending, (state) => {});
    builder.addCase(fetchGetUserProduct.fulfilled, (state, action) => {
      state.userProducts = action.payload;
    });

    builder.addCase(fetchGetUserProduct.rejected, (state, action) => {});

    builder.addCase(fetchDeleteUserProduct.pending, (state) => {});

    builder.addCase(fetchDeleteUserProduct.fulfilled, (state, action) => {
      state.userProducts = action.payload;
    });

    builder.addCase(fetchDeleteUserProduct.rejected, (state, action) => {});

    builder.addCase(fetchIncrease.pending, (state) => {});

    builder.addCase(fetchIncrease.fulfilled, (state, action) => {
      state.action = action.payload;
    });
    builder.addCase(fetchIncrease.rejected, (state, action) => {});
    builder.addCase(fetchDecrease.pending, (state) => {});
    builder.addCase(fetchDecrease.fulfilled, (state, action) => {
      state.action = action.payload;
    });
    builder.addCase(fetchDecrease.rejected, (state, action) => {});

    builder.addCase(fetchDeleteProduct.pending, (state) => {});
    builder.addCase(fetchDeleteProduct.fulfilled, (state, action) => {
      state.action = action.payload;
    });
    builder.addCase(fetchDeleteProduct.rejected, (state, action) => {});
  },
});

export default userProductSlice.reducer;
