import React from "react";
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
  Menu,
  Tooltip,
} from "@mui/material";
import {
  SpreadSheets,
  Worksheet,
  Column,
} from "@grapecity/spread-sheets-react";
import MuiAlert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import SaveIcon from "@mui/icons-material/Save";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useState, useEffect, useRef } from "react";
import useServices from "../../custom-hooks/use-Services";
import { CsvGenerator } from "./CsvGenerator";
import SpreadSheetModal from "../../modals/SpreadSheetModal";
import EditTemplateModal from "../../modals/EditTemplateModal";
import useTemplateServices from "../../custom-hooks/services/use-TemplateServices";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./Templates.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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

const Templates = () => {
  const [tag, setTag] = useState(1);
  const {
    createTemplate,
    getSingleTemplate,
    deleteSingleTemplate,
    updateTemplate,
  } = useTemplateServices();
  const { allTemplates } = useTemplateServices();
  const inputRef = useRef(null);
  const [edited, setEdited] = useState([]);
  const [newTemplate, setNewTemplate] = useState({ name: "", template: "" });
  const [templates, setTemplates] = useState([]);
  const [edit, setEdit] = useState(null);
  const [menu, setMenu] = useState(null);

  const [editTemplate, setEditTemplate] = useState(null);
  const [update, setUpdate] = useState(null);

  // const [field, setField] = useState({ "Product No": "", "Product Name": "" });
  const [field, setField] = useState(["Product No", "Product Name"]);
  const [data, setData] = useState({ id: null, template: [] });
  const [resp, setResp] = useState({ success: "", error: "" });
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [download, setDownload] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(false);
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    saveAs(data, fileName + fileExtension);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (row) => (event) => {
    setAnchorEl(event.currentTarget);
    setMenu(row);
  };
  const addColumn = (prop) => () => {
    const value = field.find((elem) => elem === menu);
    const newArray = [...field];

    // newArray[newArray.indexOf(value)] = event.target.value;
    if (prop === "right") {
      newArray.splice(
        newArray.indexOf(value) + 1,
        0,
        `New Col ${newArray.length - 1}`
      );
    }
    if (prop === "left") {
      newArray.splice(
        newArray.indexOf(value),
        0,
        `New Col ${newArray.length - 1}`
      );
    }

    // newArray.push(`New Col ${newArray.length - 1}`);
    // setField([...field,...newArray);
    setField(newArray);
    setAnchorEl(null);

    // console.log("col", menu);
  };
  const deleteColumn = () => {
    console.log("delete", menu);
    const value = field.find((elem) => elem === menu);
    const array = [...field];
    array.splice(array.indexOf(value), 1);
    setField(array);
    setAnchorEl(null);
    // setField(field.filter((item) => item === menu));
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const addField = async () => {
    let data = document.getElementById("column").value;
    console.log(data);
    document.getElementById("column").value = "";
    if (data === "") {
      return;
    }

    // await setField({ ...field, [data]: "" });
    await setField([...field, data]);
  };
  const saveTemplate = async () => {
    console.log("Template", newTemplate);
    document.getElementById("column").value = "";
    if (newTemplate.name.length === 0) {
      setError(true);
      return;
    }
    try {
      const result = await createTemplate({
        name: newTemplate.name,
        template: field,
        // template: Object.keys(field),
      });
      console.log("Result", result);
      if (result) {
        setOpen(true);

        setNewTemplate({ name: "", template: "" });
        if (result.msg) {
          if (result.errors) {
            await setResp({ success: "", error: "Validation error" });
          }

          await setResp({ success: result.msg, error: "" });
          setSaved(true);
        } else if (result.error) {
          console.log(result.error);
          await setResp({ success: "", error: result.error });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const updateTemplateName = async (temp_id) => {
    console.log("Update", temp_id, update);
    if (update.length !== 0) {
      try {
        const result = await updateTemplate({ id: temp_id, newName: update });
        if (result) {
          setOpen(true);
          setNewTemplate({ name: "", template: "" });
          if (result.msg) {
            setResp({ success: result.msg, error: "" });
            getAllTemplates();
            setUpdate("");
            setEditTemplate(null);
          } else if (result.error) {
            console.log(result.error);
            setResp({ success: "", error: result.error });
          }
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setOpen(true);
      setResp({ success: "", error: "Template name cannot be empty" });
    }
  };
  const deleteTemplate = async (temp_id) => {
    console.log(temp_id);
    if (temp_id !== null && temp_id !== undefined)
      try {
        const result = await deleteSingleTemplate({ id: temp_id });
        if (result) {
          setOpen(true);
          setNewTemplate({ name: "", template: "" });
          if (result.msg) {
            setResp({ success: result.msg, error: "" });
            console.log("Field on delete", field);
            // setField({ "Product No": "", "Product Name": "" });
            getAllTemplates();
          } else if (result.error) {
            console.log(result.error);
            setResp({ success: "", error: result.error });
          }
        }
      } catch (err) {
        console.log(err);
      }
  };

  const getAllTemplates = async () => {
    try {
      const result = await allTemplates();
      console.log("Result", result);
      if (result.msg) {
        setTemplates(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (props) => async (event) => {
    console.log("Change", props, event.target.value.length);
    // if (event.target.value.length === 0 || event.target.value === undefined) {
    //   setResp({ sucess: "", error: "Name cannot be empty" });
    // } else {
    if (event.target.value) {
      const value = field.find((elem) => elem === props);
      const newArray = [...field];
      newArray[newArray.indexOf(value)] = event.target.value;
      setEdited(newArray);
      console.log("Array", newArray);
    } else {
      setEdited(null);
      setResp({ success: "", error: "Empty" });
    }
    // }
  };
  const handleEdit = async (data) => {
    // setEdit(true);
    console.log(data);
  };
  // const handlePreview = async (data) => {
  //   console.log("Inside preview", data);
  //   // await setOpenModal(true);
  //   await setField(data);
  // };

  useEffect(() => {
    // setField({ "Product No": "", "Product Name": "" });
    // setField(["Product No", "Product Name"]);
    console.log("Tag", tag, field);
    getAllTemplates();
    if (tag === 1) {
      // setField({ "Product No": "", "Product Name": "" });
      setField(["Product No", "Product Name"]);
    }
    if (tag === 2) {
      setField(["Customer ID", "Customer Name"]);
    }
    if (tag === 3) {
      setField(["Asset ID", "Asset Name"]);
    }
    setSaved(false);
  }, [tag, saved]);

  return (
    <div>
      <EditTemplateModal
        open={openModal}
        data={data}
        onClose={(msg) => {
          setOpenModal(false);
          getAllTemplates();

          setOpen(true);
          if (msg === "success") {
            setResp({ success: "Template updated successfully", error: "" });
          } else if (msg === "error") {
            setResp({ success: "", error: "Template could not be updated" });
          } else {
            setOpen(false);
          }
        }}
      />
      {/* <SpreadSheetModal
        open={openModal}
        data={data}
        onClose={() => {
          setOpenModal(false);
          // console.log("Images", images);
        }}
      /> */}
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
            Create Tagging Template
          </Typography>
        </Box>
        <Box className="data">
          <Box className="sub-field">
            <FormControl sx={{ minWidth: 120, marginTop: 1 }}>
              <InputLabel id="tag-settings" size="small">
                Default Tagging Template
              </InputLabel>
              <Select
                size="small"
                labelId="tag"
                id="tag-list"
                placeholder="Select default template"
                value={tag}
                label="Default Tagging Template"
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
          <Box className="sub-field">
            <TextField
              id="template-name"
              size="small"
              label="Template Name"
              variant="outlined"
              placeholder="Add Template Name"
              value={newTemplate.name}
              sx={{ minWidth: 120, marginTop: "8px" }}
              onChange={(e) => {
                setError(false);
                setNewTemplate({
                  ...newTemplate,
                  ["name"]: e.target.value,
                });
              }}
              error={error}
              helperText={error ? "Name is required" : ""}
            />
          </Box>
        </Box>

        <Box className="data">
          <Box className="sub-field">
            <Box className="row">
              <TextField
                id="column"
                size="small"
                label="Template Field"
                variant="outlined"
                placeholder="Add Additional template fields here"
                //   value={e.target.value}
                sx={{ minWidth: 120, marginTop: "8px" }}
                //   onChange={(e) => {
                //     setField([...field, e.target.value]);
                //   }}
                // error={error.name}
                // helperText={error.name ? "Name is required" : ""}
              />

              <IconButton aria-label="add" sx={{ marginTop: "10px" }}>
                <ControlPointIcon onClick={addField} />
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
          {/* <Box className="sub-field">
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ marginTop: "10px", width: "30%" }}
              onClick={saveTemplate}
            >
              Save
            </Button>
          </Box> */}
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
            Template Preview
          </Typography>
        </Box>

        <div style={{ width: "100%", marginTop: "10px" }}>
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
                    {field.map((row) => {
                      return (
                        <StyledTableCell>
                          {edit === row ? (
                            <TextField
                              size="small"
                              variant="outlined"
                              color="grey"
                              focused
                              placeholder={row}
                              sx={{
                                height: "30px",
                                cursor: "pointer",
                              }}
                              onChange={handleChange(row)}
                              onKeyDown={(ev) => {
                                console.log(`Pressed keyCode ${ev.key}`);
                                if (ev.key === "Enter") {
                                  // Do code here
                                  ev.preventDefault();
                                  if (edited.length !== 0) {
                                    setField(edited);
                                  } else {
                                    setEdit(false);
                                  }
                                }
                              }}
                            ></TextField>
                          ) : (
                            <Box className="row">
                              <Tooltip title="Click to Edit">
                                <Typography
                                  onClick={() => {
                                    setEdit(row);
                                  }}
                                >
                                  {row}
                                </Typography>
                              </Tooltip>
                              <MoreVertIcon
                                id="basic-button"
                                aria-controls={
                                  openMenu ? "basic-menu" : undefined
                                }
                                aria-haspopup="true"
                                aria-expanded={openMenu ? "true" : undefined}
                                onClick={handleClick(row)}
                                size="small"
                                sx={{ marginLeft: "10px", cursor: "pointer" }}
                              />
                              <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={openMenu}
                                onClose={handleCloseMenu}
                                MenuListProps={{
                                  "aria-labelledby": "basic-button",
                                }}
                              >
                                <MenuItem onClick={addColumn("left")}>
                                  Add Column to Left
                                </MenuItem>
                                <MenuItem onClick={addColumn("right")}>
                                  Add Column to Right
                                </MenuItem>
                                <MenuItem onClick={deleteColumn}>
                                  Delete Column
                                </MenuItem>
                              </Menu>
                            </Box>
                          )}
                        </StyledTableCell>
                      );
                    })}
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow></StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          {/* <SpreadSheets
            backColor="aliceblue"
            showHorizontalScrollbar={true}
            rowCount={10}
            width="100%"
            height="100px"
            hostStyle={({ width: "100%" }, { height: 100 })}
          >
            <Worksheet
              // rows={10}
              name="Data"
              dataSource={[field]}
              width="100%"
              height="100%"
              // columnHeaderVisible={true}
              hostStyle={({ width: "100%" }, { height: 100 })}
            >
              <Column
                width={300}
                onClick={() => {
                  console.log("clicked");
                }}
              ></Column>
              <Column width={400}></Column>
            </Worksheet>
          </SpreadSheets> */}
          {/* <Box className="data"> */}
          <Box className="download">
            {/* <Box className="sub-field"> */}
            <Button
              variant="contained"
              color="inherit"
              size="small"
              sx={{ margin: "10px" }}
              onClick={() => {
                let dataObj = [];
                for (let i = 0; i < field.length; i++) {
                  dataObj.push({ [field[i]]: "" });
                }
                console.log("Data", dataObj);
                exportToCSV(dataObj, "Data");
              }}
            >
              Download
            </Button>
            {/* </Box>
            <Box className="sub-field"> */}
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ margin: "10px" }}
              onClick={saveTemplate}
            >
              Save
            </Button>
            {/* </Box> */}
          </Box>
          {/* </Box> */}

          {/* {download ? (
            // <CsvGenerator csvData={[field]} fileName="Data" />
          ) : (
           
          )} */}
        </div>
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
            All Templates
          </Typography>
        </Box>
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
                <StyledTableCell>Template ID</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Template Fields</StyledTableCell>

                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {templates.map((row) => {
                return (
                  <TableRow>
                    <StyledTableCell>{row.id}</StyledTableCell>
                    {editTemplate === row.id ? (
                      <StyledTableCell>
                        <TextField
                          id="name"
                          size="small"
                          label="Template Name"
                          variant="outlined"
                          placeholder={row.name}
                          value={update}
                          sx={{ minWidth: 120, marginTop: "8px" }}
                          onChange={(e) => {
                            setUpdate(e.target.value);
                          }}
                          // error={error}
                          // helperText={error ? "Name is required" : ""}
                        />
                      </StyledTableCell>
                    ) : (
                      <StyledTableCell>{row.name}</StyledTableCell>
                    )}

                    <StyledTableCell>
                      <Button
                        color="inherit"
                        variant="contained"
                        onClick={() => {
                          setData({ id: row.id, template: row.template });
                          setOpenModal(true);
                          // handlePreview(row.template);
                        }}
                      >
                        View Template
                      </Button>
                    </StyledTableCell>
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
                              updateTemplateName(row.id);
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
                        {/* <StyledTableCell></StyledTableCell> */}
                      </>
                    ) : (
                      <>
                        {row.name !== null ? (
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
                                deleteTemplate(row.id);
                              }}
                              size="small"
                              sx={{
                                cursor: "pointer",
                                marginLeft: "10px",
                                "&:hover": { color: "red" },
                              }}
                            />
                          </StyledTableCell>
                        ) : (
                          <StyledTableCell align="center">
                            <DeleteIcon
                              // color="red"
                              onClick={() => {
                                deleteTemplate(row.id);
                              }}
                              size="small"
                              sx={{
                                cursor: "pointer",
                                marginRight: "30px",
                                "&:hover": { color: "red" },
                              }}
                            />
                          </StyledTableCell>
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
                        size="small"
                        sx={{
                          cursor: "pointer",
                          marginLeft: "10px",
                          "&:hover": { color: "red" },
                        }}
                        onClick={() => {
                          deleteTemplate(row.id);
                        }}
                      />
                    </StyledTableCell> */}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default Templates;
