import React, { useState } from "react";
import "./styles/HomePage.css";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import RestorantSuggest from './RestorantSuggestPage.tsx';
import Wheather from "./WheatherPage.tsx";
import RentCar from "./RentCarPage.tsx";
import Hotels from "./Hotels.tsx";
import Monuments from "./Monuments.tsx";

const Home = () => {
  const [city, setCity] = useState("");
  let hasData: boolean = true;

  const [startDate, setStartDate] = React.useState<Dayjs | null>(
    dayjs("2022-04-17T15:30")
  );
  const [endDate, setEndDate] = React.useState<Dayjs | null>(
    dayjs("2022-04-17T15:30")
  );

  const goToHotelsPage = () => {
    window.location.href = "http://localhost:3000/hotels";
  };

  const goToMonumentsPage = () => {
    window.location.href = "http://localhost:3000/monuments";
  };

  const goReantACarPage = () => {
    window.location.href = "http://localhost:3000/rentCar";
  };

  const goToRestaurantsPage = () => {
    window.location.href = "http://localhost:3000/restorantSuggest";
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(city);

    console.log("test")

    fetch("http://localhost:3050/restaurantsData", {
      method: "POST",
      body: JSON.stringify({city}),
      headers: {
        "Content-Type": "application/json",
      },
    });

    fetch("http://localhost:3060/rentCarData", {
      method: "POST",
      body: JSON.stringify({ city, startDate, endDate }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    fetch("http://localhost:8008/monuments", {
      method: "POST",
      body: JSON.stringify({ city }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    fetch("http://localhost:8000/hotels", {
      method: "POST",
      body: JSON.stringify({ city, startDate, endDate }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    hasData = true;
  };

  return (
    <>
      <Box
        component="form"
        height={90}
        my={4}
        display="flex"
        alignItems="center"
        gap={4}
        p={2}
        sx={{ borderBottom: "1px solid grey" }}
      >
        <TextField
          id="outlined-basic"
          label="City"
          variant="outlined"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={["DateTimePicker", "DateTimePicker"]}
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <DateTimePicker
              label="Start date"
              defaultValue={dayjs("2022-04-17T15:30")}
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={["DateTimePicker", "DateTimePicker"]}
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <DateTimePicker
              label="End date"
              defaultValue={dayjs("2022-04-17T15:30")}
              value={endDate}
              onChange={(newValue) => setStartDate(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
        <Button
          sx={{ display: "flex" }}
          variant="contained"
          onClick={handleSubmit}
        >
          Search
        </Button>
      </Box>
      {hasData && (
        <>
          <Box
            component="form"
            height={200}
            my={4}
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
            sx={{ border: "1px solid grey", display: 'flex', overflowX: 'hidden', maxWidth: '100%' }}
          >
            <RestorantSuggest maxOut={3} />
            <Button
              sx={{ display: "flex" }}
              variant="contained"
              onClick={goToRestaurantsPage}
            >
              See more
            </Button>
          </Box>
          <Box
            component="form"
            height="fit-content"
            my={4}
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
            sx={{ border: "1px solid grey" }}
          >
          <RentCar maxOut={3} />
            <Button
              sx={{ display: "flex" }}
              variant="contained"
              onClick={goReantACarPage}
            >
              See more
            </Button>
          </Box>
          <Box
            component="form"
            height="fit-content"
            my={4}
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
            sx={{ border: "1px solid grey" }}
          >
            <Monuments maxOut={3} />
            <Button
              sx={{ display: "flex" }}
              variant="contained"
              onClick={goToMonumentsPage}
            >
              See more
            </Button>
          </Box>
          <Box
            component="form"
            height="fit-content"
            my={4}
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
            sx={{ border: "1px solid grey" }}
          >
          <Hotels maxOut={3} />
            <Button
              sx={{ display: "flex" }}
              variant="contained"
              onClick={goToHotelsPage}
            >
              See more
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default Home;
