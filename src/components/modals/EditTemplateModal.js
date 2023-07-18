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
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useTemplateServices from "../custom-hooks/services/use-TemplateServices";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 300,
  bgcolor: "background.paper",
  borderRadius: "6px ",
  border: "1px solid transparent",
  // boxShadow: 24,
  p: 4,
};

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
// componentWillReceiveProps=(newProps)= {
//     console.log("new props",newProps)
//     // setField(newProps);
// }

export default function EditTemplateModal(props) {
  console.log("Props in modal", props);
  const { updateTemplateDetails } = useTemplateServices();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [field, setField] = useState([]);
  const [menu, setMenu] = useState(null);
  const [edited, setEdited] = useState([]);
  const [resp, setResp] = useState({ success: "", error: "" });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (row) => (event) => {
    setAnchorEl(event.currentTarget);
    setMenu(row);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
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
  };

  const handleChange2 = (props) => async (event) => {
    console.log("Change", props, event.target.value.length);
    // if (event.target.value.length === 0 || event.target.value === undefined) {
    //   setResp({ sucess: "", error: "Name cannot be empty" });
    // } else {
    if (event.target.value) {
      //   const value = field.find((elem) => elem === props);
      const newArray = [...field];
      newArray[props] = event.target.value;
      //   newArray[newArray.indexOf(value)] = event.target.value;
      setEdited(newArray);
      console.log("Array", newArray);
    } else {
      setEdited(null);
      setResp({ success: "", error: "Empty" });
    }
    // }
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
  const handleSave = async () => {
    console.log("In save", field);
    try {
      const result = await updateTemplateDetails({
        id: props.data.id,
        template: field,
      });
      console.log("Result", result);
      if (result) {
        if (result.msg) {
          setField([]);
          setEdited([]);
          props.onClose("success");
        } else if (result.error) {
          console.log(result.error);
          setField([]);
          setEdited([]);
          props.onClose("error");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  useEffect(() => {
    if (props.open) {
      setField([...props.data.template]);
    }
  }, [props.open]);
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.onClose}
        // onBackdropClick={() => setOpen(false)}
        // onClose={setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
                    {field.map((row, index) => {
                      return (
                        <StyledTableCell>
                          {edit === index ? (
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
                              onChange={handleChange2(index)}
                              onKeyDown={(ev) => {
                                console.log(`Pressed keyCode ${ev.key}`);
                                if (ev.key === "Enter") {
                                  // Do code here
                                  ev.preventDefault();
                                  if (edited) {
                                    setField(edited);
                                    setEdit(null);
                                    // console.log("Edited", edited, field);
                                  } else {
                                    setEdit(null);
                                  }
                                }
                              }}
                            ></TextField>
                          ) : (
                            <Box className="row">
                              <Tooltip title="Click to Edit">
                                <Typography
                                  onClick={() => {
                                    // setEdit(row);
                                    setEdit(index);
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
                    <StyledTableCell>
                      {" "}
                      <SaveIcon
                        size="small"
                        sx={{
                          marginTop: "10px",
                          cursor: "pointer",
                          "&:hover": { color: "green" },
                        }}
                        onClick={handleSave}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow></StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

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
      </Modal>
    </div>
  );
}
