import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Link from "@mui/material/Link"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

const AboutPage = () => {
  window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <Stack
      spacing={6}
      sx={{
        maxWidth: 800,
        mx: "auto",
        py: 8,
        px: 3,
      }}
    >
      {/* Hero Heading */}
      <Box textAlign="center">
        <Typography variant="h3" component="h1" fontWeight="bold">
          Welcome to BookHive
        </Typography>
        <Typography variant="h6" color="text.secondary" mt={2}>
          Your buzzing home for free literature
        </Typography>
      </Box>

      <Divider />

      {/* Introduction */}
      <Stack spacing={2}>
        <Typography variant="body1">
          BookHive is more than just a digital library — it’s a place where
          readers can{" "}
          <strong>explore, download, and share timeless classics</strong>
          from{" "}
          <Link
            href="https://www.gutenberg.org/"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
          >
            Project Gutenberg
          </Link>{" "}
          via the{" "}
          <Link
            href="https://gutendex.com/"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
          >
            Gutendex API
          </Link>
          . With over <strong>76,000 books</strong> available, you can dive into
          epic adventures, rediscover beloved novels, or stumble upon hidden
          gems — all in a <em>beautiful, minimal, and distraction-free UI</em>.
        </Typography>

        <Typography variant="body1">
          Whether you’re here for Austen’s romances, Melville’s adventures, or
          Shakespeare’s timeless words, BookHive is a buzzing hive of knowledge
          and stories waiting to be discovered.
        </Typography>
      </Stack>

      <Divider />

      {/* Features */}
      <Stack spacing={2}>
        <Typography variant="h5" fontWeight="bold">
          What You Can Do
        </Typography>
        <Typography variant="body1">
          <strong>Download instantly</strong> — all e-books link directly to
          Project Gutenberg.
        </Typography>
        <Typography variant="body1">
          <strong>Create an account</strong> to mark books as favorites and keep
          track of what you love.
        </Typography>
        <Typography variant="body1">
          <strong>Join the conversation</strong> by leaving reviews and sharing
          your thoughts with the community.
        </Typography>
        <Typography variant="body1">
          <strong>Browse popular & trending books</strong> each month, or simply
          follow your curiosity.
        </Typography>
      </Stack>

      <Divider />

      {/* Mission */}
      <Stack spacing={2}>
        <Typography variant="h5" fontWeight="bold">
          Our Mission
        </Typography>
        <Typography variant="body1">
          At BookHive, we believe literature should be{" "}
          <strong>free and accessible to everyone</strong>. Whether you’re
          reading for adventure, knowledge, or inspiration, our goal is to
          create a welcoming space where stories can be discovered and shared.
        </Typography>
      </Stack>

      <Divider />

      {/* Tech & Background */}
      <Stack spacing={2}>
        <Typography variant="h5" fontWeight="bold">
          Behind the Hive
        </Typography>
        <Typography variant="body1">
          BookHive was created by <strong>zakerous76</strong> as a personal
          project after completing the{" "}
          <strong>FullStackOpen course (up to Part 9)</strong>. The goal was to
          put new skills into practice while building something meaningful: a
          platform that makes literature more{" "}
          <em>accessible, inviting, and community-driven</em>.
        </Typography>
        <Typography variant="body1">The site is powered by:</Typography>
        <Typography variant="body2" component="ul" sx={{ pl: 4 }}>
          <li>
            <strong>React & Redux</strong> – for a smooth, modern frontend
          </li>
          <li>
            <strong>Node.js & Express</strong> – backend logic
          </li>
          <li>
            <strong>MongoDB</strong> – user accounts, favorites, and reviews
          </li>
          <li>
            <strong>Gutendex API</strong> – serving Project Gutenberg’s massive
            collection
          </li>
        </Typography>
      </Stack>
    </Stack>
  )
}

export default AboutPage
