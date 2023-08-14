import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import FullScreenLoader from "./FullScreenLoader";

const CustomTable = ({
  columns,
  rows,
  loading,
  keyMap,
  handleEditRow,
  handleDeleteRow,
  setId,
  isFromUser,
}) => {
  const getColumnValue = (row, key) => {
    if (typeof key === "function") {
      return key(row);
    }
    return row[key];
  };
  return (
    <>
      {loading ? (
        <FullScreenLoader />
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table>
              <TableHead stickyHeader aria-label="sticky table">
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column?.id}>{column?.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.length > 0 ? (
                  rows?.map((row, index) => (
                    <TableRow key={row?.id} hover style={{ cursor: "pointer" }}>
                      {columns?.map((item) => (
                        <TableCell key={item?.id}>
                          {item?.label === "Action" ? (
                            <>
                              {!isFromUser && (
                                <Edit
                                  onClick={() => {
                                    handleEditRow(row?.id);
                                    setId(row?.id);
                                  }}
                                />
                              )}
                              <Delete
                                onClick={() => handleDeleteRow(row?.id)}
                              />
                            </>
                          ) : (
                            <>
                              {item?.label === "SN" && index + 1}

                              {getColumnValue(row, keyMap[item?.label])}
                            </>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns?.length}>
                      No record available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </>
  );
};

export default CustomTable;
