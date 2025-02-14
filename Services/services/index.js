// const express = require("express");
// const multer = require("multer");
// const sql = require("mssql");
// const path = require("path");

// const app = express();

// // Middleware
// app.use(express.json());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.setHeader("Access-Control-Allow-Origin", "*"); // Change '*' to your domain for production
//   next();
// });

// // Database configuration
// const config = {
//   user: "sa",
//   password: "Psalmuel",
//   server: "Adedara",
//   database: "ebook_db",
//   options: {
//     encrypt: false,
//     enableArithAbort: true,
//     trustServerCertificate: true,
//   },
// };

// // Multer configuration for in-memory file handling
// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 50 * 1024 * 1024 },  // Limit the file size to 50MB
// });

// // Function to insert file data into the database
// async function insertFileData(table, data) {
//   try {
//     await sql.connect(config);

//     const query = `
//       INSERT INTO ${table} 
//         (Title, Author, PublishedDate, ISBN, FileName, FileType, FileSize, FileContent, UploadDate)
//       VALUES 
//         (@Title, @Author, @PublishedDate, @ISBN, @FileName, @FileType, @FileSize, @FileContent, GETDATE())
//     `;

//     const request = new sql.Request();
//     request.input("Title", sql.VarChar(255), data.title);
//     request.input("Author", sql.VarChar(255), data.author || null);
//     request.input("PublishedDate", sql.DateTime, data.publishedDate ? new Date(data.publishedDate) : null);
//     request.input("ISBN", sql.VarChar(13), data.isbn || null);
//     request.input("FileName", sql.VarChar(255), data.fileName);
//     request.input("FileType", sql.VarChar(50), data.fileType);
//     request.input("FileSize", sql.BigInt, data.fileSize);
//     request.input("FileContent", sql.VarBinary(sql.MAX), data.fileContent);

//     await request.query(query);
//   } catch (err) {
//     console.error("SQL error:", err.message);
//     throw new Error("Database insertion failed");
//   }
// }

// // Book upload route
// app.post("/api/insertbook", upload.single("file"), async (req, res) => {
//   try {
//     const file = req.file;

//     // Validate file and data
//     if (!file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const data = {
//       title: req.body.title,
//       fileName: file.originalname,
//       fileType: file.mimetype,
//       fileSize: file.size,
//       fileContent: file.buffer,
//     };

//     await insertFileData("Books", data);
//     res.status(200).json({ message: "Book uploaded successfully!" });
//   } catch (error) {
//     console.error("Error:", error.message);
//     res.status(500).json({ message: "Book upload failed", error: error.message });
//   }
// });

// // Video upload route
// app.post("/api/videos", upload.single("file"), async (req, res) => {
//   try {
//     const file = req.file;

//     // Validate file and data
//     if (!file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const data = {
//       title: req.body.title,
//       fileName: file.originalname,
//       fileType: file.mimetype,
//       fileSize: file.size,
//       fileContent: file.buffer,
//       duration: req.body.duration || null, // Assuming duration is optional
//     };

//     await insertFileData("Videos", data);
//     res.status(200).json({ message: "Video uploaded successfully!" });
//   } catch (error) {
//     console.error("Error:", error.message);
//     res.status(500).json({ message: "Video upload failed", error: error.message });
//   }
// });

// // Retrieve all books
// app.get("/api/books", async (req, res) => {
//   try {
//     await sql.connect(config);
//     const query = "SELECT * FROM Books";
//     const result = await new sql.Request().query(query);
//     res.status(200).json(result.recordset);
//   } catch (error) {
//     console.error("Error fetching books:", error.message);
//     res.status(500).json({ message: "Failed to retrieve books", error: error.message });
//   }
// });

// // Retrieve a single book by ID
// app.get("/api/books/:id", async (req, res) => {
//   try {
//     const bookID = req.params.id;
//     await sql.connect(config);
//     const query = "SELECT * FROM Books WHERE BookID = @BookID";
//     const request = new sql.Request();
//     request.input("BookID", sql.Int, bookID);
//     const result = await request.query(query);

//     if (result.recordset.length === 0) {
//       res.status(404).json({ message: "Book not found" });
//     } else {
//       res.status(200).json(result.recordset[0]);
//     }
//   } catch (error) {
//     console.error("Error fetching book:", error.message);
//     res.status(500).json({ message: "Failed to retrieve book", error: error.message });
//   }
// });

// const PORT = process.env.PORT || 3110;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require("express");
const multer = require("multer");
const sql = require("mssql");

// Initialize Express app
const app = express();


// this is what am making use if now, i cant say if its cos am using linux thats why i have all this issues sha. noted!
// Middleware
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Origin", "*"); // Change '*' to your domain for production
  next();
});

// Database configuration
const config = {
  user: "sa",
  password: "Psalmuel",
  server: "192.168.1.196",
  database: "ebook_db",
  port: "1433",
  options: {
    encrypt: false,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};

// Multer configuration for in-memory file handling
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },  // Limit the file size to 50MB
});

// Function to insert file data into the Books table
async function insertBook(data) {
  try {
    await sql.connect(config);

    const query = `
      INSERT INTO Books 
        (Title, Author, PublishedDate, ISBN, FileName, FileType, FileSize, FileContent, UploadDate)
      VALUES 
        (@Title, @Author, @PublishedDate, @ISBN, @FileName, @FileType, @FileSize, @FileContent, GETDATE())
    `;

    const request = new sql.Request();
    request.input("Title", sql.VarChar(255), data.title);
    request.input("Author", sql.VarChar(255), data.author || null);
    request.input("PublishedDate", sql.DateTime, data.publishedDate ? new Date(data.publishedDate) : null);
    request.input("ISBN", sql.VarChar(13), data.isbn || null);
    request.input("FileName", sql.VarChar(255), data.fileName);
    request.input("FileType", sql.VarChar(50), data.fileType);
    request.input("FileSize", sql.BigInt, data.fileSize);
    request.input("FileContent", sql.VarBinary(sql.MAX), data.fileContent);

    await request.query(query);
  } catch (err) {
    console.error("SQL error:", err.message);
    throw new Error(`Database insertion failed: ${err.message}`);
  }
}

// Book upload route
app.post("/api/insertbook", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const data = {
      title: req.body.title,
      author: req.body.author,
      publishedDate: req.body.publishedDate,
      isbn: req.body.isbn,
      fileName: file.originalname,
      fileType: file.mimetype,
      fileSize: file.size,
      fileContent: file.buffer,
    };

    await insertBook(data);
    res.status(200).json({ message: "Book uploaded successfully!" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Book upload failed", error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
