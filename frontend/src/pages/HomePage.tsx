import { Box, CircularProgress, Container, Tab, Typography } from "@mui/material";
import { useState, SyntheticEvent } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab/";
import Login from "../components/authentication/Login";
import SignUp from "../components/authentication/SignUp";
import { useUser } from "../context/UserContext";

const HomePage = () => {
  const [value, setValue] = useState("2");
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const { user, loading }: any = useUser()
  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (user) {
    window.location.href = '/chat';
    return null; // To prevent rendering the component while redirecting
  }
  return (
    <Container maxWidth="xl" >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 2,
          margin: "20px 0 0 0 ",
        }}
      >
        <Typography variant="h3" fontFamily={"Work sans"}>
          Chatgram
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
          bgcolor: "white",
        }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList aria-label="lab API tabs example" onChange={handleChange} sx={{ marginBottom: 3 }}>
              <Tab
                label="Login"
                value="1"
                disableRipple
                disableFocusRipple
                sx={{ width: "50%", paddingX: 5 }}
              />
              <Tab
                label="SignUp"
                value="2"
                disableRipple
                disableFocusRipple
                sx={{ width: "50%", paddingX: 5 }}
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Login />
          </TabPanel>
          <TabPanel value="2">
            <SignUp />
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
};

export default HomePage;
