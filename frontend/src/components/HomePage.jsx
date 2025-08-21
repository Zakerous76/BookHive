import Stack from "@mui/material/Stack"
import NavigationBar from "./NavigationBar"
import Container from "@mui/material/Container"
import Toolbar from "@mui/material/Toolbar"
import WelcomeCard from "./WelcomeCard"
import MostPopularBooksCard from "./MostPopularBooksCard"
import Divider from "@mui/material/Divider"
import Box from "@mui/material/Box"
import BookOfTheMomentCard from "./BookOfTheMomentCard"
import AboutCard from "./AboutCard"
import BeesBackground from "../shared-theme/BeesBackground"

const HomePage = () => {
  window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <Box>
      <BeesBackground />
      <Container
        sx={(theme) => ({
          padding: theme.spacing(2),
          [theme.breakpoints.up("sm")]: {
            padding: theme.spacing(4),
          },
        })}
      >
        <NavigationBar />
        <Toolbar />

        <Stack
          gap={10}
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Box sx={{ mt: "170px", mb: "100px" }}>
            <WelcomeCard />
          </Box>
          <Divider sx={{ borderBottomWidth: 4 }} />
          <MostPopularBooksCard />
          <Divider sx={{ borderBottomWidth: 4 }} />
          <BookOfTheMomentCard />
          <Divider sx={{ borderBottomWidth: 4 }} />
          <AboutCard />
          <Divider sx={{ mt: 4, borderBottomWidth: 4 }} />
        </Stack>
      </Container>
    </Box>
  )
}

export default HomePage
