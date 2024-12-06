import mongoose from "mongoose";

const database = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("database connected!");
  } catch (err) {
    console.log(err);
  }
};

export default database;