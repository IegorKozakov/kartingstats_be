import mongoose from "mongoose";
import config from "../config";
mongoose.connection.on("connected", () => console.log("MONGO connected"));
mongoose.connection.on("open", () => console.log("MONGO open"));
mongoose.connection.on("disconnected", () => console.log("MONGO disconnected"));
mongoose.connection.on("reconnected", () => console.log("MONGO reconnected"));
mongoose.connection.on("disconnecting", () =>
  console.log("MONGO disconnecting")
);
mongoose.connection.on("close", () => console.log("MONGO close"));

export const DBConnect = async () => {
  try {
    await mongoose.connect(config["db_string"]);
  } catch (error) {
    console.error(error);
  }
};
