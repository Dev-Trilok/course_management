import React, { useState } from "react";
import CourseCard from "../Components/CourseCard";

export default function Dashboard({ user }) {
  const [courses, setCourses] = useState([]);
  React.useEffect(() => {
    setCourses(user.courses);
  });

  const getCourses = courses.map((i) => <CourseCard id={i} key={i} />);

  return <div>{getCourses}</div>;
}
