import "./App.css";
import api from "./api";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Slider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";

const App = () => {
  const [state, setState] = useState(null);
  useEffect(() => {
    api.lights().then(setState);
  }, []);
  if (!state) {
    return null;
  }

  return (
    <div className="App">
      <Grid container spacing={2}>
        {state.map((light) => (
          <Grid key={light.id} item xs={4}>
            <Card
              sx={{
                height: "100%",
              }}
            >
              <CardContent>
                <Typography variant="h5" component="h2">
                  {light.label}
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      {Object.entries(light).map(([key, value]) => (
                        <TableRow key={key}>
                          <TableCell>{key}</TableCell>
                          <TableCell>{JSON.stringify(value)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
              <CardActions>
                <Slider
                  step={.1}
                  min={0}
                  max={1}
                  defaultValue={light.brightness}
                  onChange={(e, value) => {
                    api.setState(light.id, {
                      brightness: value,
                    });
                  }}
                />
              </CardActions>
              <CardActions>
                <Button
                  key={light.id}
                  variant="contained"
                  onClick={() => {
                    api.toggle(light.id);
                  }}
                >
                  Toggle
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default App;
