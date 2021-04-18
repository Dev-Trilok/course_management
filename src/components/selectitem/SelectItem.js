import React from "react";
import { Typography, Select, MenuItem } from "@material-ui/core";

export default function SelectItem({ id, title, value, setValue, listItems }) {
  return (
    <>
      <Typography gutterBottom>{title} :</Typography>
      <Select
        id={id}
        title={title}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        fullWidth
      >
        {listItems.map((d, i) => (
          <MenuItem key={i} value={d}>
            {d}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
