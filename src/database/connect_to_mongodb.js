import mongoose from "mongoose";

export const connectToMongoDb = () => {
  mongoose
    .connect(process.env.MONGO_DB_URL)
    .then((connection) => {
      console.log(
        `Database connected at http://${connection.connection.host}:${connection.connection.port}`
      );
      console.log();
    })
    .catch((error) => {
      console.error(error.message);
    });
};
