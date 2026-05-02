require("dotenv").config();
const express = require("express");
const cors = require("cors");
const testRoutes = require("./routes/testRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Global middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Xavfsizlik va logging (dev uchun)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api/tests", testRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is ready!", mammoth: "✅" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 Global Error:", err.message);
  res
    .status(err.status || 500)
    .json({ success: false, message: err.message || "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(
    `📂 Upload directory: ${process.env.UPLOAD_DIR || "./uploads"}\n`,
  );
});
