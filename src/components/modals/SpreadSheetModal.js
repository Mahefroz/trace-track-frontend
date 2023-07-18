import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  tableCellClasses,
  TextField,
  Button,
  Snackbar,
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
import useTemplateServices from "../custom-hooks/services/use-TemplateServices";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: "6px",
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

export default function SpreadSheetModal(props) {
  const { getSingleTemplate, updateTemplateDetails } = useTemplateServices();
  console.log("Props in modal", props);
  const [field, setField] = useState();
  const [editTemplate, setEditTemplate] = useState(false);
  const [values, setValues] = useState(props.data.template);
  const [resp, setResp] = useState({ success: "", error: "" });
  const [open, setOpen] = useState(false);

  const getTemplate = async () => {
    const template = await getSingleTemplate({ templateId: props.data.id });
    console.log("Result", template.data);
    await setField(template.data.template);
  };
  const handleChange = (props) => (e) => {
    const field = [...values];
    console.log("Inside", props, e.target.value, field);

    field[props] = e.target.value;
    setValues(field);
    console.log("Inside", field);
  };

  const handleSave = async () => {
    console.log("Values", values);
    try {
      const result = await updateTemplateDetails({
        id: props.data.id,
        template: values,
      });
      if (result.msg) {
        await setResp({ success: result.msg, error: "" });
      } else if (result.error) {
        console.log(result.error);
        await setResp({ success: "", error: result.error });
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
  // console.log("Values", values);
  useEffect(() => {}, []);
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
                  <StyledTableCell>Template Details</StyledTableCell>
                  {props.data.template.map((row) => {
                    return <StyledTableCell></StyledTableCell>;
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  {editTemplate ? (
                    <>
                      {props.data.template.map((row, index) => {
                        return (
                          <>
                            <StyledTableCell>
                              <TextField
                                id="field"
                                size="small"
                                label="Field"
                                variant="outlined"
                                placeholder={row}
                                // value={newTemplate.name}
                                sx={{ minWidth: 120, marginTop: "8px" }}
                                onChange={handleChange(index)}
                              />
                            </StyledTableCell>
                          </>
                        );
                      })}
                      <StyledTableCell align="center">
                        <SaveIcon
                          size="small"
                          sx={{
                            marginTop: "10px",
                            cursor: "pointer",
                            "&:hover": { color: "green" },
                          }}
                          onClick={handleSave}
                        />
                        <CancelOutlinedIcon
                          size="small"
                          sx={{
                            marginLeft: "10px",
                            marginTop: "10px",
                            cursor: "pointer",
                            "&:hover": { color: "grey" },
                          }}
                          onClick={() => {
                            setEditTemplate(false);
                          }}
                        />
                      </StyledTableCell>
                    </>
                  ) : (
                    <>
                      {props.data.template.map((row) => {
                        return <StyledTableCell>{row}</StyledTableCell>;
                      })}
                    </>
                  )}
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
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
          {/* <div style={{ width: "100%", marginTop: "10px" }}>
            {console.log("Field", field)}
            <SpreadSheets
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
                dataSource={[props.data]}
                width="100%"
                height="100px"
                columnHeaderVisible={true}
                hostStyle={({ width: "100%" }, { height: 100 })}
              >
                <Column width={300}></Column>
                <Column width={400}></Column>
              </Worksheet>
            </SpreadSheets>
          </div> */}
        </Box>
      </Modal>
    </div>
  );
}
