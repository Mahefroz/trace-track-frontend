import React from "react";
import Link from "@mui/material/Link";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  TextField,
  IconButton,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  tableCellClasses,
  Button,
  Breadcrumbs,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiAlert from "@mui/material/Alert";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useServices from "../../custom-hooks/use-Services";
import useAssetServices from "../../custom-hooks/services/use-AssetServices";
import useProductServices from "../../custom-hooks/services/use-ProductServices";
import EditIcon from "@mui/icons-material/Edit";
import { Style } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import useBusinessServices from "../../custom-hooks/services/use-BusinessServices";
import "./CategorySettingsComp.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
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
const TaggingMethodComp = () => {
  const {
    allProductCategoryMethods,
    addCategoryMethod,
    deleteCategoryMethod,
    updateCategoryMethod,
  } = useProductServices();
  const {
    allBusinessMethods,
    addBusinessMethod,
    deleteBusinessMethod,
    updateBusinessMethod,
  } = useBusinessServices();
  const {
    allAssetCategory,
    addAssetMethod,
    deleteAssetMethod,
    updateAssetMethod,
  } = useAssetServices();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [tag, setTag] = useState(1);
  const [method, setMethod] = useState({ category: null, method: null });
  const [allMethods, setAllMethods] = useState([]);
  const [editMethod, setEditMethod] = useState(null);
  const [update, setUpdate] = useState(null);

  const [resp, setResp] = useState({ success: "", error: "" });
  const [error, setError] = useState({ category: false, method: false });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const productMethods = async () => {
    try {
      const result = await allProductCategoryMethods();
      console.log("All methods", result.data);
      setAllMethods(result.data);
    } catch (err) {
      console.log(err);
    }
  };
  const businessMethods = async () => {
    try {
      const result = await allBusinessMethods();
      setAllMethods(result.data);
    } catch (err) {
      console.log(err);
    }
  };
  const assetMethods = async () => {
    try {
      const result = await allAssetCategory();
      setAllMethods(result.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getCategoryMethods = async () => {
    setMethod({ category: null, method: null });
    setAllMethods([]);
    if (tag === 1) {
      productMethods();
    }
    if (tag === 2) {
      businessMethods();
    }
    if (tag === 3) {
      assetMethods();
    }
  };
  const deleteTagMethod = async (cat_id, cat_method) => {
    console.log("Delete", cat_id);
    if (cat_id !== null && cat_method !== null) {
      if (tag === 1) {
        try {
          const result = await deleteCategoryMethod({ id: cat_id });
          setOpen(true);
          if (result.msg) {
            setResp({ success: result.msg, error: "" });
            getCategoryMethods();
            setLoading(false);
          } else if (result.error) {
            setResp({ success: "", error: result.error });
            setLoading(false);
          }
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      }
      if (tag === 2) {
        try {
          const result = await deleteBusinessMethod({ id: cat_id });
          setOpen(true);
          if (result.msg) {
            setResp({ success: result.msg, error: "" });
            getCategoryMethods();
            setLoading(false);
          } else if (result.error) {
            setResp({ success: "", error: result.error });
            setLoading(false);
          }
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      }
      if (tag === 3) {
        try {
          const result = await deleteAssetMethod({ id: cat_id });
          setOpen(true);
          if (result.msg) {
            setResp({ success: result.msg, error: "" });
            getCategoryMethods();
            setLoading(false);
          } else if (result.error) {
            setResp({ success: "", error: result.error });
            setLoading(false);
          }
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      setOpen(true);
      setResp({ success: "", error: "No Tag method present" });
    }
  };
  const saveMethod = async () => {
    console.log("Method", method);
    const validate = {
      category: false,
      method: false,
    };
    if (method.category === null) {
      validate.category = true;
    }
    if (method.method === null) {
      validate.method = true;
    }
    if (validate.method === false && validate.category === false) {
      setLoading(true);
      if (tag === 1) {
        try {
          const result = await addCategoryMethod(method);
          setOpen(true);
          if (result.msg) {
            setResp({ success: result.msg, error: "" });
            getCategoryMethods();
            setLoading(false);
          } else if (result.error) {
            setResp({ success: "", error: result.error });
            setLoading(false);
          }
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      }
      if (tag === 2) {
        try {
          const result = await addBusinessMethod(method);
          setOpen(true);
          if (result.msg) {
            setResp({ success: result.msg, error: "" });
            getCategoryMethods();
            setLoading(false);
          } else if (result.error) {
            setResp({ success: "", error: result.error });
            setLoading(false);
          }
        } catch (err) {
          console.log(err);
        }
      }
      if (tag === 3) {
        try {
          const result = await addAssetMethod(method);
          setOpen(true);
          if (result.msg) {
            setResp({ success: result.msg, error: "" });
            getCategoryMethods();
            setLoading(false);
          } else if (result.error) {
            setResp({ success: "", error: result.error });
            setLoading(false);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      await setError({
        ...error,
        ...validate,
      });
    }
  };
  const updateMethod = async (method_id) => {
    console.log("Updated", update);
    if (update === undefined || update === null) {
      setOpen(true);
      return setResp({ success: "", error: "Category Name cannot be empty" });
    }
    if (tag === 1) {
      try {
        const res = await updateCategoryMethod({
          id: method_id,
          newMethod: update,
        });
        setOpen(true);
        if (res.msg) {
          setResp({ success: res.msg, error: "" });
          setEditMethod(null);
          setUpdate(null);
          getCategoryMethods();
        } else if (res.error) {
          setEditMethod(null);
          setUpdate(null);
          setResp({ success: "", error: res.error });
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (tag === 2) {
      try {
        const res = await updateBusinessMethod({
          id: method_id,
          newMethod: update,
        });
        setOpen(true);
        if (res.msg) {
          setResp({ success: res.msg, error: "" });
          setEditMethod(null);
          setUpdate(null);
          getCategoryMethods();
        } else if (res.error) {
          setEditMethod(null);
          setUpdate(null);
          setResp({ success: "", error: res.error });
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (tag === 3) {
      try {
        const res = await updateAssetMethod({
          id: method_id,
          newMethod: update,
        });
        setOpen(true);
        if (res.msg) {
          setResp({ success: res.msg, error: "" });
          setEditMethod(null);
          setUpdate(null);
          getCategoryMethods();
        } else if (res.error) {
          setEditMethod(null);
          setUpdate(null);
          setResp({ success: "", error: res.error });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getCategoryMethods();
  }, [tag]);
  return (
    <div className="main-container">
      <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: 12, marginTop: 0 }}>
        <Link underline="hover" color="inherit">
          Trace N Track
        </Link>
        <Link underline="hover" color="inherit">
          Settings
        </Link>
        <Link underline="hover" color="inherit">
          Category Settings
        </Link>
        <Link
          underline="hover"
          color="primary"
          aria-current="page"
          href="/categorySettings"
        >
          Tagging Methods
        </Link>
      </Breadcrumbs>
      <Box className="data">
        <Box className="field">
          <FormControl sx={{ minWidth: 120, marginTop: 1 }}>
            <InputLabel id="tag-settings" size="small">
              Tag
            </InputLabel>
            <Select
              size="small"
              labelId="tag-settings"
              id="tag-settings-list"
              placeholder="Select Tag Setting for"
              value={tag}
              // key={e.target.value}
              //   value={product}
              //   error={error.product}
              label="Tag"
              onChange={(e) => {
                setTag(e.target.value);
                setMethod({ category: null, method: null });
              }}
            >
              <MenuItem value={1} key={1}>
                Product
              </MenuItem>
              <MenuItem value={2} key={2}>
                Customer Location
              </MenuItem>
              <MenuItem value={3} key={3}>
                Asset
              </MenuItem>
            </Select>
            {/* {error.product && (
              <FormHelperText sx={{ color: "#d32f2f" }}>
                required
              </FormHelperText>
            )} */}
          </FormControl>
        </Box>
      </Box>
      {loading ? (
        <Box className="loader">
          <CircularProgress />
        </Box>
      ) : (
        <Box className="section">
          <Box className="heading">
            <img src="./packaging.png" height={20} width={20} />
            <Typography
              sx={{
                fontWeight: "bold",
                marginLeft: "10px",
                //  fontSize: 20, marginTop: "20px"
              }}
            >
              Tagging Method
            </Typography>
          </Box>

          <Box className="data">
            <Box className="sub-field">
              <FormControl sx={{ minWidth: 120, marginTop: 1 }}>
                <InputLabel id="categories" size="small">
                  Category
                </InputLabel>
                <Select
                  size="small"
                  labelId="categories"
                  id="categories-list"
                  placeholder="Select Category"
                  label="Category"
                  value={method.category}
                  error={error.category}
                  onChange={(e) => {
                    setError({ ...error, ["category"]: false });
                    setMethod({ ...method, ["category"]: e.target.value });
                  }}
                >
                  {allMethods.map((row) => {
                    return <MenuItem value={row.id}>{row.category}</MenuItem>;
                  })}
                </Select>
                {error.category && (
                  <FormHelperText sx={{ color: "#d32f2f" }}>
                    required
                  </FormHelperText>
                )}
              </FormControl>
            </Box>

            <Box className="sub-field">
              <FormControl sx={{ minWidth: 120, marginTop: 1 }}>
                <InputLabel id="tag-method" size="small">
                  Tagging Method
                </InputLabel>
                <Select
                  size="small"
                  labelId="tag-method"
                  id="tag-method-list"
                  placeholder="Select Tag Setting for"
                  label="Tagging Method"
                  value={method.method}
                  error={error.method}
                  onChange={(e) => {
                    setError({ ...error, ["method"]: false });
                    setMethod({ ...method, ["method"]: e.target.value });
                  }}
                >
                  <MenuItem value={1}>QR Code</MenuItem>
                  <MenuItem value={2}>Barcode</MenuItem>
                  <MenuItem value={3}>Serial No</MenuItem>
                  <MenuItem value={4}>Batch No</MenuItem>
                </Select>

                {error.method && (
                  <FormHelperText sx={{ color: "#d32f2f" }}>
                    required
                  </FormHelperText>
                )}
              </FormControl>
            </Box>
            <Box className="sub-field">
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: "10px", width: "30%" }}
                onClick={saveMethod}
              >
                Save
              </Button>
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
                    <StyledTableCell>ID</StyledTableCell>
                    <StyledTableCell>Category</StyledTableCell>
                    <StyledTableCell>Tagging Method</StyledTableCell>

                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {allMethods.map((row) => {
                    return (
                      <StyledTableRow>
                        <StyledTableCell>{row.id}</StyledTableCell>
                        <StyledTableCell>
                          {row.category.charAt(0).toUpperCase() +
                            row.category.slice(1).toLowerCase()}
                        </StyledTableCell>
                        {editMethod === row.id ? (
                          <StyledTableCell>
                            <FormControl sx={{ minWidth: 150 }}>
                              <InputLabel id="tag-method" size="small">
                                Method
                              </InputLabel>
                              <Select
                                variant="outlined"
                                size="small"
                                labelId="tag-method"
                                id="tag-method-list"
                                placeholder={
                                  row.method === 1
                                    ? "QR"
                                    : row.method === 2
                                    ? "Batch No"
                                    : row.method === 3
                                    ? "Batch No"
                                    : row.method === 4
                                    ? "Serial No"
                                    : ""
                                }
                                label="Method"
                                value={update}
                                // error={error.method}
                                onChange={(e) => {
                                  setUpdate(e.target.value);
                                }}
                              >
                                <MenuItem value={1}>QR Code</MenuItem>
                                <MenuItem value={2}>Barcode</MenuItem>
                                <MenuItem value={3}>Serial No</MenuItem>
                                <MenuItem value={4}>Batch No</MenuItem>
                              </Select>

                              {error.method && (
                                <FormHelperText sx={{ color: "#d32f2f" }}>
                                  required
                                </FormHelperText>
                              )}
                            </FormControl>
                          </StyledTableCell>
                        ) : (
                          <StyledTableCell>
                            {row.method === 1
                              ? "QR"
                              : row.method === 2
                              ? "Barcode "
                              : row.method === 3
                              ? "Serial No"
                              : row.method === 4
                              ? "Batch No"
                              : ""}
                          </StyledTableCell>
                        )}
                        {editMethod === row.id ? (
                          <>
                            <StyledTableCell align="right">
                              <SaveIcon
                                size="small"
                                sx={{
                                  cursor: "pointer",
                                  "&:hover": { color: "green" },
                                }}
                                onClick={() => {
                                  updateMethod(row.id);
                                }}
                              />
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              <CancelOutlinedIcon
                                size="small"
                                sx={{
                                  cursor: "pointer",
                                  "&:hover": { color: "grey" },
                                }}
                                onClick={() => {
                                  setEditMethod(null);
                                }}
                              />
                            </StyledTableCell>
                          </>
                        ) : (
                          <>
                            {row.method !== null ? (
                              <>
                                <StyledTableCell align="right">
                                  <EditIcon
                                    size="small"
                                    sx={{
                                      cursor: "pointer",
                                      "&:hover": { color: "blue" },
                                    }}
                                    onClick={() => {
                                      setEditMethod(row.id);
                                    }}
                                  />
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                  <DeleteIcon
                                    // color="red"
                                    onClick={() => {
                                      deleteTagMethod(row.id, row.method);
                                    }}
                                    size="small"
                                    sx={{
                                      cursor: "pointer",
                                      "&:hover": { color: "red" },
                                    }}
                                  />
                                </StyledTableCell>
                              </>
                            ) : (
                              <>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell align="left">
                                  <DeleteIcon
                                    // color="red"
                                    onClick={() => {
                                      deleteTagMethod(row.id, row.method);
                                    }}
                                    size="small"
                                    sx={{
                                      cursor: "pointer",
                                      marginRight: "30px",
                                      "&:hover": { color: "red" },
                                    }}
                                  />
                                </StyledTableCell>
                              </>
                            )}
                          </>
                        )}

                        {/* {editMethod === row.id ? (
                          ""
                        ) : (
                          <StyledTableCell></StyledTableCell>
                        )} */}

                        {/* <StyledTableCell align="right">
                          <EditIcon
                            align="right"
                            size="small"
                            sx={{
                              cursor: "pointer",
                              "&:hover": { color: "blue" },
                            }}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <DeleteIcon
                            onClick={() => {
                              deleteTagMethod(row.id, row.method);
                            }}
                            size="small"
                            sx={{
                              cursor: "pointer",
                              marginLeft: "10px",
                              "&:hover": { color: "red" },
                            }}
                          />
                        </StyledTableCell> */}
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        {resp.success.length !== 0 ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {resp.success}
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {resp.error}
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};

export default TaggingMethodComp;
