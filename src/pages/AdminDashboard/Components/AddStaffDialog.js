import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@material-ui/core";
import FirebaseApp from "../../../firebase";
import SelectItem from "../../../components/selectitem/SelectItem";

const db = FirebaseApp.firestore();
export default function AddStaffDialog({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  const [department, setDepartment] = React.useState("");
  const [departments, setDepartments] = React.useState([]);
  React.useEffect(() => {
    db.collection("departments")
      .get()
      .then((value) => {
        setDepartments(value.docs.map((d) => d.data().name));
      });
  }, []);
  const [requestPassword, setRequestPassword] = React.useState(false);
  const handleAdd = (e) => {
    e.preventDefault();
    db.collection("users")
      .add({
        name: e.target.name.value,
        username: e.target.username.value,
        password: e.target.password.value,
        department: department,
        requestPassword: requestPassword,
        role: "staff",
        blocked: false,
        id: e.target.username.value,
      })
      .then((value) => {
        value.update({ id: value.id }).then(() => {
          setOpen(false);
        });
      });
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
            variant="outlined"
            margin="dense"
            id="username"
            label="username"
            type="username"
            fullWidth
          />
          <TextField
            variant="outlined"
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
          />

          <SelectItem
            id="department"
            title="Department"
            value={department}
            setValue={setDepartment}
            listItems={departments}
          />
          <br />
          <br />
          <FormControlLabel
            control={
              <Checkbox
                value={requestPassword}
                onChange={() => {
                  setRequestPassword(!requestPassword);
                }}
                name="requestPassword"
                id="requestPassword"
                color="primary"
              />
            }
            label="Request Change Password on Login"
          />
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
