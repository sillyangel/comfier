import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cardsRoute from "./routes/cardsRoute.js";
import userRoutes from "./routes/usersRoute.js";
import cors from "cors";
import fs from "fs";
import path from "path";

const mongodbUri = process.env.MONGODB_URI;
const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to mongodb
mongoose.connect(mongodbUri);
const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error);
  const logFilePath = path.join(__dirname, 'error.log');
  fs.appendFile(logFilePath, `${new Date().toISOString()} - ${error}\n`, (err) => {
    if (err) console.log("Failed to write to log file:", err);
  });
});
db.once("open", () => console.log("Connected to Mongodb"));

app.get("/", (req, res) => {
  res.json("Welcome to the server >:3");
});

app.use("/uploads", express.static("uploads"));
app.use("/cards", cardsRoute);
app.use("/users", userRoutes);

app.listen(1987, () => {
  console.log("Server is running on port 1987");
});