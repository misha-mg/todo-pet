import * as React from "react";
import "./table.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useRef } from "react";
import { useState } from "react";
// import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

export default function MainTable() {
  const mockList = [];

  const [list, setList] = useState(mockList);

  const inputField = useRef(null);

  const [inputInfo, setInputInfo] = useState(null);

  function getInform(event) {
    setInputInfo(inputField.current.value);
    console.log(inputInfo);
  }

  function handleAdd() {
    if (!!inputInfo) {
      let object = {};
      object.name = inputInfo;
      const newList = [...list];
      newList.push(object);
      console.log(list);

      setList(newList);
      console.log(newList);
      clearInput();
    }
  }

  function clearList() {
    setList([]);
  }

  function handleDeleteFactory(id) {
    return () => {
      console.log(id);
      const newList = [...list];
      newList.splice(id, 1);
      setList(newList);
    };
  }

  function clearInput() {
    inputField.current.value = "";
    setInputInfo("");
  }

  console.log("render");

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              align="center"
              sx={{
                width: 300,
              }}
            >
              <Button variant="outlined" color="error" onClick={clearList}>
                Clear all
              </Button>
            </TableCell>
            <TableCell align="center">
              <input
                id="standard-multiline-flexible"
                label="todo"
                variant="standard"
                sx={{
                  width: 500,
                }}
                ref={inputField}
                onChange={getInform}
              />
            </TableCell>
            <TableCell
              align="center"
              size="small"
              sx={{
                width: 300,
              }}
            >
              <Button variant="outlined" color="success" onClick={handleAdd}>
                Add
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row) => (
            <TableRow
              key={list.indexOf(row)}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {list.indexOf(row) + 1}
              </TableCell>
              <TableCell align="center">
                <div className="text">{row.name}</div>
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleDeleteFactory(list.indexOf(row))}
                >
                  DELETE
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row" align="center">
              Total: {list.length}
            </TableCell>
            <TableCell component="th" scope="row"></TableCell>
            <TableCell align="right">
              <Button>all</Button>
              <Button>comp</Button>
              <Button>active</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
