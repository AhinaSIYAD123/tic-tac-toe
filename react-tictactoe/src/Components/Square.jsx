import React from "react";
import { Button } from "@mui/material";

export default function Square({ value, onSquareClick }) {
  return (
    <Button
      variant="outlined"
      onClick={onSquareClick}
      sx={{
        width: 70,
        height: 70,
        fontSize: 28,
        fontWeight: "bold",
        m: 0.5,
      }}
    >
      {value}
    </Button>
  );
}
