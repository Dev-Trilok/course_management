import React, { useState } from "react";
import FirebaseApp from "../../../firebase";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import EditStaffDialog from "../Components/EditStaffDialog";
import AddStaffDialog from "../Components/AddStaffDialog";
import { Button, Typography } from "@material-ui/core";

const db = FirebaseApp.firestore();

export default function Staff() {
  const [data, setData] = useState([]);
  const [openAddStaff, setOpenAddStaff] = useState(false);
  const [selectedId, setSelectedId] = useState([]);
  const [openEditStaffDialog, setOpenEditStaffDialog] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  React.useEffect(() => {
    const query = db.collection("users").where("role", "==", "staff");
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
    { field: "id", headerName: "Id", width: 100 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "username", headerName: "Username", width: 150 },
    { field: "email", headerName: "Email Id", width: 150 },
    { field: "department", headerName: "Department", width: 150 },
    { field: "blocked", headerName: "Blocked", width: 150 },
  ];
  const handleRowSelected = (e) => {
    setSelectedIds(e.selectionModel);
  };
  const handleRowClick = (e) => {
    setSelectedId(e.id);
    setOpenEditStaffDialog(true);
  };
  return (
    <div>
      <div style={{ height: "80vh", width: "100%" }}>
        <Typography variant="h6" gutterBottom>
          Staffs Details :
        </Typography>

        <DataGrid
          checkboxSelection
          disableSelectionOnClick
          columns={columns}
          rows={data}
          onSelectionModelChange={handleRowSelected}
          // onRowClick={handleRowClick}
        />
      </div>

      {openEditStaffDialog && (
        <EditStaffDialog
          open={openEditStaffDialog}
          setOpen={setOpenEditStaffDialog}
          id={selectedId}
        />
      )}
      <AddStaffDialog open={openAddStaff} setOpen={setOpenAddStaff} />
      <br />
      <br />
      <div style={{ textAlign: "center" }}>
        <Button
          variant="contained"
          onClick={() => {
            setOpenAddStaff(true);
          }}
          color="primary"
        >
          Add New
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
