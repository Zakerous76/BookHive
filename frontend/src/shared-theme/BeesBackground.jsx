import React from "react"
import { styled } from "@mui/material/styles"
import Stack from "@mui/material/Stack"

// Styled Container (your existing one)
const Container = styled(Stack)(() => ({
  position: "absolute",
  height: "100vh",
  width: "100vw",
  // border: "2px dashed red", // temporary debug border
  overflow: "hidden", // so bees don't scroll outside
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
  },
}))

// Bee element
const BeePlaceholder = styled("div")(({ theme, delay, size }) => ({
  position: "absolute",
  width: size || "20px",
  height: size || "20px",
  display: "flex",
  opacity: 0,
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Satisfy, cursive",
  fontWeight: 1000,
  fontSize: size || "20px", // scale with placeholder size
  borderRadius: "50%",
  animation: `fly 9s linear infinite`,
  animationDelay: delay || "0s",
  zIndex: 1,
  color:
    theme.palette.mode === "dark"
      ? "gold" // lighter glow on dark
      : "#ffb300ff", // deeper gold on light
  textShadow: `
  0 0 6px ${theme.palette.mode === "dark" ? "#ffd700" : "#d4941d"},
  0 0 12px ${theme.palette.mode === "dark" ? "#ffd700" : "#ffb300"},
  0 0 24px ${theme.palette.mode === "dark" ? "#ffd700" : "#ffcc4d"},
  0 0 48px ${theme.palette.mode === "dark" ? "#ffd700" : "#ffea70"},
  0 0 72px ${theme.palette.mode === "dark" ? "#ffd700" : "#fff176"}
`,
}))

// Keyframes
const styles = `
@keyframes fly {
  0%   { transform: translate(0, 0) scale(0.9) rotate(0deg) ; opacity: 1;  }
  25%  { transform: translate(50vw, -20vh) scale(1.1) rotate(20deg) scale(1.05);opacity: 0.85 }
  50%  { transform: translate(30vw, 30vh)  rotate(-20deg)scale(1.0); opacity: 1}
  75%  { transform: translate(-40vw, -10vh) rotate(10deg); opacity: 0.75}
  100% { transform: translate(0, 0) rotate(0deg) ; opacity: 1}
}
`

const BeesBackground = ({ children, ...props }) => {
  return (
    <Container {...props}>
      <style>{styles}</style>

      {/* Multiple bees with staggered delays */}
      {/* <BeePlaceholder
        delay="10s"
        size="18px"
        style={{ top: "20%", left: "10%" }}
      />
      <BeePlaceholder
        delay="3s"
        size="22px"
        style={{ top: "50%", left: "30%" }}
      />
      <BeePlaceholder
        delay="6s"
        size="20px"
        style={{ top: "70%", left: "80%" }}
      />
      <BeePlaceholder
        delay="9s"
        size="16px"
        style={{ top: "40%", left: "60%" }}
      />
      <BeePlaceholder
        delay="1s"
        size="16px"
        style={{ top: "30%", left: "70%" }}
      />
      <BeePlaceholder
        delay="9s"
        size="20px"
        style={{ top: "22%", left: "99%" }}
      /> */}

      <BeePlaceholder
        delay="0s"
        size="18px"
        style={{ top: "20%", left: "15%" }}
      >
        🐝
      </BeePlaceholder>

      <BeePlaceholder
        delay="3s"
        size="22px"
        style={{ top: "35%", left: "65%" }}
      >
        🐝
      </BeePlaceholder>

      <BeePlaceholder
        delay="6s"
        size="16px"
        style={{ top: "70%", left: "25%" }}
      >
        🐝
      </BeePlaceholder>
      <BeePlaceholder
        delay="7s"
        size="16px"
        style={{ top: "65%", left: "30%" }}
      >
        🐝
      </BeePlaceholder>
      <BeePlaceholder
        delay="9s"
        size="20px"
        style={{ top: "55%", left: "80%" }}
      >
        🐝
      </BeePlaceholder>
      <BeePlaceholder
        delay="2s"
        size="20px"
        style={{ top: "-10%", left: "50%" }}
      >
        🐝
      </BeePlaceholder>
      <BeePlaceholder
        delay="7s"
        size="17px"
        style={{ top: "77%", left: "100%" }}
      >
        🐝
      </BeePlaceholder>
      {children}
    </Container>
  )
}

export default BeesBackground
