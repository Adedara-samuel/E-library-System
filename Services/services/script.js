const express = require("express");
const multer = require("multer");
const sql = require("mssql");
const path = require("path");
const fs = require("fs");
const { google } = require("googleapis");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  // res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// this is the script if we want to later visit the usage of google drive

const config = {
  user: "sa",
  password: "Psalmuel",
  server: "Adedara",
  database: "ebook_db",
  port: 1433,
  options: {
    encrypt: false,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};

// Google Drive Auth Setup
const CREDENTIALS_PATH = path.join(__dirname, "credentials.json");

let oAuth2Client;

async function authorize() {
  const content = fs.readFileSync(CREDENTIALS_PATH);
  const credentials = JSON.parse(content);

  const { client_secret, client_id, redirect_uris } = credentials.installed;
  oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  const TOKEN_PATH = path.join(__dirname, "token.json");
  if (fs.existsSync(TOKEN_PATH)) {
    const token = fs.readFileSync(TOKEN_PATH);
    oAuth2Client.setCredentials(JSON.parse(token));
  } else {
    await getAccessToken(oAuth2Client);
  }
}

async function getAccessToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/drive.file"],
  });
  console.log("Authorize this app by visiting this url:", authUrl);
}

// Google Drive Upload
async function uploadToGoogleDrive(file) {
  const drive = google.drive({ version: "v3", auth: oAuth2Client });

  const fileMetadata = {
    name: file.originalname,
  };

  const media = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.path),
  };

  const response = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: "id, webViewLink, webContentLink",
  });

  return response.data;
}

// Function to insert file data into the database
async function insertFileData(table, data) {
  try {
    await sql.connect(config);

    const query = `
      INSERT INTO ${table} 
        (Title, Author, PublishedDate, ISBN, FileName, FileType, FileSize, FileUrl, UploadDate)
      VALUES 
        (@Title, @Author, @PublishedDate, @ISBN, @FileName, @FileType, @FileSize, @FileUrl, GETDATE())
    `;

    const request = new sql.Request();
    request.input("Title", sql.VarChar(255), data.title);
    request.input("Author", sql.VarChar(255), data.author || null);
    request.input("PublishedDate", sql.DateTime, data.publishedDate ? new Date(data.publishedDate) : null);
    request.input("ISBN", sql.VarChar(13), data.isbn || null);
    request.input("FileName", sql.VarChar(255), data.fileName);
    request.input("FileType", sql.VarChar(50), data.fileType);
    request.input("FileSize", sql.BigInt, data.fileSize);
    request.input("FileUrl", sql.VarChar(255), data.fileUrl);  // Storing Google Drive URL

    await request.query(query);
  } catch (err) {
    console.error("SQL error", err);
    throw new Error("Database insertion failed");
  }
}

// Multer configuration for file handling
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "/tmp"); // Temporarily store the file locally before uploading to Drive
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
  limits: { fileSize: 50 * 1024 * 1024 },  // Limit the file size to 50MB
});

// Book upload route
app.post("/api/insertbook", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    // Upload to Google Drive
    await authorize();
    const driveFile = await uploadToGoogleDrive(file);

    const data = {
      title: req.body.title,
      fileName: driveFile.id,
      fileUrl: driveFile.webViewLink,
      fileType: path.extname(file.originalname).substring(1),
      fileSize: file.size,
    };

    await insertFileData("Books", data);
    res.status(200).json({ message: "Book uploaded successfully!", driveFileUrl: driveFile.webViewLink });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Book upload failed" });
  }
});

// Video upload route
app.post("/api/videos", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    // Upload to Google Drive
    await authorize();
    const driveFile = await uploadToGoogleDrive(file);

    const data = {
      title: req.body.title,
      fileName: driveFile.id,
      fileUrl: driveFile.webViewLink,
      fileType: path.extname(file.originalname).substring(1),
      fileSize: file.size,
      duration: req.body.duration, // Assuming duration is provided
    };

    await insertFileData("Videos", data);
    res.status(200).json({ message: "Video uploaded successfully!", driveFileUrl: driveFile.webViewLink });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Video upload failed" });
  }
});

// Retrieve all books
app.get("/api/books", async (req, res) => {
  try {
    await sql.connect(config);
    const query = "SELECT * FROM Books";
    const result = await new sql.Request().query(query);
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Failed to retrieve books" });
  }
});

// Retrieve a single book by ID
app.get("/api/books/:id", async (req, res) => {
  try {
    const bookID = req.params.id;
    await sql.connect(config);
    const query = "SELECT * FROM Books WHERE BookID = @BookID";
    const request = new sql.Request();
    request.input("BookID", sql.Int, bookID);
    const result = await request.query(query);

    if (result.recordset.length === 0) {
      res.status(404).json({ message: "Book not found" });
    } else {
      res.status(200).json(result.recordset[0]);
    }
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ message: "Failed to retrieve book" });
  }
});

const PORT = process.env.PORT || 3120;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});