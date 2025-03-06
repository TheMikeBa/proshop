import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    const createdUsers = await User.insertMany(users); // insertMany is a method that takes an array of objects and inserts them into the database
    const adminUser = createdUsers[0]._id; // get the first user in the array and get its id

    const sampleProducts = products.map((product) => {
      return {
        ...product,
        user: adminUser,
      };
    });

    await Product.insertMany(sampleProducts); // insertMany is a method that takes an array of objects and inserts them into the database
    console.log("Data imported successfully".green.inverse);
    process.exit(); // exit the process
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1); // exit the process with a status code of 1
  }
};

const destroyData = async () => {
  // this function is used to delete all the data in the database
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log("Data destroyed successfully".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

importData();

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
