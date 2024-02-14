//Tugas file ini adalah berkomunikasi dengan databse
//Boleh pakai ORM, boleh pakai raw query
//gampang ketika ingin ganti orm
const prisma = require('../db');

const findProducts = async () => {
  const products = await prisma.product.findMany();

  return products;
}

const findProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    }
  })

  // raw query prisma
  // const productt = await prisma.$executeRaw(`SELECT * FROM products where id=${id}`);

  return product;
}

const findProductByName = async (name) => {
  const product = await prisma.product.findFirst({
    where: {
      name
    }
  })

  return product;
}

const insertProduct = async (newProductData) => {
  const product = await prisma.product.create({
    data: {
      name: newProductData.name,
      description: newProductData.description,
      image: newProductData.image,
      price: newProductData.price,
    },
  });

  return product;
}

const deleteProduct = async (id) => {
  await prisma.product.delete({
    where: {
      id: id,
      // id: parseInt(productId),
    },
  });
}

const editProduct = async (id, data) => {
  const product = await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      description: data.description,
      image: data.image,
      name: data.name,
      price: data.price
    }
  })

  return product;
}

module.exports = {
  findProducts,
  findProductById,
  insertProduct,
  findProductByName,
  deleteProduct,
  editProduct,
}