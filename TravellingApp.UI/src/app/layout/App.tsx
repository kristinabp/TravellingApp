import React from "react";
import { Route, Routes } from "react-router-dom";
import { Container, ThemeProvider } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./nav/NavBar.tsx";
import Footer from "./footer/Footer.tsx";
import { initializeTheme } from "./Theme.ts";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import Home from "../features/HomePage.tsx";
import RestorantSuggest from "../features/RestorantSuggestPage.tsx";
import Wheather from "../features/WheatherPage.tsx";
import RentCar from "../features/RentCarPage.tsx";
import Hotels from "../features/Hotels.tsx";
import Monuments from "../features/Monuments.tsx";

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
          <Route path="/" element={<Home />} />
          <Route path="/wheather" element={<Wheather />} />
          <Route path="/restorantSuggest" element={<RestorantSuggest maxOut={30} />} />
          <Route path="/rentCar" element={<RentCar maxOut={60} />} />
          <Route path="/hotels" element={<Hotels maxOut={30} />} />
          <Route path="/monuments" element={<Monuments maxOut={20} />} />
        </Routes>
      </Container>
      <ToastContainer position="bottom-right" />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
