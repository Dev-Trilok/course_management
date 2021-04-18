import React, { useState } from "react";
import FirebaseApp from "../../../firebase";
import { DataGrid, GridColDef, GridToolbar } from "@material-ui/data-grid";
import EditStaffDialog from "../components/EditStaffDialog";
import AddStudentDialog from "../components/AddStudentDialog";
import { Button, Typography } from "@material-ui/core";
import TransferList from "../components/TransferList";
import { Link } from "react-router-dom";

const db = FirebaseApp.firestore();

export default function Students() {
  const [data, setData] = useState([]);
  const [openAddStudent, setOpenAddStudent] = useState(false);
  const [selectedId, setSelectedId] = useState([]);
  const [openEditStudentDialog, setOpenEditStudentDialog] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  React.useEffect(() => {
    const query = db.collection("users").where("role", "==", "student");
    const unsub = query.onSnapshot((qs) => {
      var d = [];
      qs.forEach((r) => {
        d.push(r.data());
      });
      setData(d);
    });
    return function cleanup() {
      unsub();
    };
  }, []);
  const columns = [
    { field: "username", headerName: "PRN", width: 100 },
    { field: "name", headerName: "Name", width: 250 },
    { field: "email", headerName: "Email Id", width: 150 },
    { field: "department", headerName: "Department", width: 150 },
    { field: "courses", headerName: "Courses", width: 150 },
    { field: "blocked", headerName: "Blocked", width: 120 },
  ];
  const handleRowSelected = (e) => {
    setSelectedIds(e.selectionModel);
  };
  const handleRowClick = (e) => {
    setSelectedId(e.id);
    setOpenEditStudentDialog(true);
  };
  const courses = {
    type: "string",
    width: 130,
    valueFormatter: ({ value }) => value.con,
    cellClassName: "font-tabular-nums",
  };

  return (
    <div>
      <div style={{ height: "80vh", width: "100%" }}>
        <Typography variant="h6" gutterBottom>
          Students Details :
        </Typography>

        <DataGrid
          checkboxSelection
          disableSelectionOnClick
          columns={columns}
          rows={data}
          onSelectionModelChange={handleRowSelected}
          // onRowClick={handleRowClick}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>
      {openEditStudentDialog && (
        <EditStaffDialog
          open={openEditStudentDialog}
          setOpen={setOpenEditStudentDialog}
          id={selectedId}
        />
      )}
      <AddStudentDialog open={openAddStudent} setOpen={setOpenAddStudent} />

      <br />
      <br />
      <div style={{ textAlign: "center" }}>
        <Button
          variant="contained"
          onClick={() => {
            setOpenAddStudent(true);
          }}
          color="primary"
        >
          Add New
        </Button>
        <Button
          style={{ marginLeft: 20 }}
          variant="contained"
          component={Link}
          to={"/addMultipleStudents"}
          color="primary"
        >
          Add Multiple
        </Button>
        <Button
          style={{ marginLeft: 20 }}
          variant="contained"
          onClick={() => {
            selectedIds.forEach((id) => {
              db.collection("users").doc(id).update({ blocked: true });
            });
          }}
          color="primary"
        >
          Block
        </Button>
        <Button
          style={{ marginLeft: 20 }}
          variant="contained"
          onClick={() => {
            selectedIds.forEach((id) => {
              db.collection("users").doc(id).update({ blocked: false });
            });
          }}
          color="primary"
        >
          Unblock
        </Button>
      </div>
    </div>
  );
}
