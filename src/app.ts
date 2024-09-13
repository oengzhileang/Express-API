import express from "express";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "@/src/routes/v1/routes";
import fs from "fs";
import path from "path";
import { getMethod } from "./middlewares/getMethod";
import { requestTime } from "./middlewares/request-time";
import { GlobalErrorHandler } from "./middlewares/global-error";

// Dynamically load swagger.json
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "docs/swagger.json"), "utf8")
);

// ========================
// Initialize App Express
// ========================
const app = express();

// ========================
// Global Middleware
// ========================
app.use(express.json()); // Help to get the json from request body
app.use(getMethod); //console log method when have request
app.use(requestTime); //console log request time when have request

// ========================
// Global API V1
// ========================
RegisterRoutes(app);

// ========================
// API Documentations
// ========================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// ========================
// ERROR Handler
// ========================
app.use(GlobalErrorHandler);

export default app;
