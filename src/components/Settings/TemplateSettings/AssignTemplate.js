import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
} from "@mui/material";

import SpreadSheetModal from "../../modals/SpreadSheetModal";

import { styled } from "@mui/material/styles";
import MuiAlert from "@mui/material/Alert";
import SaveIcon from "@mui/icons-material/Save";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { CsvGenerator } from "./CsvGenerator";
import "./AssignTemplate.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import useServices from "../../custom-hooks/use-Services";
import useTemplateServices from "../../custom-hooks/services/use-TemplateServices";
import useBusinessServices from "../../custom-hooks/services/use-BusinessServices";
import useAssetServices from "../../custom-hooks/services/use-AssetServices";
import useProductServices from "../../custom-hooks/services/use-ProductServices";
import { CircularProgress } from "@mui/material";

import PreviewIcon from "@mui/icons-material/Preview";

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

const AssignTemplate = () => {
  const {
    allProductCategoryMethods,
    addCategoryMethod,
    addCategoryTemplate,
    deleteCategoryTemplate,
    updateCategoryTemplate,
  } = useProductServices();
  const {
    allBusinessMethods,
    addBusinessMethod,
    addBusinessTemplate,
    deleteBusinessTemplate,
    updateBusinessTemplate,
  } = useBusinessServices();
  const {
    allAssetCategory,
    addAssetMethod,
    addAssetTemplate,
    deleteAssetTemplate,
    updateAssetTemplate,
  } = useAssetServices();
  const { allTemplates, getSingleTemplate } = useTemplateServices();
  const [template, setTemplate] = useState({
    category: null,
    templateId: null,
  });
  const [tag, setTag] = useState(1);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [resp, setResp] = useState({ success: "", error: "" });
  const [preview, setPreview] = useState({ id: null, template: [] });
  const [openModal, setOpenModal] = useState(false);
  const [allCatTemplates, setAllCatTemplates] = useState([]);
  const [savedTemplates, setSavedTemplates] = useState([]);
  const [editTemplate, setEditTemplate] = useState(null);
  const [update, setUpdate] = useState(null);
  const [error, setError] = useState({ category: false, template: false });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const getTemplate = async () => {
    console.log("Template", tag, template);
    if (editTemplate) {
      const result = await getSingleTemplate({
        templateId: update,
      });
      console.log(result);
      if (result.data) {
        await setPreview({
          ...preview,
          ["id"]: result.data.id,
          ["template"]: result.data.template,
        });
        await setOpenModal(true);
      }
    } else {
      const result = await getSingleTemplate({
        templateId: template.templateId,
      });
      console.log(result);
      if (result.data) {
        await setPreview({
          ...preview,
          ["id"]: result.data.id,
          ["template"]: result.data.template,
        });
        await setOpenModal(true);
      }
    }
  };
  const productTemplates = async () => {
    try {
      const result = await allProductCategoryMethods();
      setAllCatTemplates(result.data);
    } catch (err) {
      console.log(err);
    }
  };
  const businessTemplates = async () => {
    try {
      const result = await allBusinessMethods();
      setAllCatTemplates(result.data);
    } catch (err) {
      console.log(err);
    }
  };
  const assetTemplates = async () => {
    try {
      const result = await allAssetCategory();
      setAllCatTemplates(result.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getCategoryTemplates = async () => {
    setTemplate({ category: null, templateId: null });
    setAllCatTemplates([]);
    if (tag === 1) {
      productTemplates();
    }
    if (tag === 2) {
      businessTemplates();
    }
    if (tag === 3) {
      assetTemplates();
    }
  };
  const getTemplates = async () => {
    const result = await allTemplates();
    setSavedTemplates(result.data);
  };
  const saveTemplate = async () => {
    console.log("Template", template);
    const validate = {
      category: false,
      template: false,
    };
    if (template.category === null) {
      validate.category = true;
    }
    if (template.templateId === null) {
      validate.template = true;
    }
    if (validate.template === false && validate.category === false) {
      setLoading(true);
      if (tag === 1) {
        try {
          const result = await addCategoryTemplate(template);
          setOpen(true);
          if (result.msg) {
            setResp({ success: result.msg, error: "" });
            getCategoryTemplates();
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
          const result = await addBusinessTemplate(template);
          setOpen(true);
          if (result.msg) {
            setResp({ success: result.msg, error: "" });
            getCategoryTemplates();
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
          const result = await addAssetTemplate(template);
          setOpen(true);
          if (result.msg) {
            setResp({ success: result.msg, error: "" });
            getCategoryTemplates();
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
  const updateTemplate = async (cat_id) => {
    console.log("Update", cat_id, update);
    if (tag === 1) {
      try {
        const result = await updateCategoryTemplate({
          id: cat_id,
          tempId: update,
        });
        setOpen(true);
        if (result.msg) {
          setResp({ success: result.msg, error: "" });
          getCategoryTemplates();
          setEditTemplate(null);
          setUpdate(null);
          setLoading(false);
        } else if (result.error) {
          setResp({ success: "", error: result.error });
          setEditTemplate(null);
          setUpdate(null);
          setLoading(false);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    if (tag === 2) {
      try {
        const result = await updateBusinessTemplate({
          id: cat_id,
          tempId: update,
        });
        setOpen(true);
        if (result.msg) {
          setResp({ success: result.msg, error: "" });
          getCategoryTemplates();
          setEditTemplate(null);
          setUpdate(null);
          setLoading(false);
        } else if (result.error) {
          setResp({ success: "", error: result.error });
          setEditTemplate(null);
          setUpdate(null);
          setLoading(false);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    if (tag === 3) {
      try {
        const result = await updateAssetTemplate({
          id: cat_id,
          tempId: update,
        });
        setOpen(true);
        if (result.msg) {
          setResp({ success: result.msg, error: "" });
          getCategoryTemplates();
          setEditTemplate(null);
          setUpdate(null);
          setLoading(false);
        } else if (result.error) {
          setResp({ success: "", error: result.error });
          setEditTemplate(null);
          setUpdate(null);
          setLoading(false);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const deleteTagTemplate = async (temp_id, temp_method) => {
    console.log("Delete", temp_id);
    if (temp_id !== null && temp_method !== null) {
      if (tag === 1) {
        try {
          const result = await deleteCategoryTemplate({ id: temp_id });
          setOpen(true);
          if (result.msg) {
            setResp({ success: result.msg, error: "" });
            getCategoryTemplates();
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
          const result = await deleteBusinessTemplate({ id: temp_id });
          setOpen(true);
          if (result.msg) {
            setResp({ success: result.msg, error: "" });
            getCategoryTemplates();
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
          const result = await deleteAssetTemplate({ id: temp_id });
          setOpen(true);
          if (result.msg) {
            setResp({ success: result.msg, error: "" });
            getCategoryTemplates();
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
      setResp({ success: "", error: "No Template  to delete" });
    }
  };
  useEffect(() => {
    getTemplates();
    getCategoryTemplates();
  }, [tag]);
  return (
    <>
      <SpreadSheetModal
        open={openModal}
        data={preview}
        onClose={() => {
          setOpenModal(false);
          // console.log("Images", images);
        }}
      />
      <div className="main-container">
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{ fontSize: 12, marginTop: 0 }}
        >
          <Link underline="hover" color="inherit">
            Trace N Track
          </Link>
          <Link underline="hover" color="inherit">
            Settings
          </Link>
          <Link
            underline="hover"
            color="primary"
            aria-current="page"
            href="/settings"
          >
            Tagging Method
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
                label="Tag"
                onChange={(e) => {
                  setTag(e.target.value);

                  console.log("Pr", e.target.value);
                }}
              >
                <MenuItem value={1}>Product</MenuItem>
                <MenuItem value={2}>Customer Location</MenuItem>
                <MenuItem value={3}>Asset</MenuItem>
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
              Add Tagging Template
            </Typography>
          </Box>
          {loading ? (
            <Box className="loader">
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Box className="data">
                <Box className="sub-field">
                  <FormControl sx={{ minWidth: 120, marginTop: 1 }}>
                    <InputLabel id="category" size="small">
                      Category
                    </InputLabel>
                    <Select
                      size="small"
                      labelId="category"
                      id="category-list"
                      placeholder="category"
                      // value={productMethod.category}
                      // key={e.target.value}
                      value={template.category}
                      error={error.category}
                      label="Category"
                      onChange={(e) => {
                        setError({ ...error, ["category"]: false });
                        setTemplate({
                          ...template,
                          ["category"]: e.target.value,
                        });
                      }}
                    >
                      {allCatTemplates.map((row) => {
                        return (
                          <MenuItem value={row.id}>
                            {" "}
                            {row.category.charAt(0).toUpperCase() +
                              row.category.slice(1).toLowerCase()}
                          </MenuItem>
                        );
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
                      Tagging Template
                    </InputLabel>
                    <Select
                      size="small"
                      labelId="tag-method"
                      id="tag-method-list"
                      placeholder="Select Tag Setting for"
                      label="Tagging Template"
                      value={template.templateId}
                      error={error.template}
                      onChange={(e) => {
                        setError({ ...error, ["template"]: false });
                        setTemplate({
                          ...template,
                          ["templateId"]: e.target.value,
                        });
                      }}
                    >
                      {savedTemplates.map((row) => {
                        return <MenuItem value={row.id}>{row.name}</MenuItem>;
                      })}
                    </Select>
                    {error.template && (
                      <FormHelperText sx={{ color: "#d32f2f" }}>
                        required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Box>
                <Box className="subfield">
                  <PreviewIcon
                    sx={{
                      marginTop: "30px",
                      marginRight: "30px",
                      cursor: "pointer",
                    }}
                    align="center"
                    onClick={() => {
                      getTemplate();
                    }}
                  />
                </Box>
                <Box className="sub-field">
                  <Button
                    variant="contained"
                    sx={{ marginTop: 1, width: "30%" }}
                    onClick={saveTemplate}
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
                        <StyledTableCell>Tagging Template</StyledTableCell>

                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody>
                      {allCatTemplates.map((row) => {
                        return (
                          <StyledTableRow>
                            <StyledTableCell>{row.id}</StyledTableCell>
                            <StyledTableCell>
                              {row.category.charAt(0).toUpperCase() +
                                row.category.slice(1).toLowerCase()}
                            </StyledTableCell>
                            {editTemplate === row.id ? (
                              <StyledTableCell>
                                <FormControl sx={{ minWidth: 150 }}>
                                  <InputLabel id="tag-template" size="small">
                                    Template
                                  </InputLabel>
                                  <Select
                                    size="small"
                                    labelId="tag-template"
                                    id="tag-template-list"
                                    placeholder={row.templateName}
                                    label="Template"
                                    value={update}
                                    // error={error.method}
                                    onChange={(e) => {
                                      setUpdate(e.target.value);
                                      // setTemplate({
                                      //   ...template,
                                      //   ["templateId"]: e.target.value,
                                      // });
                                    }}
                                  >
                                    {savedTemplates.map((row) => {
                                      return (
                                        <MenuItem value={row.id}>
                                          {row.name}
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

                                <PreviewIcon
                                  sx={{
                                    marginTop: "10px",
                                    // marginRight: "30px",
                                    cursor: "pointer",
                                  }}
                                  align="center"
                                  onClick={() => {
                                    getTemplate();
                                  }}
                                />
                              </StyledTableCell>
                            ) : (
                              <StyledTableCell>
                                {row.templateName}
                              </StyledTableCell>
                            )}
                            {/* <StyledTableCell>
                              {row.templateName}
                            </StyledTableCell> */}
                            {editTemplate === row.id ? (
                              <>
                                <StyledTableCell>
                                  <SaveIcon
                                    size="small"
                                    sx={{
                                      cursor: "pointer",
                                      "&:hover": { color: "green" },
                                    }}
                                    onClick={() => {
                                      updateTemplate(row.id);
                                    }}
                                  />
                                  <CancelOutlinedIcon
                                    size="small"
                                    sx={{
                                      marginLeft: "10px",
                                      cursor: "pointer",
                                      "&:hover": { color: "grey" },
                                    }}
                                    onClick={() => {
                                      setEditTemplate(null);
                                    }}
                                  />
                                </StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                              </>
                            ) : (
                              <>
                                {row.template !== null ? (
                                  <>
                                    <StyledTableCell>
                                      <EditIcon
                                        size="small"
                                        sx={{
                                          cursor: "pointer",
                                          "&:hover": { color: "blue" },
                                        }}
                                        onClick={() => {
                                          setEditTemplate(row.id);
                                        }}
                                      />
                                      <DeleteIcon
                                        // color="red"
                                        onClick={() => {
                                          deleteTagTemplate(
                                            row.id,
                                            row.templateId
                                          );
                                        }}
                                        size="small"
                                        sx={{
                                          cursor: "pointer",
                                          marginLeft: "10px",
                                          "&:hover": { color: "red" },
                                        }}
                                      />
                                    </StyledTableCell>
                                    <StyledTableCell></StyledTableCell>
                                  </>
                                ) : (
                                  <>
                                    <StyledTableCell align="center">
                                      <DeleteIcon
                                        // color="red"
                                        onClick={() => {
                                          deleteTagTemplate(
                                            row.id,
                                            row.templateId
                                          );
                                        }}
                                        size="small"
                                        sx={{
                                          cursor: "pointer",
                                          marginRight: "30px",
                                          "&:hover": { color: "red" },
                                        }}
                                      />
                                    </StyledTableCell>
                                    <StyledTableCell></StyledTableCell>
                                  </>
                                )}
                              </>
                            )}

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
                                  deleteTagTemplate(row.id, row.templateId);
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
            </>
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
      </div>
    </>
  );
};

export default AssignTemplate;
