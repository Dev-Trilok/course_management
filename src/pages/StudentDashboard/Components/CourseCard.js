import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FirebaseApp from "../../../firebase";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function CourseCard({ id }) {
  const [course, setCourse] = React.useState(null);
  const classes = useStyles();
  React.useEffect(() => {
    const db = FirebaseApp.firestore();
    db.collection("courses")
      .doc(id)
      .get()
      .then((data) => {
        if (data.exists) setCourse(data.data());
      });
  }, []);

  if (course === null) {
    return (
      <Card className={classes.root} key={id}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Loading.....
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={course.name}
          height="140"
          image={course.thumbnail}
          title={course.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {course.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {course.type}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  );
}
