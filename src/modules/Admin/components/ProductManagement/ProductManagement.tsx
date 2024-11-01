import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Box,
  TextField,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddToCart,
  fetchCartProductAPI,
  fetchDeleteCart,
} from "../../../../store/slices/CartProductSlice";
import { RootState } from "../../../../store/store";

const ProductManagement: React.FC = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Tên sản phẩm là bắt buộc"),
    price: Yup.number()
      .required("Giá sản phẩm là bắt buộc")
      .positive("Giá phải lớn hơn 0"),
    category: Yup.string().required("Danh mục là bắt buộc"),
    image: Yup.mixed().required("Ảnh là bắt buộc"),
    title: Yup.string().required("Tựa đầu là bắt buộc"),
    frame: Yup.string().required("Khung ghế là bắt buộc"),
    armrest: Yup.string().required("Tựa tay là bắt buộc"),
    seatCushion: Yup.string().required("Đệm ngồi là bắt buộc"),
    seatPlate: Yup.string().required("Mâm ghế là bắt buộc"),
    hydraulic: Yup.string().required("Thủy lực là bắt buộc"),
    chairLeg: Yup.string().required("Chân ghế là bắt buộc"),
    wheels: Yup.string().required("Bánh xe là bắt buộc"),
  });

  const handleAddProduct = async (values: any) => {
    await dispatch(fetchAddToCart(values));
    await dispatch(fetchCartProductAPI());
  };
  const product = useSelector(
    (state: RootState) => state.cartProductState.card
  );

  const handDelete = async (id: string) => {
    await dispatch(fetchDeleteCart(id));
    await dispatch(fetchCartProductAPI());
  };
  useEffect(() => {
    dispatch(fetchCartProductAPI());
  }, []);
  return (
    <Box padding={2}>
      <Typography variant="h6" gutterBottom>
        Quản lý Sản phẩm
      </Typography>
      <Formik
        initialValues={{
          name: "",
          price: "",
          category: "",
          image: "",
          title: "",
          frame: "",
          armrest: "",
          seatCushion: "",
          seatPlate: "",
          hydraulic: "",
          chairLeg: "",
          wheels: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values: any, { resetForm }) => {
          console.log(values);
          handleAddProduct(values);
          resetForm();
        }}
      >
        {({ setFieldValue, touched, errors }) => (
          <Form encType="multipart/form-data">
            <Box display="flex" flexDirection="column" marginBottom={2}>
              <Field name="name">
                {({ field, meta }: any) => (
                  <TextField
                    {...field}
                    label="Tên sản phẩm"
                    variant="outlined"
                    margin="normal"
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </Field>
              <Field name="price">
                {({ field, meta }: any) => (
                  <TextField
                    {...field}
                    label="Giá sản phẩm"
                    type="number"
                    variant="outlined"
                    margin="normal"
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </Field>
              <FormControl variant="outlined" margin="normal">
                <InputLabel>Danh mục</InputLabel>
                <Field name="category" as={Select}>
                  <MenuItem value="1">Ghế Văn Phòng</MenuItem>
                  <MenuItem value="2">Ghế Giám Đốc</MenuItem>
                  <MenuItem value="3">Ghế Công Thái Học</MenuItem>
                  <MenuItem value="4">Bàn Làm Việc</MenuItem>
                </Field>
              </FormControl>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="upload-image"
                type="file"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    setFieldValue("image", file);
                  }
                }}
              />
              <label htmlFor="upload-image">
                <Button
                  variant="contained"
                  component="span"
                  style={{ marginTop: "16px" }}
                >
                  Chọn ảnh
                </Button>
              </label>
              <Field name="title">
                {({ field }: any) => (
                  <TextField
                    {...field}
                    label="Tựa đề"
                    variant="outlined"
                    margin="normal"
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                  />
                )}
              </Field>
              <Field name="frame">
                {({ field }: any) => (
                  <TextField
                    {...field}
                    label="Khung lưng"
                    variant="outlined"
                    margin="normal"
                    error={touched.frame && Boolean(errors.frame)}
                    helperText={touched.frame && errors.frame}
                  />
                )}
              </Field>
              <Field name="armrest">
                {({ field }: any) => (
                  <TextField
                    {...field}
                    label="Tựa tay"
                    variant="outlined"
                    margin="normal"
                    error={touched.armrest && Boolean(errors.armrest)}
                    helperText={touched.armrest && errors.armrest}
                  />
                )}
              </Field>
              <Field name="seatCushion">
                {({ field }: any) => (
                  <TextField
                    {...field}
                    label="Đệm ngồi"
                    variant="outlined"
                    margin="normal"
                    error={touched.seatCushion && Boolean(errors.seatCushion)}
                    helperText={touched.seatCushion && errors.seatCushion}
                  />
                )}
              </Field>
              <Field name="seatPlate">
                {({ field }: any) => (
                  <TextField
                    {...field}
                    label="Mâm ghế"
                    variant="outlined"
                    margin="normal"
                    error={touched.seatPlate && Boolean(errors.seatPlate)}
                    helperText={touched.seatPlate && errors.seatPlate}
                  />
                )}
              </Field>
              <Field name="hydraulic">
                {({ field }: any) => (
                  <TextField
                    {...field}
                    label="Thủy lực"
                    variant="outlined"
                    margin="normal"
                    error={touched.hydraulic && Boolean(errors.hydraulic)}
                    helperText={touched.hydraulic && errors.hydraulic}
                  />
                )}
              </Field>
              <Field name="chairLeg">
                {({ field }: any) => (
                  <TextField
                    {...field}
                    label="Khung Chân"
                    variant="outlined"
                    margin="normal"
                    error={touched.chairLeg && Boolean(errors.chairLeg)}
                    helperText={touched.chairLeg && errors.chairLeg}
                  />
                )}
              </Field>
              <Field name="wheels">
                {({ field }: any) => (
                  <TextField
                    {...field}
                    label="Bánh xe"
                    variant="outlined"
                    margin="normal"
                    error={touched.wheels && Boolean(errors.wheels)}
                    helperText={touched.wheels && errors.wheels}
                  />
                )}
              </Field>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "16px" }}
                type="submit"
              >
                Thêm Sản phẩm
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      <TableContainer component={Paper} style={{ marginTop: "16px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Danh mục</TableCell>
              <TableCell>Ảnh</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {product &&
              product.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  {/* <TableCell>
                    {product.image && (
                      <img
                        src={URL.createObjectURL(product.image)}
                        alt={product.name}
                        style={{ width: "50px", height: "50px" }}
                      />
                    )}
                  </TableCell> */}
                  <TableCell>
                    <Button
                      color="secondary"
                      onClick={() => handDelete(product.id)}
                    >
                      Xóa
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductManagement;
