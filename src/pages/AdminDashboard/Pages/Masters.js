import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import FirebaseApp from "../../../firebase";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
  IconButton,
} from "@material-ui/core";
import { useMediaQuery } from "react-responsive";
import AddIcon from "@material-ui/icons/Add";
const db = FirebaseApp.firestore();

export default function Masters() {
  const [openAddDepartment, setOpenAddDepartment] = useState(false);
  const [openEditDepartment, setOpenEditDepartment] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const departmentColumns = [
    { field: "id", headerName: "Id" },
    { field: "name", headerName: "Name" },
  ];
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const [data, setData] = useState([]);
  React.useEffect(() => {
    const query = db.collection("departments");
    const unsub = query.onSnapshot((qs) => {
      const d = [];
      qs.forEach((r) => {
        d.push({ id: r.id, name: r.data().name });
      });
      setData(d);
    });
    return function cleanup() {
      unsub();
    };
  }, []);

  const [selectedDepartmentIds, setSelectedDepartmentIds] = useState([]);
  const handleDepartmentSelectionChanged = (e) => {
    setSelectedDepartmentIds(e.selectionModel);
  };
  const handleDepartmentRowClicked = (e) => {
    setSelectedDepartment(e);
    setOpenEditDepartment(true);
  };

  return (
    <div>
      <div
        style={{ height: "40vh", width: isDesktopOrLaptop ? "40vw" : "100vw" }}
      >
        <Typography variant="h6" gutterBottom>
          Departments Master :
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
              setOpenAddDepartment(true);
            }}
            color="primary"
          >
            Add New
          </Button>
        </div>

        <DataGrid
          hideFooterPagination
          columns={departmentColumns}
          rows={data}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={handleDepartmentSelectionChanged}
          onRowClick={handleDepartmentRowClicked}
        />
      </div>
      {openEditDepartment && (
        <EditDepartmentName
          open={openEditDepartment}
          setOpen={setOpenEditDepartment}
          department={selectedDepartment}
        />
      )}
      {openAddDepartment && (
        <AddDepartment
          open={openAddDepartment}
          setOpen={setOpenAddDepartment}
        />
      )}
    </div>
  );
}

const EditDepartmentName = ({ open, setOpen, department }) => {
  const [name, setName] = useState(department.row.name);
  const [id] = useState(department.row.id);
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    db.collection("departments")
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
      aria-labelledby="edit-department-dialog"
    >
      <DialogTitle id="edit-department-dialog">Department Details</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          margin="dense"
          label="Department Name :"
          fullWidth
        />
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
const AddDepartment = ({ open, setOpen }) => {
  const [name, setName] = useState("");
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    db.collection("departments")
      .add({ name: name })
      .then(() => {
        setOpen(false);
      });
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="add-department-dialog"
    >
      <DialogTitle id="add-department-dialog">Department Details</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          margin="dense"
          label="Department Name :"
          fullWidth
        />
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
