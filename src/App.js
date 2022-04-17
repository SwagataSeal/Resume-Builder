import React from "react";
import HorizontalLinearStepper from "./components/Stepper";
import { Box, Container, CssBaseline } from "@mui/material";
import Profile from "./components/Profile";
import Education from "./components/Education";
import Skill from "./components/Skill";
import Project from "./components/Project";
import Social from "./components/Social";
import Preview from "./components/Preview";
import { useSelector } from "react-redux";

export default function App() {
  const myState  = useSelector((state)=>state.changePageState);
  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="md">
          <Box m={2} pt={3}>
            <HorizontalLinearStepper />
            {myState.currentPage === 0 ? <Profile /> : null}
            {myState.currentPage === 1 ? <Education /> : null}
            {myState.currentPage === 2 ? <Skill /> : null}
            {myState.currentPage === 3 ? <Project /> : null}
            {myState.currentPage === 4 ? <Social /> : null}
            {myState.showPreview ? <Preview /> : null}
            
            
          </Box>
        </Container>
      </React.Fragment>
    </div>
  );
}
