import "./ProductManager.js";
import ProductManager from "./ProductManager.js";
import express from "express";
const app = express();
const productManager = new ProductManager("./productos.json");

app.use(express.urlencoded({ extended: true }));

app.get("/products", (req, res) => {
  const products = productManager.getProducts();

  let { limit } = req.query;
  //console.log(limit);

  let productListHTML = "";

  if (!limit) {
    productListHTML = products.map(
      (product) => `
        <h1>${product.title}</h1>
        <p>Descripción ${product.description}</p>
        <p>Precio: ${product.price}</p>
        <p>Stock: ${product.stock}</p>
        <p>Código de producto: ${product.code}</p>
        <p>ID: ${product.id}</p>
      `
    );

    let productsHTML = `<h1>Lista de productos</h1>${productListHTML}`;
    res.send(productsHTML);
  } else {
    //console.log(limit);
    for (let index = 0; index < limit; index++) {
      const product = products[index];

      productListHTML += `
        <h1>${product.title}</h1>
        <p>Descripción ${product.description}</p>
        <p>Precio: ${product.price}</p>
        <p>Stock: ${product.stock}</p>
        <p>Código de producto: ${product.code}</p>
        <p>ID: ${product.id}</p>
      `;
    }

    let productsHTML = `<h1>Lista de productos</h1>${productListHTML}`;
    res.send(productsHTML);
  }
});

app.get("/products/:idProduct", (req, res) => {
  let idProduct = parseInt(req.params.idProduct);
  //console.log(idProduct);

  let productListHTML = "";
  let productsHTML = "";

  let product = productManager.getProductById(idProduct);
  if (product) {
    productListHTML = `
        <h1>${product.title}</h1>
        <p>Descripción ${product.description}</p>
        <p>Precio: ${product.price}</p>
        <p>Stock: ${product.stock}</p>
        <p>Código de producto: ${product.code}</p>
        <p>ID: ${product.id}</p>
      `;
  } else {
    return res.send({ error: "Producto no encontrado" });
  }

  productsHTML = `<h1>Lista de productos</h1>${productListHTML}`;
  res.send(productsHTML);
});

app.listen(8080, () => console.log("Servidor arriba en el puerto 8080"));
