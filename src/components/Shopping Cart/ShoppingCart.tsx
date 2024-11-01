import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
} from "@mui/material";
import { RootState } from "../../store/store";
import {
  clearCart,
  removeFromCart,
  toggleCart,
} from "../../store/slices/CartSlice";

import { useDispatch, useSelector } from "react-redux";
const ShoppingCart: React.FC = () => {
  const { items, isOpen } = useSelector((state: RootState) => state.cartState);
  const product = useSelector((state: RootState) => state.cartState.items);
  console.log(product);
  const dispatch = useDispatch();
  const total = items.reduce((acc: any, item: any) => acc + item.price, 0);
  return (
    <div>
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => dispatch(toggleCart())}
      >
        <div
          role="presentation"
          onClick={() => dispatch(toggleCart())}
          onKeyDown={() => dispatch(toggleCart())}
          style={{ width: 400 }}
        >
          <Typography variant="h6" style={{ padding: 16 }}>
            Shopping Cart
          </Typography>
          <List>
            {product.length === 0 ? (
              <ListItem>
                <ListItemText primary="Your cart is empty." />
              </ListItem>
            ) : (
              product.map((item: any) => (
                <ListItem key={item.id}>
                  <ListItemText
                    primary={item.name}
                    secondary={`$${item.price}`}
                  />
                  <Button onClick={() => dispatch(removeFromCart(item))}>
                    Remove
                  </Button>
                </ListItem>
              ))
            )}
          </List>
          <Typography variant="h6" style={{ padding: 16 }}>
            Total: ${total}
          </Typography>
          <Button
            variant="contained"
            fullWidth
            style={{ padding: "10px" }}
            onClick={() => dispatch(clearCart())}
          >
            Clear All
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default ShoppingCart;
