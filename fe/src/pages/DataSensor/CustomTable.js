import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { formatTime } from "../../utils";
import NoData from "../../components/NoData";

const columns = [
  { id: "id", label: "ID", minWidth: 100 },
  {
    id: "temperature",
    label: "Temperature (°C)",
    minWidth: 100,
    width: "20%",
    format: (value) => value?.toFixed(1),
  },
  {
    id: "humidity",
    label: "Humidity (%)",
    minWidth: 100,
    width: "20%",
  },
  {
    id: "light",
    label: "Light (lux)",
    minWidth: 100,
    width: "20%",
  },
  {
    id: "time",
    label: "Time",
    minWidth: 100,
    width: "20%",
  },
];

const createRowsData = (data) => {
  const rows = data.map((val, idx) => {
    const time = formatTime(val?.time) || " ";
    return { ...val, time: time };
  });
  return rows;
};

export default function CustomTable({ data }) {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    console.log("data:", data);
    if (data && data.length) {
      const res = createRowsData(data);
      setRows(res);
    }
  }, [data]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, width: column.width }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {data && data.length ? (
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, idx) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow hover role="checkbox">
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align="center">
                  <NoData />
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
