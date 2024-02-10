const express = require("express");
const dotenv = require("dotenv");
const app = express();
const { PrismaClient } = require("@prisma/client");

dotenv.config();
const prisma = new PrismaClient();

const PORT = process.env.PORT;

app.use(express.json()); //this use for parse req body data

app.get("/api", (req, res) => {
  res.send("Hello World");
});

app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();

  res.send(products);
});

app.get("/products/:id", async (req, res) => {
  console.log(req);
  const productId = req.params.id;

  const product = await prisma.product.findUnique({
    where: {
      id: +productId,
    }
  });

  if (!product) return res.status(400).send("Product not found");

  res.send(product)

});

app.post("/products", async (req, res) => {
  const newProductData = req.body;

  const products = await prisma.product.create({
    data: {
      name: newProductData.name,
      description: newProductData.description,
      image: newProductData.image,
      price: newProductData.price,
    },
  });

  res.status(201).send({
    data: products,
    message: "create product success",
  });
});

app.delete("/products/:id", async (req, res) => {
  const productId = req.params.id;

  await prisma.product.delete({
    where: {
      id: Number(productId),
      // id: parseInt(productId),
    },
  });

  res.send("Product Deleted")
});

app.put("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  if (!(productData.name && productData.description && productData.image && productData.price)) {
    res.status(400).send("Some field are missing");
    return;
  }

  const product = await prisma.product.update({
    where: {
      id: +productId,
    },
    data: {
      description: productData.description,
      image: productData.image,
      name: productData.name,
      price: productData.price
    }
  })

  res.send({
    data: product,
    message: "Product Updated"
  })
});

app.patch("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  const product = await prisma.product.update({
    where: {
      id: +productId,
    },
    data: {
      description: productData.description,
      image: productData.image,
      name: productData.name,
      price: productData.price
    }
  })

  res.send({
    data: product,
    message: "Product Updated"
  })
});



app.listen(PORT, () => {
  console.log("Express API running in port: " + PORT);
});
