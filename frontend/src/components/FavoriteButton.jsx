// FavoriteButton.jsx
import { useEffect, useState } from "react"
import IconButton from "@mui/material/IconButton"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import { useDispatch, useSelector } from "react-redux"
import { toggleFavorite } from "../reducers/userReducer"

const FavoriteButton = ({ book }) => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user.user)
  const initialFavorite = user?.favorites?.some((fav) => fav._id === book?._id)

  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    setIsFavorite(initialFavorite)
  }, [initialFavorite])

  const handleClick = (e) => {
    e.preventDefault() // prevent triggering parent Link navigation
    const newValue = !isFavorite
    setIsFavorite(newValue)
    dispatch(toggleFavorite(book, user._id, newValue))
  }
  if (!user) {
    return null
  }
  return (
    <IconButton
      onClick={handleClick}
      sx={{
        m: 1,
        color: isFavorite ? "error.main" : "grey.100",
        "&:hover": { color: "red" },
        zIndex: 2,
      }}
    >
      {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  )
}

export default FavoriteButton
