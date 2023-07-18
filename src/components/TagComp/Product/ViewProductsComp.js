import React from "react";
import "./ViewProductsComp.css";
import Link from "@mui/material/Link";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import moment from "moment";
import {
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Snackbar,
  TableCell,
  TableRow,
  tableCellClasses,
  Button,
  Breadcrumbs,
  Tooltip,
} from "@mui/material";
import BarcodeComp from "../../TaggingMethods/BarcodeComp";
import useProductServices from "../../custom-hooks/services/use-ProductServices";
import { createFactory } from "react";
import { Style } from "@mui/icons-material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "grey",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ViewProductsComp = () => {
  const { getAllCategories, getAllProducts } = useProductServices();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({
    category: "",
    method: null,
    products: [],
    cols: [],
  });
  const allCategories = async () => {
    const res = await getAllCategories();
    setCategories(res.data);
  };
  const allProducts = async () => {
    const res = await getAllProducts({ categoryId: category.id });
    console.log("All Products", res.data);
    let allRows = [];
    if (category.method) {
      let allCols = res?.data[0]?.details?.cols;

      res.data.map((row) => {
        row.details.rows.map((allrows) => {
          allRows.push(allrows);
        });
        // console.log("All rows", row);
      });
      console.log("Products", allRows, allCols, category);
      setCategory({ ...category, ["products"]: allRows, ["cols"]: allCols });
    }

    // setCategories(res.data);
  };
  const toDataURL = async (url) => {
    return fetch(url)
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        return URL.createObjectURL(blob);
      });
  };
  const download = async (qr) => {
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = await toDataURL(qr);
    a.download = "data" + "." + "png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  useEffect(() => {
    allCategories();
  }, []);
  useEffect(() => {
    allProducts();
  }, [category.category]);

  return (
    <div className="main-container">
      <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: 12, marginTop: 0 }}>
        <Link underline="hover" color="inherit">
          Tag N Track
        </Link>
        <Link underline="hover" color="inherit">
          Tag
        </Link>
        <Link underline="hover" color="inherit">
          Tag Product
        </Link>
        <Link
          underline="hover"
          color="primary"
          aria-current="page"
          href="/tagProduct"
        >
          View Products
        </Link>
      </Breadcrumbs>
      <div className="section">
        <Box className="data">
          <Box className="field">
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="tag-method" size="small">
                Product Category
              </InputLabel>
              <Select
                size="small"
                labelId="category"
                id="category-list"
                placeholder="Select Product Category"
                label="Product Category"
                // error={error.method}
                onChange={(e) => {
                  const data = e.target.value;
                  console.log("On change", data);
                  setCategory({
                    ...category,
                    ["id"]: data.id,
                    ["category"]: data.category,
                    ["method"]: data.method,
                  });
                  // allProducts(data.id);
                }}
              >
                {categories.map((row) => {
                  return (
                    <MenuItem value={row}>
                      {row.category.charAt(0).toUpperCase() +
                        row.category.slice(1).toLowerCase()}
                    </MenuItem>
                  );
                })}
              </Select>

              {/* {error.method && (
                      <FormHelperText sx={{ color: "#d32f2f" }}>
                        required
                      </FormHelperText>
                    )} */}
            </FormControl>
          </Box>
          <Box className="field">
            <TextField
              id="tagging method"
              size="small"
              error={category.method === 0 ? true : false}
              // helperText={
              //   category.method === 0 ? "No tagging method exists" : ""
              // }
              label={
                category.method === 0
                  ? "No Tagging Method "
                  : category.method === 1
                  ? "QR"
                  : category.method === 2
                  ? "Barcode"
                  : category.method === 3
                  ? "Serial No"
                  : category.method === 4
                  ? "Batch No"
                  : category.method === null
                  ? "Tagging Method"
                  : ""
              }
              variant="outlined"
              disabled
            />
          </Box>
        </Box>
        <Box>
          <TableContainer
            component={Paper}
            sx={{
              minWidth: 600,
              width: "95%",
              margin: "10px",

              borderRadius: "12px",
            }}
          >
            <Table
              // sx={{ minWidth: 600 }}
              aria-label="customized table"
            >
              <TableHead>
                <StyledTableRow>
                  {category?.cols?.map((row) => {
                    return <StyledTableCell>{row}</StyledTableCell>;
                  })}
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {category?.products?.map((row) => {
                  return (
                    <StyledTableRow>
                      {category.cols.map((col, index) => {
                        if (col === "Date") {
                          return (
                            <StyledTableCell>
                              {moment(row[col]).format("DD-MMM-YYYY h:mm:ss a")}
                            </StyledTableCell>
                          );
                        } else if (col === "Image") {
                          {
                            console.log("Method in table", category.method);
                          }
                          if (category.method === 1) {
                            return (
                              <StyledTableCell>
                                <Tooltip title="Click to download">
                                  <img
                                    src={row[col]}
                                    width="20px"
                                    height="20px"
                                    onClick={() => {
                                      download(row[col]);
                                    }}
                                  />
                                </Tooltip>
                              </StyledTableCell>
                            );
                          } else if (category.method === 2) {
                            return (
                              <StyledTableCell
                                sx={{ width: "5px !important", height: 2 }}
                              >
                                <BarcodeComp
                                  data={row[col]}
                                  link="http://localhost:3000"
                                />
                              </StyledTableCell>
                            );
                          }
                        } else {
                          return <StyledTableCell>{row[col]}</StyledTableCell>;
                        }
                      })}
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
    </div>
  );
};

export default ViewProductsComp;
