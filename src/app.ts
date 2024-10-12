import express from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import { GlobalErrorHandler } from "./middlewares/global-error";
import { getMethod } from "./middlewares/getMethod";
import { requestTime } from "./middlewares/request-time";
import { RegisterRoutes } from "./routes/v1/routes";
import bodyParser from "body-parser";
// Dynamically load swagger.json
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "docs/swagger.json"), "utf8")
);

// ========================
// Initialize App Express
// ========================
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// ========================
// Global Middleware
// ========================
app.use(express.json());
app.use(getMethod);
app.use(requestTime);
// ========================
// Global API V1
// ========================
RegisterRoutes(app);

// ========================
// API Documentations
// ========================
app.use("/user-api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ========================
// ERROR Handler
// ========================
app.use(GlobalErrorHandler);

export default app;
