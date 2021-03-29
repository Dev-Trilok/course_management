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
  InputLabel,
  FormLabel,
  Typography,
} from "@material-ui/core";
import FirebaseApp from "../../../firebase";
import TransferList from "./TransferList";

const db = FirebaseApp.firestore();
export default function AddStaffDialog({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  const [department, setDepartment] = React.useState("");
  const [departments, setDepartments] = React.useState([]);
  const [semester, setSemester] = React.useState("");
  const [courses, setCourses] = React.useState([]);
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
        semester: semester,
        role: "student",
        courses: courses,
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
      <DialogTitle id="form-dialog-title">Add New Student</DialogTitle>
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
          <TextField
            variant="outlined"
            margin="Semester"
            id="semester"
            label="Semester"
            type="semester"
            value={semester}
            onChange={(e) => {
              setSemester(e.target.value);
            }}
            fullWidth
          />

          <br />
          <br />
          <Typography gutterBottom>Department :</Typography>
          <Select
            id="department"
            title="Department"
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
            }}
            fullWidth
          >
            {departments.map((d, i) => (
              <MenuItem key={i} value={d}>
                {d}
              </MenuItem>
            ))}
          </Select>
          <TransferList
            semester={semester}
            department={department}
            choosen={courses}
            setChoosen={setCourses}
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
