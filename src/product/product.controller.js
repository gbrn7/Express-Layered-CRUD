// Layer untuk handle request dan response
//Biasanaya juga handle vaidasi body

const express = require('express');
const { getALLProduct, getProductById, createProduct, deleteProductById, editProductById } = require('./product.service');
const router = express.Router();


router.get("/", async (req, res) => {
  const products = await getALLProduct();

  res.send(products);
});

router.get("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    const product = await getProductById(productId);

    res.send(product)
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const newProductData = req.body;

    const products = await createProduct(newProductData);

    res.status(201).send({
      data: products,
      message: "create product success",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {

  try {
    const productId = req.params.id;

    await deleteProductById(parseInt(productId));

    res.send("Product Deleted")
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const productId = Number(req.params.id);
  const productData = req.body;

  if (!(productData.name && productData.description && productData.image && productData.price)) {
    res.status(400).send("Some field are missing");
    return;
  }

  try {
    const product = await editProductById(productId, productData);

    res.send({
      data: product,
      message: "Product Updated"
    })
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch("/:id", async (req, res) => {
  const productId = Number(req.params.id);
  const productData = req.body;

  try {
    const product = await editProductById(productId, productData);

    res.send({
      data: product,
      message: "Product Updated"
    })
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;