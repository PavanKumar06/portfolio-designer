import React, { useState } from "react";
import { useMultistepForm } from "./useMultiStepForm";
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Paper,
  Step,
  StepLabel,
  Stepper,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import AddressForm from "./AddressForm";

import Review from "./Review";
import WorkExp from "./WorkExp";
import SocialMedia from "./SocialMedia";
import Projects from "./Projects";
import Skills from "./Skills";

const InitialState = {
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  cardName: "",
  cardNumber: "",
  expDate: "",
  cvv: "",
  saveCard: false,
};

function Intro() {
  const [data, setData] = useState(InitialState);

  const steps = [
    "Personal Information",
    "Social Media",
    "Work Experience",
    "Projects",
    "Skills",
    "Review",
  ];
  const components = [
    <AddressForm data={data} />,
    <SocialMedia data={data} />,
    <WorkExp />,
    <Projects />,
    <Skills />,
    <Review />,
  ];
  const { currentStepIndex, step, back, next, isFirstStep, isLastStep } =
    useMultistepForm(components);

  const onSubmit = (event) => {
    event.preventDefault();
    next();
  };
  const darkTheme = createTheme({
    palette: {
      mode: "light",
    },
  });
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppBar
          position="absolute"
          color="default"
          elevation={0}
          sx={{
            position: "relative",
            borderBottom: (t) => `1px solid ${t.palette.divider}`,
          }}
        >
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Heisenberg
            </Typography>
          </Toolbar>
        </AppBar>
        <Container
          sx={{
            maxWidth: "600px",
            padding: 2,
          }}
        >
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h4" align="center">
              Fill the Details
            </Typography>
            <Stepper activeStep={currentStepIndex} sx={{ pt: 3, pb: 3 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {currentStepIndex === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <form>
                  {components[currentStepIndex]}
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    {currentStepIndex !== 0 && (
                      <Button onClick={back} sx={{ mt: 3, ml: 1 }}>
                        Back
                      </Button>
                    )}

                    <Button
                      // type="submit"
                      onClick={next}
                      variant="contained"
                      sx={{ mt: 3, ml: 1 }}
                    >
                      {currentStepIndex === steps.length - 1
                        ? "Place order"
                        : "Next"}
                    </Button>
                  </Box>
                </form>
              </React.Fragment>
            )}
          </Paper>
          {/* <Copyright /> */}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default Intro;
