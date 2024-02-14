const express = require("express");
const dotenv = require("dotenv");
const app = express();
const { PrismaClient } = require("@prisma/client");

dotenv.config();
const prisma = new PrismaClient();

const PORT = process.env.PORT;

app.use(express.json()); //this use for parse req body data

app.get("/api", (req, res) => {
  res.send("Selamat datang di express js api");
});

const productController = require('./product/product.controller');

app.use('/products', productController);


app.listen(PORT, () => {
  console.log("Express API running in port: " + PORT);
});
