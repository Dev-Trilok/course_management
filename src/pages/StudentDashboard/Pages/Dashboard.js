import React, { useState } from "react";
import CourseCard from "../components/CourseCard";
import { Grid } from "@material-ui/core";

export default function Dashboard({ user }) {
  const [courses, setCourses] = useState([]);
  React.useEffect(() => {
    setCourses(user.courses);
  }, [user]);

  const getCourses = courses.map((i) => (
    <Grid item xs={12} sm={3} key={i}>
      <CourseCard id={i} />
    </Grid>
  ));

  return (
    <div>
      <Grid container spacing={4}>
        {getCourses}
      </Grid>
    </div>
  );
}
