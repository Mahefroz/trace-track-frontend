import React from "react";
import "./TagBulkCustomers.css";
import { useEffect, useState, useMemo } from "react";
import {
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
  Typography,
  TextField,
  Button,
  Box,
  Breadcrumbs,
  Snackbar,
  Link,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  Paper,
  TableCell,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DownloadIcon from "@mui/icons-material/Download";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import MuiAlert from "@mui/material/Alert";
import useLocationServices from "../../custom-hooks/services/use-LocationServices";

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
const TagBulkCustomers = () => {
  const { getExcelTemplate } = useLocationServices();
  const [open, setOpen] = useState(false);
  const [resp, setResp] = useState({ success: "", error: "" });
  const [csvData, setCsvData] = useState([]);
  const [data, setData] = useState({ rows: [], cols: [] });
  const fileInput = React.useRef();
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const uploadFile = (e) => {
    e.preventDefault();

    var files = e.target.files,
      f = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      var data = e.target.result;
      let readedData = XLSX.read(data, { type: "binary" });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];

      const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log("Data uploaded", dataParse);
      let fields = dataParse[0];
      let records = dataParse.slice(1);

      let keys = [];
      csvData.map((row) => {
        keys.push(...Object.keys(row));
      });
      // if(fields.includes(keys))
      setData({ rows: records, cols: fields });
      console.log("Keys", keys);
      // console.log("Keys", Object.keys(csvData[0]));
    };
    reader.readAsBinaryString(f);
  };

  const getTemplate = async () => {
    const excelTemplate = await getExcelTemplate();
    setCsvData(excelTemplate.data);
  };
  const exportToCSV = (fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    saveAs(data, fileName + fileExtension);
  };
  useEffect(() => {
    getTemplate();
  }, []);
  return (
    <div className="main-container">
      <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: 12, marginTop: 0 }}>
        <Link underline="hover" color="inherit">
          Trace N Track
        </Link>
        <Link underline="hover" color="inherit">
          Tag
        </Link>
        <Link underline="hover" color="inherit">
          Tag Customer Location
        </Link>
        <Link
          underline="hover"
          color="primary"
          aria-current="page"
          href="/tagBusiness"
        >
          Add Bulk Customers
        </Link>
      </Breadcrumbs>
      <Box className="section">
        <Box className="data">
          <Box className="sub-field">
            <input
              ref={fileInput}
              name="Upload File"
              accept=".csv,.xlsx"
              type="file"
              onChange={uploadFile}
              onClick={(e) => {
                e.target.value = "";
              }}
              style={{ display: "none" }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ height: "100%" }}
              endIcon={<FileUploadIcon />}
              onClick={() => fileInput.current.click()}
            >
              Upload File
            </Button>
          </Box>
          <Box className="sub-field">
            <Button
              size="small"
              variant="outlined"
              color="primary"
              sx={{ height: "100%" }}
              endIcon={<DownloadIcon />}
              onClick={() => exportToCSV("Bulk Upload Customers")}
            >
              Download Template
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
                  {data?.cols?.map((col) => {
                    return <StyledTableCell>{col}</StyledTableCell>;
                  })}
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {data?.rows?.map((row) => {
                  return (
                    <StyledTableRow>
                      {row.map((r) => {
                        return <StyledTableCell>{r}</StyledTableCell>;
                      })}
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box className="btn-field">
          <Box className="submit">
            {data?.rows.length !== 0 ? (
              <Button
                variant="contained"
                color="success"
                sx={{ marginLeft: "20px !important" }}
              >
                Save
              </Button>
            ) : (
              ""
            )}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default TagBulkCustomers;
