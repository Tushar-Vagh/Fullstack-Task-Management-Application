import express from "express";
import cors from "cors";
import routes from "./routes.js";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

routes(app);

export default app;
