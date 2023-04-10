// Import modules and interface required by the app
import express, { Express, Request, Response } from "express";
import cors from "cors";
// Import the router module
import router from "./routes";

// Start new instance of express
const app: Express = express();

// Port number declaration
const port: number = 3001;

// Set up middleware to be used by the app
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Tell the app to use the router module for all routes starting with "/"
app.use("/", router);
app.use("*", (req: Request, res: Response) => {
  res.status(404).send("<h2> Sorry, the requested resource was not found.</h2>")
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
