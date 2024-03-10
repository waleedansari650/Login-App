import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/connection.js";
const app = express();
import router from "./router/route.js";
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
// less hackers knows about out stack
app.disable("x-powered-by");
const port = 8000;
app.get("/", (req, res) => {
  res.status(201).json("Home Get Request");
});
app.use("/api", router);
// start server when we have a valid connection
connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server is running on port http://localhost:${port}`);
      });
    } catch (error) {
      console.log("Cannot connect to the server ");
    }
  })
  .catch((error) => {
    console.log("Invalid database connection..!");
  });
