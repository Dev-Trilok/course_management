import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import FirebaseApp from "../../../../firebase";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useMediaQuery } from "react-responsive";
const db = FirebaseApp.firestore();

export default function ClassesMaster() {
  const [openAddClass, setOpenAddClass] = useState(false);
  const [openEditClass, setOpenEditClass] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const classColumns = [
    { field: "id", headerName: "Id" },
    { field: "name", headerName: "Name", width: 200 },
    { field: "department", headerName: "Department", width: 200 },
  ];
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const [data, setData] = useState([]);
  React.useEffect(() => {
    const query = db.collection("classes");
    const unsub = query.onSnapshot((qs) => {
      const d = [];
      qs.forEach((r) => {
        d.push({
          id: r.id,
          name: r.data().name,
          department: r.data().department,
        });
      });
      setData(d);
    });
    return function cleanup() {
      unsub();
    };
  }, []);

  const [selectedClassIds, setSelectedClassIds] = useState([]);
  const handleClassSelectionChanged = (e) => {
    setSelectedClassIds(e.selectionModel);
  };
  const handleClassRowClicked = (e) => {
    setSelectedClass(e);
    setOpenEditClass(true);
  };

  return (
    <div style={{ float: "left", marginLeft: 20 }}>
      <div
        style={{ height: "40vh", width: isDesktopOrLaptop ? "46vw" : "100vw" }}
      >
        <Typography variant="h6" gutterBottom>
          Classes Master :
        </Typography>
        <div
          style={{
            marginTop: -40,
            marginLeft: isDesktopOrLaptop ? "30vw" : "64vw",
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              setOpenAddClass(true);
            }}
            color="primary"
          >
            Add New
          </Button>
        </div>

        <DataGrid
          columns={classColumns}
          rows={data}
          autoHeight
          hideFooterPagination
          disableSelectionOnClick
          onSelectionModelChange={handleClassSelectionChanged}
          onRowClick={handleClassRowClicked}
        />
      </div>
      <br />
      {openEditClass && (
        <EditClassName
          open={openEditClass}
          setOpen={setOpenEditClass}
          Class={selectedClass}
        />
      )}
      {openAddClass && (
        <AddClass open={openAddClass} setOpen={setOpenAddClass} />
      )}
    </div>
  );
}
const EditClassName = ({ open, setOpen, Class }) => {
  const [name, setName] = useState(Class.row.name);
  const [department, setDepartment] = useState(Class.row.department);
  const [id] = useState(Class.row.id);
  const handleClose = () => {
    setOpen(false);
  };
  const [departments, setDepartments] = useState([]);
  React.useEffect(() => {
    db.collection("departments")
      .get()
      .then((value) => {
        setDepartments(value.docs.map((d) => d.data().name));
      });
  }, []);
  const handleSave = () => {
    db.collection("classes")
      .doc(id)
      .set({ name: name })
      .then(() => {
        setOpen(false);
      });
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-Class-dialog"
    >
      <DialogTitle id="edit-Class-dialog">Class Details</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          margin="dense"
          label="Class Name :"
          fullWidth
        />
        <Select
          id="department"
          value={department}
          onChange={(e) => {
            setDepartment(e.target.value);
          }}
          label="Department"
          fullWidth
        >
          {departments.map((d, i) => (
            <MenuItem key={i} value={d}>
              {d}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
const AddClass = ({ open, setOpen }) => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    if (name.length > 0 && department.length > 0)
      db.collection("classes")
        .add({ name: name, department: department })
        .then(() => {
          setOpen(false);
        });
  };
  const [departments, setDepartments] = useState([]);
  React.useEffect(() => {
    db.collection("departments")
      .get()
      .then((value) => {
        setDepartments(value.docs.map((d) => d.data().name));
      });
  }, []);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="add-Class-dialog"
    >
      <DialogTitle id="add-Class-dialog">Class Details</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          margin="dense"
          label="Class Name :"
          fullWidth
        />
        <Typography gutterBottom>Department :</Typography>

        <Select
          id="department"
          value={department}
          onChange={(e) => {
            setDepartment(e.target.value);
          }}
          label="Department"
          fullWidth
        >
          {departments.map((d, i) => (
            <MenuItem key={i} value={d}>
              {d}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
