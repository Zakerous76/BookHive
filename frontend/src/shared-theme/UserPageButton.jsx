import { Link } from "react-router-dom"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import IconButton from "@mui/material/IconButton"
import Box from "@mui/material/Box"

const UserPageButton = (props) => {
  return (
    <Box component={Link} to={"/user"}>
      <IconButton
        data-screenshot="toggle-mode"
        disableRipple
        size="small"
        {...props}
      >
        <AccountCircleIcon />
      </IconButton>
    </Box>
  )
}

export default UserPageButton
