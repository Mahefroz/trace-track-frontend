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
import { useState, useEffect } from "react";
import useServices from "../../custom-hooks/use-Services";
import useAssetServices from "../../custom-hooks/services/use-AssetServices";
import useProductServices from "../../custom-hooks/services/use-ProductServices";
import EditIcon from "@mui/icons-material/Edit";
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

const CategorySettingsComp = () => {
  const { addCategory } = useServices();
  const {
    addAssetCategory,
    allAssetCategory,
    deleteAssetCategory,
    updateAssetCategory,
  } = useAssetServices();
  const {
    updateSingleCategory,
    deleteSingleCategory,
    addCategoryMethod,
    getAllCategories,
  } = useProductServices();
  const {
    addBusinessType,
    allBusinessTypes,
    deleteBusinessType,
    updateBusinessType,
  } = useBusinessServices();
  const [tag, setTag] = useState(1);
  const [open, setOpen] = React.useState(false);
  const [resp, setResp] = useState({ success: "", error: "" });
  const [newCategory, setNewCategory] = useState("");
  const [allCategories, setAllCategories] = useState([]);

  const [tagMethod, setTagMethod] = useState({ category: null, method: null });

  const [editCat, setEditCat] = useState(null);
  const [updateCat, setUpdateCat] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const addNewCategory = async () => {
    if (tag === 1) {
      console.log("Category", newCategory);
      try {
        const res = await addCategory({ category: newCategory });

        setOpen(true);
        if (res.msg) {
          setResp({ success: res.msg, error: "" });
          allProductCategories();
        } else if (res.error) {
          setResp({ success: "", error: res.error });
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (tag === 2) {
      console.log("Category", newCategory);

      try {
        const res = await addBusinessType({ category: newCategory });

        setOpen(true);
        if (res.msg) {
          setResp({ success: res.msg, error: "" });
          getAllBusinessTypes();
        } else if (res.error) {
          setResp({ success: "", error: res.error });
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (tag === 3) {
      console.log("Category", newCategory);
      try {
        const res = await addAssetCategory({ category: newCategory });

        await setOpen(true);
        if (res.msg) {
          await setResp({ success: res.msg, error: "" });
          getAllAssetCategories();
        } else if (res.error) {
          await setResp({ success: "", error: res.error });
        }
      } catch (err) {
        console.log(err);
      }
    }
    setNewCategory("");
  };

  const updateCategory = async (cat_id) => {
    console.log("Updated", updateCat);
    if (updateCat.length !== 0) {
      if (tag === 1) {
        try {
          const res = await updateSingleCategory({
            id: cat_id,
            newCategory: updateCat,
          });

          await setOpen(true);
          if (res.msg) {
            await setResp({ success: res.msg, error: "" });
            setEditCat(null);
            getCategories();
            // allProductCategories();
          } else if (res.error) {
            await setResp({ success: "", error: res.error });
          }
        } catch (err) {
          console.log(err);
        }
      }
      if (tag === 2) {
        try {
          const res = await updateBusinessType({
            id: cat_id,
            newCategory: updateCat,
          });

          await setOpen(true);
          if (res.msg) {
            await setResp({ success: res.msg, error: "" });
            setEditCat(null);
            getCategories();
          } else if (res.error) {
            await setResp({ success: "", error: res.error });
          }
        } catch (err) {
          console.log(err);
        }
      }
      if (tag === 3) {
        try {
          const res = await updateAssetCategory({
            id: cat_id,
            newCategory: updateCat,
          });

          await setOpen(true);
          if (res.msg) {
            await setResp({ success: res.msg, error: "" });
            setEditCat(null);
            getCategories();
          } else if (res.error) {
            await setResp({ success: "", error: res.error });
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      setOpen(true);
      await setResp({ success: "", error: "Category Name cannot be empty" });
    }
  };
  const deleteCategory = async (cat) => {
    if (tag === 1) {
      try {
        console.log("Delete", cat);
        const res = await deleteSingleCategory({ categoryId: cat });
        console.log("Deleted", res);
        setOpen(true);
        if (res.msg) {
          setResp({ success: res.msg, error: "" });
          getCategories();
        } else if (res.error) {
          setResp({ success: "", error: res.error });
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (tag === 2) {
      try {
        console.log("Delete", cat);
        const res = await deleteBusinessType({ categoryId: cat });
        console.log("Deleted", res);
        setOpen(true);
        if (res.msg) {
          setResp({ success: res.msg, error: "" });
          getCategories();
        } else if (res.error) {
          setResp({ success: "", error: res.error });
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (tag === 3) {
      try {
        console.log("Delete", cat);
        const res = await deleteAssetCategory({ categoryId: cat });
        console.log("Deleted", res);
        setOpen(true);
        if (res.msg) {
          setResp({ success: res.msg, error: "" });
          getCategories();
        } else if (res.error) {
          setResp({ success: "", error: res.error });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const save = async () => {
    try {
      if (tag === 1) {
        const result = await addCategoryMethod({
          category: tagMethod.category,
          method: tagMethod.method,
        });
        console.log("Result", result);
        if (result) {
          setOpen(true);
          if (result.msg) {
            setResp({ success: result.msg, error: "" });
            setTagMethod({
              category: null,
              method: null,
            });
            // getAllCategoryMethods();

            console.log("Added successfully");
          } else if (result.error) {
            console.log(result.error);
            setResp({ success: "", error: result.error });
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const allProductCategories = async () => {
    const res = await getAllCategories();
    console.log("All categories", res.data);
    setAllCategories(res.data);
  };
  const getAllBusinessTypes = async () => {
    try {
      const res = await allBusinessTypes();
      console.log("Business types", res);
      setAllCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getAllAssetCategories = async () => {
    try {
      const result = await allAssetCategory();
      console.log("Result", result);
      if (result.msg) {
        setAllCategories(result.data);
        // await setAllAssetCat(result.data);
      } else if (result.error) {
        console.log(result.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCategories = async () => {
    if (tag === 1) {
      allProductCategories();
    }
    if (tag === 2) {
      getAllBusinessTypes();
    }
    if (tag === 3) {
      getAllAssetCategories();
    }
  };

  useEffect(() => {
    getCategories();
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
          Categories
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
                console.log("Pr", e.target.value);
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
            Add Categories
          </Typography>
        </Box>
        <Box className="data">
          <Box className="sub-field">
            {/* <Typography>Add Fields</Typography> */}
            <Box className="row">
              <TextField
                id="category"
                size="small"
                label="Add Category"
                placeholder="Add  Categories here"
                variant="outlined"
                sx={{ minWidth: 300, marginTop: "8px" }}
                value={newCategory}
                onChange={(e) => {
                  setNewCategory(e.target.value);
                }}
              />

              <IconButton
                aria-label="add"
                sx={{ marginTop: "10px" }}
                onClick={addNewCategory}
              >
                <ControlPointIcon />
              </IconButton>
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
                  <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{ width: "100%" }}
                  >
                    {resp.error}
                  </Alert>
                )}
              </Snackbar>
            </Box>
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
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell>Category Name</StyledTableCell>

                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allCategories.map((row) => {
                  return (
                    <TableRow>
                      <StyledTableCell>{row.id}</StyledTableCell>
                      {editCat === row.id ? (
                        <StyledTableCell sx={{ width: 200 }}>
                          <TextField
                            id="update-category"
                            size="small"
                            label="Category Name"
                            // placeholder="Add  Categories here"
                            variant="outlined"
                            placeholder={row.category}
                            // value={updateCat}
                            sx={{ width: 300 }}
                            onChange={(e) => {
                              setUpdateCat(e.target.value);
                            }}
                            // error={error.name}
                            // helperText={error.name ? "Name is required" : ""}
                          />
                        </StyledTableCell>
                      ) : (
                        <StyledTableCell sx={{ width: 200 }}>
                          {row.category.charAt(0).toUpperCase() +
                            row.category.slice(1).toLowerCase()}
                        </StyledTableCell>
                      )}
                      {editCat === row.id ? (
                        <StyledTableCell align="right">
                          <SaveIcon
                            size="small"
                            sx={{
                              cursor: "pointer",
                              "&:hover": { color: "green" },
                            }}
                            onClick={() => {
                              updateCategory(row.id);
                            }}
                          />
                        </StyledTableCell>
                      ) : (
                        <>
                          <StyledTableCell align="right">
                            <EditIcon
                              size="small"
                              sx={{
                                cursor: "pointer",
                                "&:hover": { color: "blue" },
                              }}
                              onClick={() => {
                                setEditCat(row.id);
                              }}
                            />
                          </StyledTableCell>
                          <StyledTableCell>
                            <DeleteIcon
                              // color="red"
                              onClick={() => {
                                deleteCategory(row.id);
                              }}
                              size="small"
                              sx={{
                                cursor: "pointer",
                                marginLeft: "10px",
                                "&:hover": { color: "red" },
                              }}
                            />
                          </StyledTableCell>
                        </>
                      )}

                      {editCat === row.id ? (
                        <StyledTableCell>
                          <CancelOutlinedIcon
                            size="small"
                            sx={{
                              marginLeft: "10px",
                              cursor: "pointer",
                              "&:hover": { color: "grey" },
                            }}
                            onClick={() => {
                              setEditCat(null);
                            }}
                          />
                        </StyledTableCell>
                      ) : (
                        ""
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </div>
  );
};

export default CategorySettingsComp;
