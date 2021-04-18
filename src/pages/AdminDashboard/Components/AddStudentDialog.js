import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import FirebaseApp from "../../../firebase";
import TransferList from "./TransferList";
import SelectItem from "../../../components/selectitem/SelectItem";

const db = FirebaseApp.firestore();
export default function AddStaffDialog({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };
  const [department, setDepartment] = React.useState("");
  const [departments, setDepartments] = React.useState([]);
  const [Class, setClass] = React.useState("None");
  const [classes, setClasses] = React.useState([]);
  const [semester, setSemester] = React.useState("");
  const [courses, setCourses] = React.useState([]);
  React.useEffect(() => {
    db.collection("departments")
      .get()
      .then((value) => {
        setDepartments(value.docs.map((d) => d.data().name));
      });
    db.collection("classes")
      .where("department", "==", department)
      .get()
      .then((value) => {
        setClasses(value.docs.map((d) => d.data().name));
      });
  }, [department]);

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
        class: Class,
        id: e.target.username.value,
      })
      .then((value) => {
        value.update({ id: value.id }).then(() => {
          setDepartment("");
          setSemester("");
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
            margin="dense"
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
          <SelectItem
            id="department"
            title="Department"
            value={department}
            setValue={setDepartment}
            listItems={departments}
          />
          <br />
          <SelectItem
            id="class"
            title="Class"
            value={Class}
            setValue={setClass}
            listItems={classes}
          />
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
