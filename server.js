const express = require("express");
const path = require("path");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require(path.join(
  __dirname,
  "/controllers/errorController"
));
const userRoutes = require(path.join(__dirname, "/routes/userRoutes"));
const carRoutes = require(path.join(__dirname, "./routes/carRoutes"));

dotenv.config({ path: "./config.env" });

// Initialize the Express app
const app = express();

// Middleware setup
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

const corsOptions = {
  origin: "https://carmanagementapp.vercel.app/",
  credentials: true,
  optionSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.static(path.join(__dirname, "public")));

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Car Management API",
      version: "1.0.0",
      description: "API Documentation for Car Management Application",
    },
    servers: [
      {
        url: "carmanagement-backend/api/v1",
      },
    ],
  },
  apis: ["./routes/*.js", "./controllers/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/cars", carRoutes);

// Handle undefined routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global Error Handling Middleware
app.use(globalErrorHandler);

// Database Connection
const DB = process.env.DATABASE;
mongoose.connect(DB).then(() => {
  console.log("DB connection successful");
});

// Port Configuration
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening at : http://localhost:${port}`);
});

module.exports = app;
