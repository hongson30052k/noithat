import { useEffect, useState } from "react";
import styles from "./ProfileCartOrder.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import {
  fetchCancleOrderProduct,
  fetchGetOrderProduct,
  fetchProductOrderUserId,
} from "../../../../store/slices/CartOderSlice";
const cx = classNames.bind(styles);
const ProfileCartOrder = () => {
  const [currentId, setCurrentId] = useState();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const { orderUser, itemProduct, status } = useSelector(
    (state: RootState) => state.cartOderState
  );
  const handleShowProductDetail = async (id: any) => {
    await dispatch(fetchGetOrderProduct(id));
    setIsModalOpen(true);
  };
  const onHandleCancel = (id: any) => {
    setCurrentId(id);
    setIsModalCancel(true);
  };
  const onHandleCancelProduct = async () => {
    await dispatch(fetchCancleOrderProduct(currentId));
    setIsModalCancel(false);
  };
  useEffect(() => {
    dispatch(fetchProductOrderUserId());
  }, [status, dispatch]);

  return (
    <div>
      <div className={cx("order-management")}>
        <h1>Quản lý Đơn hàng</h1>
        <table className={cx("order-table")}>
          <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Ngày đặt</th>
              <th>Địa chỉ</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orderUser?.map((item: any) => {
              return (
                <tr>
                  <td>{item.id}</td>

                  <td>{item.total} VND</td>
                  <td>
                    {item?.status === "Pending" && "Chưa xử lý"}
                    {item?.status === "Processing" && "Đang chuẩn bị"}
                    {item?.status === "Shipped" && "Đang giao hàng"}
                    {item?.status === "Delivered" && "Đã giao hàng"}
                    {item?.status === "Canceled" && "Đã hủy"}
                  </td>
                  <td>{item?.date}</td>
                  <td>{item?.address}</td>
                  <td>
                    <button
                      className={cx("action-btn")}
                      onClick={() => {
                        handleShowProductDetail(item.id);
                      }}
                    >
                      Xem chi tiết
                    </button>
                    {item?.status === "Canceled" ? (
                      <div>Bạn đã hủy đơn hàng</div>
                    ) : (
                      <button
                        className={cx("action-btn")}
                        onClick={() => {
                          onHandleCancel(item.id);
                        }}
                      >
                        Hủy Đơn hàng
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {isModalOpen && (
          <div className={cx("modal-overlay")}>
            <div className={cx("modal-content")}>
              <ul>
                <h2>Chi tiết đơn hàng #{itemProduct?.id}</h2>
                {itemProduct?.product.map((product: any) => (
                  <li className={cx("modal-item")}>
                    <span>
                      <strong>Tên SP: {product.product.name}</strong>
                    </span>
                    <span>Số lượng: {product.quantity}</span>
                    <span>Giá: {product.product.price}VND</span>
                    <span>
                      Tổng: {product.product.price * product.quantity} VND
                    </span>
                  </li>
                ))}
              </ul>
              ;
              <button
                className={cx("close-btn")}
                onClick={() => setIsModalOpen(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        )}
        <div>
          {isModalCancel && (
            <div id="confirmationModal" className={cx("modal-cancel")}>
              <div className={cx("modal-content-cancel")}>
                <div className={cx("modal-header")}>Xác nhận hủy đơn hàng</div>
                <div className={cx("modal-body")}>
                  Bạn có chắc chắn muốn hủy đơn hàng này không?
                </div>
                <div className={cx("modal-footer")}>
                  <button
                    className={cx("confirm-btn")}
                    id="confirmBtn"
                    onClick={onHandleCancelProduct}
                  >
                    Đồng ý
                  </button>
                  <button
                    className={cx("cancel-btn")}
                    id="cancelBtn"
                    onClick={() => setIsModalCancel(false)}
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCartOrder;