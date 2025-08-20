import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import "react-multi-carousel/lib/styles.css"
import Carousel from "react-multi-carousel"
import { isMobile, isTablet, isBrowser } from "react-device-detect"

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 900 },
    items: 4,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 900, min: 600 },
    items: 3,
    slidesToSlide: 4, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
}

import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { setActiveBook } from "../reducers/booksReducer"

const MostPopularBooksCard = () => {
  const dispatch = useDispatch()
  let deviceType = "desktop"
  if (isTablet) deviceType = "tablet"
  else if (isMobile) deviceType = "mobile"

  const mostPopularBooks = useSelector(({ books }) => books.mostPopularBooks)
  const [mostPopularBooks_10, setMostPopularBooks_10] = useState([])

  useEffect(() => {
    if (mostPopularBooks) {
      setMostPopularBooks_10(mostPopularBooks.slice(0, 24))
    }
  }, [mostPopularBooks])

  if (!mostPopularBooks) {
    return (
      <Box
        sx={{
          mt: "10px",
          mb: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h2"
          sx={{ textAlign: "center", fontStyle: "italic" }}
        >
          Unfortunately, the servers are down at the moment...
        </Typography>
      </Box>
    )
  }

  return (
    <div>
      <Box
        sx={{
          mt: "10px",
          mb: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          Most Popular Books of the Month
        </Typography>

        <Box
          component={Link}
          to="/popular-books"
          sx={{
            mt: "1rem",
            fontStyle: "italic",
            color: "inherit",
            textDecoration: "none",
            fontWeight: "normal",
            letterSpacing: "normal",
            transition: "transform 0.5s ease, letter-spacing 0.3s ease",
            display: "inline-block", // needed for transform to work properly
            "&:hover": {
              transform: "scale(1.05)",
              color: "gold",
            },
          }}
        >
          see all...
        </Box>
      </Box>
      <Box></Box>
      <Box sx={{ mt: "50px", mb: "50px" }}>
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlay={deviceType !== "mobile"}
          autoPlaySpeed={5000}
          keyBoardControl={true}
          transitionDuration={750}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          deviceType={deviceType}
          itemClass="carousel-item-padding-40-px"
          focusOnSelect={true}
        >
          {mostPopularBooks_10.map((book) => {
            return (
              <Box
                key={book.bookId}
                sx={{
                  position: "relative",
                  width: "90%",

                  margin: "auto",
                  "&:hover .overlay": {
                    opacity: 1,
                    transform: "translateY(0)",
                  },
                }}
              >
                <Link
                  to={`/book/${book.bookId}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                  }}
                  onClick={() => {
                    dispatch(setActiveBook(book.bookId))
                  }}
                >
                  <Box
                    component="img"
                    src={book.formats["image/jpeg"]}
                    alt={book.title}
                    sx={{
                      width: "100%",
                      height: 350, // 🔥 set consistent height for all items
                      objectFit: "cover", // maintains aspect ratio with padding
                      display: "block",
                    }}
                  />

                  {/* Hover Overlay */}
                  <Box
                    className="overlay"
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: "rgba(0,0,0,0.7)",
                      color: "#fff",
                      padding: "10px",
                      textAlign: "center",
                      opacity: 0,
                      transform: "translateY(20px)",
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    <Box
                      sx={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {book.title}
                    </Box>
                    <Box sx={{ fontSize: "14px" }}>
                      {book.authors && book.authors.length > 0
                        ? book.authors[0].name
                        : "Unknown Author"}
                    </Box>
                    <Box variant="em" fontSize={10}>
                      Total Download: {book.download_count}
                    </Box>
                  </Box>
                </Link>
              </Box>
            )
          })}
        </Carousel>
      </Box>
    </div>
  )
}

export default MostPopularBooksCard
