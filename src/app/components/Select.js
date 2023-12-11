import React from "react";
import {FormControl, MenuItem, Select as MUISelect} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export function Select({label, items, sx}) {
  const [item, setItem] = React.useState("");

  const handleChange = (event) => {
    setItem(event.target.value);
  };

  return (
    <FormControl sx={{minWidth: 120, ...sx}} fullWidth>
      <MUISelect
        value={item}
        onChange={handleChange}
        displayEmpty
        variant="filled"
        disableUnderline
        inputProps={{sx: {py: 2}}}
        IconComponent={KeyboardArrowDownIcon}
        sx={{
          borderRadius: 1,
          color: item ? "#0C0E0F" : "#6C757D",
          fontWeight: 700,
          textAlign: "center",
          "& .MuiSelect-icon": {
            color: item ? "#0C0E0F" : "#6C757D",
          },
        }}
      >
        <MenuItem value="">{label}</MenuItem>
        {items.map((item, index) => (
          <MenuItem key={index} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </MUISelect>
    </FormControl>
  );
}