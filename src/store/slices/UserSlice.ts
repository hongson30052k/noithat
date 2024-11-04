import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosClient";

const initialState = {
  users: [],
  status: "idle",
  error: null,
  isAuthenticated: false,
  isAdmin: false,
  idUser: "",
  userRender: [],
};

export const fetchCreateUser = createAsyncThunk(
  "userSlice/fetchCreateUser",
  async (userData: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axiosInstance.post("/users", userData);
      console.log(res);
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const fetchGetUser = createAsyncThunk(
  "userSlice/fetchGetUser",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axiosInstance.get("/users");
      console.log(res);
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "userSlice/loginUser",
  async ({ username, password, id }: any, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const state: any = getState();
    const users = state.userState.user;
    const user = users.find(
      (user: any) => user.username === username && user.password === password
    );
    if (!user) {
      return rejectWithValue("tên đăng nhập hoặc mật khẩu không đúng");
    }
    console.log(user, "user");
    return user;
  }
);

export const UserSlice = createSlice({
  name: "UserSlice",
  initialState: initialState,
  reducers: {
    getUser: (state = initialState, action: PayloadAction<any>) => {
      state.users = action.payload;
    },
    getIdUser: (state = initialState, action: PayloadAction<any>) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCreateUser.pending, (state, action) => {});
    builder.addCase(
      fetchCreateUser.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        const value = { ...action.payload, isAdmin: true };
        state.users = value;
        state.status = "success";
      }
    );
    builder.addCase(fetchCreateUser.rejected, (state, action) => {});

    builder.addCase(fetchGetUser.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(
      fetchGetUser.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.status = "success";
        state.user = action.payload;
      }
    );
    builder.addCase(fetchGetUser.rejected, (state, action: any) => {
      state.status = "failed";
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.status = "success";
        state.isAuthenticated = true;
        state.isAdmin = action.payload.isAdmin;
        state.idUser = action.payload.id;
        state.userRender = action.payload;
      }
    );
    builder.addCase(loginUser.rejected, (state, action: any) => {
      state.status = "failed";
      state.error = action.payload;
      state.isAuthenticated = false;
    });
  },
});

export const { getUser, getIdUser } = UserSlice.actions;
export default UserSlice.reducer;
