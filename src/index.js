import express from "express";
import "dotenv/config";

import { connectToMongoDb } from "./database/connect_to_mongodb.js";
import authRoute from "./routes/auth.routes.js";
import userRoute from "./routes/user.routes.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectToMongoDb();

//Route calls
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);

app.listen(PORT, "0.0.0.0", function () {
  console.log(`App is running on port ${PORT}`);
});
