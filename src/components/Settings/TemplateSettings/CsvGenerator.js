import { Button } from "@mui/material";
import { Box } from "@mui/material";
// import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./Templates.css";

// import XlsxPopulate from "xlsx-populate";

export const CsvGenerator = ({ csvData, fileName }) => {
  console.log("Props", csvData, fileName);
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

  return (
    <Box className="download">
      <Box className="sub-field">
        <Button
          variant="contained"
          color="inherit"
          size="small"
          sx={{ marginTop: "20px", width: "30%" }}
          onClick={(e) => exportToCSV(csvData, fileName)}
        >
          Download Template
        </Button>
      </Box>
    </Box>
  );
};
