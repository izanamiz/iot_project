import React, { useState, useEffect } from "react";
import {
  IconButton,
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
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const columns = [
  { id: "id", label: "ID", minWidth: 100, width: "33.33%" },
  { id: "mode", label: "Mode", minWidth: 100, width: "33.33%" },
  {
    id: "time",
    label: "Time",
    minWidth: 100,
    width: "33.33%",
  },
];

export default function CustomTable({ data }) {
  const [rows, setRows] = useState([{ mode: "", time: "" }]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [hoveredColumn, setHoveredColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [currColumn, setCurrColumn] = useState(null);

  const createRowsData = (data) => {
    const rows = data.map((val, idx) => {
      const time = val?.time ? formatTime(val?.time).slice(0, 19) : " ";
      return { id: idx + 1, mode: val.mode, time: time };
    });
    return rows;
  };

  useEffect(() => {
    if (data && data.length) {
      let res = createRowsData(data);
      res = currColumn ? sortedArr(res, currColumn) : res;
      setRows(res);
    }
  }, [data, currColumn, hoveredColumn, sortDirection]);

  const handleMouseEnter = (columnId) => {
    setHoveredColumn(columnId);
  };

  const handleMouseLeave = () => {
    setHoveredColumn(null);
  };

  const sortedArr = (data, column) => {
    const dataCopy = [...data];
    const sortedData =
      column === "time"
        ? dataCopy.sort((a, b) =>
            sortDirection === "asc"
              ? new Date(a.time) - new Date(b.time)
              : new Date(b.time) - new Date(a.time)
          )
        : column === "mode"
        ? dataCopy.sort((a, b) =>
            sortDirection === "asc"
              ? a.mode.localeCompare(b.mode)
              : b.mode.localeCompare(a.mode)
          )
        : dataCopy.sort((a, b) =>
            sortDirection === "asc" ? a.id - b.id : b.id - a.id
          );
    return sortedData;
  };

  const handleSortChange = () => {
    if (data && data.length) {
      const sortedData = sortedArr(data, hoveredColumn);
      setRows(sortedData);
    }

    setSortDirection((prevDirection) =>
      prevDirection === "asc" ? "desc" : "asc"
    );

    setCurrColumn(hoveredColumn);
  };

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
                  style={{
                    minWidth: column.minWidth,
                    width: column.width,
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => handleMouseEnter(column.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  {column.label}
                  {(hoveredColumn === column.id ||
                    currColumn === column.id) && (
                    <>
                      <IconButton size="small" onClick={handleSortChange}>
                        {sortDirection === "asc" ? (
                          <ArrowUpwardIcon />
                        ) : (
                          <ArrowDownwardIcon />
                        )}
                      </IconButton>
                    </>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {data && data.length && data[0] ? (
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
                <TableCell align="center">
                  <NoData />
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
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
