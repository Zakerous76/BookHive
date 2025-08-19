import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import GetAppIcon from "@mui/icons-material/GetApp"
import DescriptionIcon from "@mui/icons-material/Description"
import BookIcon from "@mui/icons-material/Book"
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf"
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile"
import ArticleIcon from "@mui/icons-material/Article"
import FolderZipIcon from "@mui/icons-material/FolderZip"

const formatIcons = {
  "text/html": <DescriptionIcon />,
  "application/epub+zip": <BookIcon />,
  "application/x-mobipocket-ebook": <BookIcon />,
  "application/pdf": <PictureAsPdfIcon />,
  "text/plain": <InsertDriveFileIcon />,
  "application/rdf+xml": <ArticleIcon />,
  "application/octet-stream": <FolderZipIcon />,
}

const DownloadLinks = ({ formats }) => {
  if (!formats) return null

  // filter out images
  const downloadFormats = Object.entries(formats).filter(
    ([type]) => !type.startsWith("image/")
  )

  return (
    <Box sx={{ mt: 3, mb: 4, maxWidth: 800 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Download Options
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {downloadFormats.map(([type, url]) => {
          // simplify label
          console.log("type:", type)
          const label = type.includes("epub")
            ? "EPUB"
            : type.includes("mobi")
            ? "MOBI"
            : type.includes("html")
            ? "HTML"
            : type.includes("pdf")
            ? "PDF"
            : type.includes("plain")
            ? "Plain Text"
            : type.includes("rdf")
            ? "RDF+XML"
            : type.includes("octet-stream")
            ? "ZIP"
            : "Other"

          const icon = Object.entries(formatIcons).find(([key]) =>
            type.startsWith(key)
          )?.[1] || <GetAppIcon />

          return (
            <Button
              key={type}
              variant="outlined"
              startIcon={icon}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {label}
            </Button>
          )
        })}
      </Box>
    </Box>
  )
}

export default DownloadLinks
