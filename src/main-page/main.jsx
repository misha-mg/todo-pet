import React from "react";
import MainTable from "./table";
import { Typography } from "@mui/material";

export function Main() {
  return (
    <>
      <Typography variant="h2" align="center" gutterBottom>
        TODOS
      </Typography>
      <MainTable />
    </>
  );
}
