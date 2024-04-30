import React from "react";
import { Route, Routes } from "react-router-dom";
import { Container, ThemeProvider } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./nav/NavBar.tsx";
import { initializeTheme } from "./Theme.ts";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import Wheather from "../features/WheatherPage.tsx";

function App() {
  const expandedKey = "containerExpanded";

  const containerExpanded = localStorage.getItem(expandedKey);

  const [expanded, SetExpanded] = useState<boolean>(
    JSON.parse(containerExpanded!)
  );

  const theme = initializeTheme();

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Container
        maxWidth={expanded ? false : undefined}
        data-testid="page-container"
        sx={{ marginTop: 5 }}
      >
        <Routes>
          <Route path="/" element={<Wheather />} />
        </Routes>
      </Container>
      <ToastContainer position="bottom-right" />
    </ThemeProvider>
  );
}

export default App;
