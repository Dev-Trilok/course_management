import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Grid,
} from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardActionArea component={Link} to="/student">
              <CardContent>
                <Typography align="center" variant="h2" component="h2">
                  24
                </Typography>
                <Typography align="center" variant="h5" component="h2">
                  Students
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardActionArea component={Link} to="/staff">
              <CardContent>
                <Typography align="center" variant="h2" component="h2">
                  24
                </Typography>
                <Typography align="center" variant="h5" component="h2">
                  Staff
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardActionArea component={Link} to="/courses">
              <CardContent>
                <Typography align="center" variant="h2" component="h2">
                  24
                </Typography>
                <Typography align="center" variant="h5" component="h2">
                  Courses
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography align="center" variant="h2" component="h2">
                  24
                </Typography>
                <Typography align="center" variant="h5" component="h2">
                  Resources
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
