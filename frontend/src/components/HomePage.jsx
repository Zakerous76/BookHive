import Stack from "@mui/material/Stack"
import NavigationBar from "./NavigationBar"
import Container from "@mui/material/Container"
import Toolbar from "@mui/material/Toolbar"
import WelcomeCard from "./WelcomeCard"
import MostPopularBooksCard from "./MostPopularBooksCard"
import Divider from "@mui/material/Divider"
import Box from "@mui/material/Box"
import BookOfTheMomentCard from "./BookOfTheMomentCard"

const HomePage = () => {
  return (
    <Container>
      <NavigationBar />
      <Toolbar />
      <Stack
        gap={5}
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Box sx={{ mt: "100px", mb: "30px" }}>
          <WelcomeCard />
        </Box>
        <Divider sx={{ borderBottomWidth: 4 }} />
        <MostPopularBooksCard />
        <Divider sx={{ borderBottomWidth: 4 }} />
        <BookOfTheMomentCard />
        <Divider sx={{ borderBottomWidth: 4 }} />
      </Stack>
    </Container>
  )
}

export default HomePage
