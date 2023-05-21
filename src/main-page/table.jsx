import * as React from "react";
import "./table.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Checkbox } from "@mui/material";
import { useRef } from "react";
import { useState } from "react";

import ClearIcon from "@mui/icons-material/Clear";

export default function MainTable() {
  const mockList = [];

  const [list, setList] = useState(mockList);

  const inputField = useRef(null);

  const [inputInfo, setInputInfo] = useState(null);

  function getInform(event) {
    setInputInfo(inputField.current.value);
  }

  function handleAdd() {
    if (!!inputInfo) {
      let object = {};
      object.name = inputInfo;
      object.check = false;
      const newList = [...list];
      newList.push(object);

      setList(newList);
      clearInput();
    }
  }

  document.addEventListener("keyup", (event) => {
    if (event.code === "Enter") handleAdd();
  });

  function clearList() {
    setList([]);
  }

  function handleDeleteFactory(id) {
    return () => {
      const newList = [...list];
      newList.splice(id, 1);
      setList(newList);
    };
  }

  function clearInput() {
    inputField.current.value = "";
    setInputInfo("");
  }

  // const [x, setX] = useState(list);

  const soldCheckbox = ({ target: { checked, id } }) => {
    let obj = [...list];
    obj[id].check = checked;
    setList(obj);

    const text = document.getElementsByClassName("text");
    const buttons = document.getElementsByClassName("buttonDelete");

    // console.log(text[id]);

    if (list[id].check === true) {
      text[id].classList.add("done");
      buttons[id].classList.add("done");
      buttons[id].disabled = true;
    } else if (list[id].check === false) {
      text[id].classList.remove("done");
      buttons[id].classList.remove("done");
      buttons[id].disabled = false;
    }
  };

  return (
    <TableContainer component={Paper}>
      <div></div>
      <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              align="center"
              sx={{
                width: 300,
              }}
            >
              <Button
                variant="outlined"
                color="error"
                onClick={clearList}
                sx={{
                  height: 44,
                }}
              >
                Clear all
              </Button>
            </TableCell>
            <TableCell
              align="center"
              sx={{
                lineHeight: 0,
              }}
            >
              <input
                id="standard-multiline-flexible"
                label="todo"
                variant="standard"
                style={{ padding: "10px 30px 10px 10px" }}
                sx={{
                  width: 500,
                }}
                ref={inputField}
                onChange={getInform}
              />
              <Button
                style={{ margin: "0px 0px 0px -40px" }}
                color="error"
                sx={{
                  minWidth: 20,
                  width: 30,
                  height: 30,
                }}
                onClick={() => clearInput()}
              >
                <ClearIcon />
              </Button>
            </TableCell>
            <TableCell
              align="center"
              size="small"
              sx={{
                width: 300,
              }}
            >
              <Button
                variant="outlined"
                color="success"
                onClick={handleAdd}
                sx={{
                  height: 44,
                }}
              >
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
                {/*                                                                                */}
                <Checkbox
                  type="checkbox"
                  checked={list[list.indexOf(row)].check}
                  id={list.indexOf(row).toString()}
                  onChange={soldCheckbox}
                />
              </TableCell>
              <TableCell align="center">
                <div className="text">{row.name}</div>
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleDeleteFactory(list.indexOf(row))}
                  className="buttonDelete"
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
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
