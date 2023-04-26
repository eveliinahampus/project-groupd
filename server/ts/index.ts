// Import modules and interface required by the app
import express, { Express } from "express";
import cors from "cors";
import router from "./routes";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
// Load environment variables from .env file
dotenv.config();

// Start new instance of express
const app: Express = express();

// // Port number declaration
const port = process.env.PORT || 3001;

// Set up middleware to be used by the app
// app.use(cors());
// app.use(express.json());
// app.use(express.static("public"));
// app.use(express.urlencoded({ extended: true }));
app.use([cors(), express.json(), cookieParser(),express.static("public"), express.urlencoded({ extended: true })]);

// Tell the app to use the router module for all routes starting with "/"
app.use("/", router);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
