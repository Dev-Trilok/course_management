import React, { useState } from "react";
import FirebaseApp from "../../../firebase";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import EditStaffDialog from "../Components/EditStaffDialog";
import AddStaffDialog from "../Components/AddStaffDialog";

const db = FirebaseApp.firestore();
export default function Staff() {
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
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
      console.log(qs.size);
    });
    return function cleanup() {
      unsub();
    };
  }, []);
  const columns = [
    { field: "id", headerName: "Id", width: 100 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "username", headerName: "Username", width: 150 },
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
        <DataGrid
          checkboxSelection
          disableSelectionOnClick
          columns={columns}
          rows={data}
          onSelectionModelChange={handleRowSelected}
          onRowClick={handleRowClick}
        />
      </div>
      <AddStaffDialog
        open={openEditStaffDialog}
        setOpen={setOpenEditStaffDialog}
        id={selectedId}
      />
    </div>
  );
}
