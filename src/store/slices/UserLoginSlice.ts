import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstanceUser } from "../../api/axiosClientUser";

const initialState = {
  users: [],
  idUserProduct: [],
};

export const fetchCreateUserLogin = createAsyncThunk(
  "UserLoginSlice/fetchCreateUserLogin",
  async (userData: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axiosInstanceUser.post("/user", userData);
      console.log(res);
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const fetchGetUserLogin = createAsyncThunk(
  "UserLoginSlice/fetchGetUserLogin",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const state: any = getState();
    const res1: any = await axiosInstanceUser.get("/user");
    const idUser = state.userState.idUser;
    console.log(idUser, "iduser");
    const resdata: any = res1.filter(
      (item: any) => Number(item.id) === Number(idUser)
    );

    console.log(resdata, "resdata");
    if (resdata.length === 0) {
      return rejectWithValue("Không tìm thấy người dùng");
    }
    return resdata;
  }
);

export const UserLoginSlice = createSlice({
  name: "UserLoginSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCreateUserLogin.pending, (state, action) => {});
    builder.addCase(
      fetchCreateUserLogin.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.users = action.payload;
      }
    );
    builder.addCase(fetchCreateUserLogin.rejected, (state, action) => {});

    builder.addCase(fetchGetUserLogin.pending, (state, action) => {});
    builder.addCase(
      fetchGetUserLogin.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.idUserProduct = action.payload;
        // localStorage.setItem("users", action.payload);
      }
    );
    builder.addCase(fetchGetUserLogin.rejected, (state, action) => {});
  },
});
export const {} = UserLoginSlice.actions;
export default UserLoginSlice.reducer;
