import React from "react";
import DepartmentMaster from "./DepartmentMaster";
import ClassesMaster from "./ClassesMaster";

export default function Masters() {
  return (
    <div style={{ display: "inline-block", width: "100%" }}>
      <DepartmentMaster />
      <ClassesMaster />
    </div>
  );
}
