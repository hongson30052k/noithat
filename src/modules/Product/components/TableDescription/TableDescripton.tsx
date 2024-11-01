import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { chairProducts } from "./TableDescriptonData";
import styles from "./TableDescription.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useEffect } from "react";
import { fetchProductApi } from "../../../../store/slices/CartProductSlice";
const cx = classNames.bind(styles);

const TableDescription = () => {
  const dispatch = useDispatch();
  const id = useSelector(
    (state: RootState) => state.cartProductState.productId
  );
  useEffect(() => {
    dispatch(fetchProductApi(id));
  }, []);
  const cartId: any = useSelector(
    (state: RootState) => state.cartProductState.cardId
  );
  console.log(cartId);
  return (
    <>
      <TableContainer component={Paper} className={cx("table-container")}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableBody>
            {cartId && (
              <>
                <TableRow>
                  <TableCell sx={{ fontSize: "18px", fontWeight: "bold" }}>
                    Khung lưng
                  </TableCell>
                  <TableCell sx={{ fontSize: "18px" }}>
                    {cartId.frame}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontSize: "18px", fontWeight: "bold" }}>
                    Tựa tay
                  </TableCell>
                  <TableCell sx={{ fontSize: "18px" }}>
                    {cartId.armrest}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontSize: "18px", fontWeight: "bold" }}>
                    Mâm ghế
                  </TableCell>
                  <TableCell sx={{ fontSize: "18px" }}>
                    {cartId.seatPlate}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontSize: "18px", fontWeight: "bold" }}>
                    Position
                  </TableCell>
                  <TableCell sx={{ fontSize: "18px" }}>
                    {cartId.hydraulic}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontSize: "18px", fontWeight: "bold" }}>
                    Khung chân
                  </TableCell>
                  <TableCell sx={{ fontSize: "18px" }}>
                    {cartId.chairLeg}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontSize: "18px", fontWeight: "bold" }}>
                    Bánh xe
                  </TableCell>
                  <TableCell sx={{ fontSize: "18px" }}>
                    {cartId.wheels}
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableDescription;
