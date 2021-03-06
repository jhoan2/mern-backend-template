import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";

//modules for server side rendering
const app = express();

//parse body params and attaches them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
//secure apps by setting various HTTP headers
app.use(helmet());
//enable cross origin resourse sharing
app.use(cors());

//Routes
app.use("/", userRoutes);
app.use("/", authRoutes);

// Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});

export default app;
