import React from "react";
import { Button, TextField } from "@material-ui/core";
import { DataGrid, setGridPageStateUpdate } from "@material-ui/data-grid";
import readXlsxFile from "read-excel-file";
import FirebaseApp from "../../../firebase";
import SelectItem from "../../../components/selectitem/SelectItem";
import TransferList from "../components/TransferList";

const addMultipleStudentExcelFormat =
  "https://firebasestorage.googleapis.com/v0/b/course-manage.appspot.com/o/samples%2FaddMultipleStudents.xlsx?alt=media&token=66f175dc-d1f1-4d65-b3ca-ee6e48441ed7";

const db = FirebaseApp.firestore();

export default function AddMultipleStudent() {
  const [data, setData] = React.useState([]);
  const handleFileChoosen = (e) => {
    if (e.target.files.length > 0)
      readXlsxFile(e.target.files[0]).then((rows) => {
        const columnNames = rows.shift();
        if (
          columnNames.includes("prn") &&
          columnNames.includes("name") &&
          columnNames.includes("username") &&
          columnNames.includes("password")
        ) {
          const objs = rows.map((row, i) => {
            const obj = { id: i };
            row.forEach((cell, i) => {
              obj[columnNames[i]] = cell;
            });
            return obj;
          });
          setData(objs);
        } else setData([]);
      });
  };
  const columns = [
    { field: "prn", headerName: "PRN" },
    { field: "name", headerName: "Name", width: 200 },
    { field: "username", headerName: "Username", width: 200 },
    { field: "password", headerName: "Password", width: 200 },
    { field: "emailid", headerName: "Email Id", width: 200 },
  ];

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
        setClasses(value.docs.map((d) => d.data()));
      });
  }, [department]);

  const [requestPassword, setRequestPassword] = React.useState(false);
  /*const handleAdd = (e) => {
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
  };*/

  return (
    <div>
      <h1>
        You can add multiple students using excel sheet. For sample excel sheet
        <a href={addMultipleStudentExcelFormat}>Click here</a>
      </h1>
      <Button variant="contained" component="label">
        Upload File
        <input
          type="file"
          onChange={handleFileChoosen}
          id="excel-sheet"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          aria-describedby="file-input-help"
          hidden
        />
      </Button>
      {data.length > 0 && (
        <>
          <div style={{ height: "40vh", width: "100vw" }}>
            <DataGrid columns={columns} rows={data} />
          </div>
          <br />
          <br />
          <div style={{ display: "inline-block", width: "90vw" }}>
            <div style={{ width: 400, float: "left", marginLeft: 20 }}>
              <br />
              {/* <TextField
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
              <br /> */}
              <SelectItem
                id="department"
                title="Department"
                value={department}
                setValue={setDepartment}
                listItems={departments}
              />
              <br />
              <br />

              <SelectItem
                id="class"
                title="Class"
                value={Class}
                setValue={setClass}
                listItems={classes.map((c) => {
                  return c.name;
                })}
              />
            </div>
            <div style={{ float: "left", marginLeft: 20 }}>
              <TransferList
                semester={semester}
                department={department}
                choosen={courses}
                setChoosen={setCourses}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
