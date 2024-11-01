import React, { useState } from "react";
import {
  Box,
  Drawer,
  Toolbar,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import DashboardContent from "../DashboardContent/DashboardContent";
import OrderManagement from "../OrderManagement/OrderManagement";
import CustomerManagement from "../CustomerManagement/CustomerManagement";
import ProductManagement from "../ProductManagement/ProductManagement";

const drawerWidth = 240;
const AdminContent = () => {
  const [currentContent, setCurrentContent] = useState<React.ReactNode>(
    <DashboardContent />
  );
  const handleItemClick = (component: React.ReactNode) => {
    setCurrentContent(component);
  };
  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          <ListItemButton onClick={() => handleItemClick(<DashboardContent />)}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton
            onClick={() => handleItemClick(<ProductManagement />)}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lý Sản phẩm" />
          </ListItemButton>
          <ListItemButton onClick={() => handleItemClick(<OrderManagement />)}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lý Đơn hàng" />
          </ListItemButton>
          <ListItemButton
            onClick={() => handleItemClick(<CustomerManagement />)}
          >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lý Khách hàng" />
          </ListItemButton>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {currentContent}
      </Box>
    </>
  );
};

export default AdminContent;
