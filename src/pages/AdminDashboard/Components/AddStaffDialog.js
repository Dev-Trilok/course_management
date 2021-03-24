import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Select, MenuItem } from "@material-ui/core";

export default function AddStaffDialog({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };
  const [dept, setDept] = React.useState("CSE");
  const handleAdd = (e) => {
    e.preventDefault();
    console.log(e.target.name.value);
    console.log(e.target.username.value);
    console.log(e.target.password.value);
    console.log(dept);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add New Staff</DialogTitle>
      <form onSubmit={handleAdd}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            variant="outlined"
            id="name"
            label="Name"
            type="name"
            fullWidth
          />
          <TextField
            autoFocus
            variant="outlined"
            margin="dense"
            id="username"
            label="username"
            type="username"
            fullWidth
          />
          <TextField
            autoFocus
            variant="outlined"
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
          />
          <Select
            id="department"
            value={dept}
            onChange={(e) => {
              setDept(e.target.value);
            }}
            label="Department"
            fullWidth
          >
            <MenuItem value="CSE">CSE</MenuItem>
            <MenuItem value="MECH">MECH</MenuItem>
            <MenuItem value="CIVIL">CIVIL</MenuItem>
            <MenuItem value="ETC">ETC</MenuItem>
            <MenuItem value="ETX">ETX</MenuItem>
            <MenuItem value="TX">TX</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
