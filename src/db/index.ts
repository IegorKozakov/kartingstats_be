import mongoose from "mongoose";
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
    await mongoose.connect("mongodb://root:password@localhost:27017");
  } catch (error) {
    console.error(error);
  }
};
