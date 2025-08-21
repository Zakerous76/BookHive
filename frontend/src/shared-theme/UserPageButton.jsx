import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import IconButton from "@mui/material/IconButton"
import Box from "@mui/material/Box"
import Link from "@mui/material/Link"

const UserPageButton = (props) => {
  return (
    <Box component={Link} href={"/user"}>
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
