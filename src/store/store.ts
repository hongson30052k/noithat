import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/CartSlice";
import productReducer from "./slices/CartProductSlice";
import userReducer from "./slices/UserSlice";
const store = configureStore({
  reducer: {
    cartState: cartReducer,
    cartProductState: productReducer,
    userState: userReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
