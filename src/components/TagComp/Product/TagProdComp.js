import React from "react";
import "./TagProdComp.css";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import {
  Box,
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
import { styled } from "@mui/material/styles";
import MuiAlert from "@mui/material/Alert";
import BarcodeComp from "../../TaggingMethods/BarcodeComp";
import * as XLSX from "xlsx";
import useProductServices from "../../custom-hooks/services/use-ProductServices";
import CircularProgress from "@mui/material/CircularProgress";
import PromptModal from "../../modals/PromptModal";

import {
  generateQR,
  download,
  downloadBarcode,
} from "../../TaggingMethods/QrBarcode";
import "./TagProdComp.css";

import { useState, useEffect } from "react";
import { DataGrid, useGridApiRef, GridToolbar } from "@mui/x-data-grid";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TagProdComp = () => {
  const {
    getAllCategories,
    addCategoryData,
    getCurrentSerialNo,
    getCurrentBatchNo,
  } = useProductServices();
  const fileInput = React.useRef();
  const apiRef = useGridApiRef();
  const [text, setText] = useState("");
  const [fileLoaded, setFileLoaded] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [resp, setResp] = useState({ success: "", error: "" });
  const [openModal, setOpenModal] = useState(false);
  const [save, setSave] = useState(false);
  const [category, setCategory] = useState({
    category: null,
    method: null,
    template: null,
    serialNo: null,
    batchNo: null,
  });
  const [categories, setCategories] = useState([]);

  const [uploaded, setUploaded] = useState({ rows: [], cols: [] });
  const [updatedState, setUpdatedState] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const createData = (no, name, desc, qty, price, mfg, exp) => {
    return { no, name, desc, qty, price, mfg, exp };
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
      console.log("Data", dataParse);

      let cols = [];
      let headers = [];
      let allRows = [];
      dataParse[0].map((data) => {
        return cols.push({
          field: data,
          headerName: data,
          width: 250,
          editable: true,
          headerClassName: "grid-header",
        });
      });
      cols.push({
        field: "Date",
        headerName: "Date",
        width: 150,
        editable: true,
      });

      if (category.method === 1) {
        cols.push(
          // {
          //   field: "QR",
          //   headerName: "QR",
          //   width: 250,
          //   editable: true,
          //   headerClassName: "grid-header",
          //   renderCell: (params) => {
          //     console.log("Params in qr", params);
          //     if (params.row.QR === "Generated") {
          //       return (
          //         <img src="./check.png" width="20px" height="20px" />
          //         // <Typography sx={{ color: "green" }}>
          //         //   {params.row.QR}
          //         // </Typography>
          //       );
          //     }
          //   },
          // },
          {
            field: "Image",
            headerName: "Image",
            width: 150,
            editable: true,
            renderCell: (params) => {
              console.log("Params", params);
              // return params.value.icon;
              if (params.row.Image !== "") {
                return (
                  <>
                    <Tooltip title="Click to download">
                      <img
                        src={params.row.Image}
                        onClick={() => {
                          download(params.row.Image);
                        }}
                        height="50px"
                        width="50px"
                      />
                    </Tooltip>
                  </>
                );
              } else {
                return <img src="" height="10px" width="10px" />;
              }
            },
          }
        );
      } else if (category.method === 2) {
        cols.push(
          // {
          //   field: "Barcode",
          //   headerName: "Barcode",
          //   width: 250,
          //   editable: true,
          //   headerClassName: "grid-header",
          //   renderCell: (params) => {
          //     console.log("Params in Barcode", params);
          //     if (params.row.Barcode === "Generated") {
          //       return (
          //         <img src="./check.png" width="20px" height="20px" />
          //         // <Typography sx={{ color: "green" }}>
          //         //   {params.row.QR}
          //         // </Typography>
          //       );
          //     }
          //   },
          // },
          {
            field: "Image",
            headerName: "Image",
            width: 150,
            editable: true,
            renderCell: (params) => {
              console.log("Params on image", params);
              // return params.value.icon;
              if (params.row.Image !== "") {
                return (
                  <>
                    {console.log("Barcode params", params.row.Image)}
                    <BarcodeComp
                      data={params.row.Image}
                      link="http://localhost:3000"
                      // onUpload={async (img) => {
                      //   setTag({ ...tag, ["bc"]: img });
                      //   setError({ ...error, ["bc"]: false });
                      // }}
                    />
                    {/* <Barcode value={JSON.stringify(params.row.Image)} /> */}
                  </>
                );
              }
            },
          }
        );
      } else if (category.method === 3) {
        cols.push({
          field: "Serial No",
          headerName: "Serial No",
          width: 250,
          editable: true,
          headerClassName: "grid-header",
        });
      } else if (category.method === 4) {
        cols.push({
          field: "Batch No",
          headerName: "Batch No",
          width: 250,
          editable: true,
          headerClassName: "grid-header",
        });
      }

      dataParse[0].map((data) => {
        return headers.push(data);
      });
      console.log("Headers", headers);
      if (!headers.includes("Batch Quantity") && category.method === 4) {
        setOpen(true);
        return setResp({ success: "", error: "Batch Quantity field required" });
      }
      dataParse.slice(1).map((subrow, subindex) => {
        let obj = [];
        allRows.push(obj);
        return subrow.map((rows, index) => {
          if (index === 0) {
            return obj.push({ ...obj, [headers[index]]: rows });
          } else {
            return (obj[obj.length - 1] = {
              ...obj[obj.length - 1],
              [headers[index]]: rows,
            });
          }
        });
      });
      let newRows = [];
      allRows.map((row, index) => {
        return newRows.push(row[0]);
      });
      newRows.map((row, index) => {
        return (newRows[index] = {
          ...newRows[index],
          ["id"]: index,
          ["Date"]: Date.now(),
        });
      });

      if (category.method === 1) {
        newRows.map(async (row, index) => {
          const qr = await generateQR(row);
          console.log("QR generated in col", qr);
          return (newRows[index] = {
            ...newRows[index],
            ["Image"]: qr,
          });
        });
        // newRows.map((row, index) => {
        //   return (newRows[index] = {
        //     ...newRows[index],
        //     ["Image"]: "",
        //   });
        // });
        // newRows.map((row, index) => {
        //   return (newRows[index] = {
        //     ...newRows[index],
        //     ["QR"]: "Generate QR",
        //   });
        // });
      } else if (category.method === 2) {
        newRows.map((row, index) => {
          let newData = row;
          delete newData.Barcode;
          delete newData.Image;
          return (newRows[index] = {
            ...newRows[index],
            ["Image"]: JSON.stringify(newData),
          });
        });
        // newRows.map((row, index) => {
        //   return (newRows[index] = {
        //     ...newRows[index],
        //     ["Barcode"]: "Generate Barcode",
        //   });
        // });
      } else if (category.method === 3) {
        newRows.map((row, index) => {
          let newNo = index + 1;
          return (newRows[index] = {
            ...newRows[index],
            ["Serial No"]: category.serialNo + newNo,
          });
        });
      } else if (category.method === 4) {
        newRows.map((row, index) => {
          let newNo = index + 1;
          return (newRows[index] = {
            ...newRows[index],
            ["Batch No"]: category.batchNo + newNo,
          });
        });
      }

      console.log("All Rows", allRows);
      console.log("New Rows", newRows);
      setUploaded({ rows: newRows, cols: cols });
      setFileLoaded(true);
    };

    reader.readAsBinaryString(f);
  };
  console.log("Uploaded", uploaded);

  const handleEvent = async (params) => {
    console.log("Cell clicked", params);

    let data = params.row;
    if (category.method === 1 && params.field === "QR") {
      console.log("Cell clicked", data);
      const qr = await generateQR(data);
      console.log("Qr", qr, uploaded);
      console.log("get uploaded", uploaded.rows[data.id].QR, qr, data.id);
      let newRow = uploaded.rows[data.id];
      newRow.Image = qr;
      newRow.QR = "Generated";
      // let updatedArr = uploaded.rows;
      let updatedArr = uploaded.rows.map((item, index) => {
        if (index == data.id) {
          console.log("updated array 1 --->", data.id);
          return newRow;
        } else {
          return item;
        }
      });
      // updatedArr[data.id] = newRow;
      console.log("updated array -->", updatedArr);
      setUploaded({ ...uploaded, rows: updatedArr });

      // setUploaded(...u{ ...uploaded.rows[data.id], ["QR"]: <img src={qr} /> });
    }
    if (category.method === 2 && params.field === "Barcode") {
      console.log("Cell clicked", data);
      // const qr = await generateQR(data);
      // console.log("Qr", qr, uploaded);
      // console.log("get uploaded", uploaded.rows[data.id].QR, qr, data.id);
      let newRow = uploaded.rows[data.id];
      let newData = data;
      delete newData.Barcode;
      delete newData.Image;
      newRow.Image = JSON.stringify(newData);
      newRow.Barcode = "Generated";
      // let updatedArr = uploaded.rows;
      let updatedArr = uploaded.rows.map((item, index) => {
        if (index == data.id) {
          console.log("updated array 1 --->", data.id);
          return newRow;
        } else {
          return item;
        }
      });
      // updatedArr[data.id] = newRow;
      console.log("updated array -->", updatedArr);
      setUploaded({ ...uploaded, rows: updatedArr });

      // setUploaded(...u{ ...uploaded.rows[data.id], ["QR"]: <img src={qr} /> });
    }
  };
  console.log("Uploaded", uploaded);
  const handleSave = async () => {
    // setLoading(true);

    console.log(
      "Updated state",
      updatedState,
      uploaded,
      updatedState.rows.dataRowIdToModelLookup
    );

    console.log({
      rows: [updatedState.rows.dataRowIdToModelLookup],
      cols: [updatedState.columns.orderedFields],
    });

    let no_rows = uploaded.rows.length;

    setText(
      `You are about to add ${no_rows} records of data. Are you sure you want to continue?`
    );
    setOpenModal(true);

    // if (category.method === 1 || category.method === 2) {
    //   uploaded.rows.map((row) => {
    //     if (row.Image.length === 0) {
    //       setText(
    //         "Tag Images not generated for all Products.Are you sure you want to continue?"
    //       );
    //       setOpenModal(true);

    //       // setOpen(true);
    //       // setResp({ success: "", error: "Not all Images generated" });
    //     }
    //   });
    // } else {
    //   saveData();
    // }
  };
  const saveData = async () => {
    try {
      let updatedRows = [];
      for (let i = 0; i < updatedState.rows.dataRowIds.length; i++) {
        updatedRows.push(updatedState.rows.dataRowIdToModelLookup[i]);
      }
      const result = await addCategoryData({
        categoryId: category.category,
        data: {
          rows: updatedRows,
          cols: updatedState.columns.orderedFields,
        },
      });
      setOpen(true);
      if (result.msg || result.data) {
        setResp({ success: result.msg, error: "" });
        setFileLoaded(false);
        setUploaded({ rows: [], cols: [] });
        console.log("Category Id on save", category.category);
        const sno = await getCurrentSerialNo({
          categoryId: category.category,
        });
        const batchno = await getCurrentBatchNo({
          categoryId: category.category,
        });
        setCategory({
          ...category,
          ["serialNo"]: sno.data,
          ["batchNo"]: batchno.data,
        });
        setSave(false);

        // setLoading(false);
      } else if (result.error) {
        setResp({ success: "", error: result.error });
        setSave(false);
        // setLoading(false);
        // setLoading(false);
      }
      // setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const allCategories = async () => {
    const res = await getAllCategories();
    setCategories(res.data);
  };
  useEffect(() => {
    allCategories();
  }, []);

  return (
    <>
      <PromptModal
        open={openModal}
        text={text}
        save={(value) => {
          console.log("Modal save", value);
          if (value === true) {
            saveData();
          }
          setOpenModal(false);
        }}
        onClose={() => {
          setOpenModal(false);
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
            Tag
          </Link>
          <Link
            underline="hover"
            color="primary"
            aria-current="page"
            href="/tagProduct"
          >
            Tag Product
          </Link>
        </Breadcrumbs>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", top: "50%" }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <div className="section">
              {/* <div className="heading">
              <img src="./packaging.png" height={20} width={20} />
              <Typography
                sx={{
                  fontWeight: "bold",
                  marginLeft: "10px",
                  //  fontSize: 20, marginTop: "20px"
                }}
              >
                Add Products
              </Typography>
            </div> */}
              <Box className="data">
                <Box className="sub-field">
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
                      // value={method.method}
                      // error={error.method}
                      onChange={(e) => {
                        if (fileLoaded) {
                          setUploaded({ rows: [], cols: [] });
                          setFileLoaded(false);
                        }
                        console.log("Data", e.target.value);
                        const data = e.target.value;

                        if (data.method === null) {
                          setCategory({
                            ...category,
                            ["method"]: 0,
                          });
                        } else if (data.method !== null) {
                          setCategory({
                            ...category,
                            ["category"]: data.id,
                            ["method"]: data.method,
                            ["serialNo"]: data.serialNo,
                            ["batchNo"]: data.batchNo,
                          });
                        }
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
                <Box className="sub-field">
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

                <div className="btn">
                  {category.method === null || category.method === 0 ? (
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{ height: "100%" }}
                      disabled
                      endIcon={
                        <img src="./excel-icon.png" width={20} height={20} />
                      }
                      onClick={() => fileInput.current.click()}
                    >
                      Upload Excel File
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{ height: "100%" }}
                      endIcon={
                        <img src="./excel-icon.png" width={20} height={20} />
                      }
                      onClick={() => fileInput.current.click()}
                    >
                      Upload Excel File
                    </Button>
                  )}

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
                </div>
              </Box>

              <Box
                sx={{
                  height: 370,
                  width: "100%",
                  "& .grid-header": {},
                  // disable cell selection style
                  ".MuiDataGrid-cell:focus": {
                    outline: "none",
                  },
                  // pointer cursor on ALL rows
                  "& .MuiDataGrid-row:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <DataGrid
                  rows={uploaded.rows}
                  columns={uploaded.cols}
                  apiRef={apiRef}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  pageSizeOptions={[5]}
                  slots={{ toolbar: GridToolbar }}
                  // checkboxSelection
                  // disableRowSelectionOnClick
                  onStateChange={(state) => setUpdatedState(state)}
                  onCellClick={handleEvent}
                />
              </Box>

              <div className="save">
                {category.method === null || category.method === 0 ? (
                  <Button
                    disabled
                    variant="contained"
                    color="success"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                )}
              </div>
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

              {/* <div className="data">
              <div className="field">
                <FormControl sx={{ minWidth: 120, marginTop: 1 }}>
                  <InputLabel id="product" size="small">
                    Products
                  </InputLabel>
                  <Select
                    size="small"
                    labelId="product"
                    id="product-list"
                    placeholder="Select Product"
                    // key={e.target.value}
                    value={product}
                    error={error.product}
                    label="Products"
                    onChange={(e) => {
                      // {
                      //   error.product
                      //     ? await setError({ ...error, ["product"]: false })
                      //     : await setError({ ...error, ["product"]: true });
                      // }
                      setProduct(e.target.value);
                      setError({ ...error, ["product"]: false });
                      console.log("Pr", e.target.value);
                    }}
                  >
                    <MenuItem value="Product 1">Product 1</MenuItem>
                    <MenuItem value="Product 2">Product 2</MenuItem>
                    <MenuItem value="Product 3">Product 3</MenuItem>
                  </Select>
                  {error.product && (
                    <FormHelperText sx={{ color: "#d32f2f" }}>
                      required
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="field">
                <FormControl sx={{ minWidth: 120, marginTop: 1 }}>
                  <InputLabel id="tag-method" size="small">
                    Method
                  </InputLabel>
                  <Select
                    size="small"
                    labelId="tag-method"
                    id="methods"
                    placeholder="Select Tagging Method"
                    value={method}
                    label="Products"
                    onChange={handleTagMethod}
                    error={error.method}
                  >
                    <MenuItem value={1}>QR Code</MenuItem>
                    <MenuItem value={2}>Barcode</MenuItem>
                    <MenuItem value={3}>Batch No</MenuItem>
                    <MenuItem value={4}>Serial No</MenuItem>
                  </Select>
                  {error.method && (
                    <FormHelperText sx={{ color: "#d32f2f" }}>
                      required
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
            </div> */}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TagProdComp;
