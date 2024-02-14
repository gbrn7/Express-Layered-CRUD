// Service layer bertujuan untuk handle business login
// kenapa dipisah? supaya tanggaung jawabnay terisolasi, dan functions-nya
//resusable
const prisma = require('../db');
const { findProducts, findProductById, insertProduct, findProductByName, deleteProduct, editProduct } = require('./product.repository');

const getALLProduct = async () => {
  const products = await findProducts();

  return products;
}

const getProductById = async (id) => {

  const product = await findProductById(id);

  if (!product) throw Error('Product not found');

  return product;

}

const createProduct = async (newProductData) => {

  const findProduct = await findProductByName(newProductData.name);

  if (findProduct) throw Error("Name has to be unique");

  const product = await insertProduct(newProductData);

  return product;
};

const deleteProductById = async (id) => {
  if (typeof id !== "number") {
    throw Error("ID is not a number")
  }
  const product = await getProductById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  await deleteProduct(id);
}

const editProductById = async (id, data) => {
  if (typeof id !== "number") {
    throw Error("ID is not a number")
  }
  const check = await getProductById(id);

  if (!check) {
    throw new Error("Product not found");
  }

  const product = await editProduct(id, data);

  return product;
}

module.exports = {
  getALLProduct,
  getProductById,
  createProduct,
  deleteProductById,
  editProductById,
}