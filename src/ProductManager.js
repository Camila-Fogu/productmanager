import fs from "fs";

export default class ProductManager {
  constructor(filePath) {
    this.products = [];
    this.nextId = 1;
    this.path = filePath;
  }

  addProduct(product) {
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      console.log("Todos los campos son obligatorios");
      return;
    }

    const existingProduct = this.products.find(
      (existingProduct) => existingProduct.code === product.code
    );
    if (existingProduct) {
      console.log("El codigo del producto ya existe");
      return;
    }

    const newproduct = {
      ...product,
      id: this.nextId,
    };
    this.products.push(newproduct);
    this.nextId++;
    fs.writeFileSync(this.path, JSON.stringify(this.products), "utf8");

    console.log("Producto agregado:", newproduct);
  }

  getProducts() {
    const data = fs.readFileSync(this.path, "utf8");
    this.products = JSON.parse(data);
    return this.products;
  }

  getProductById(id) {
    const data = fs.readFileSync(this.path, "utf8");
    this.products = JSON.parse(data);
    const product = this.products.find(
      (existingProduct) => existingProduct.id === id
    );
    if (product) {
      return product;
    } else {
      console.log("Product not found: ", id);
      return null;
    }
  }

  updateProduct(id, updatedFields) {
    const data = fs.readFileSync(this.path, "utf8");
    this.products = JSON.parse(data);
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );
    if (productIndex !== -1) {
      this.products[productIndex] = {
        ...this.products[productIndex],
        ...updatedFields,
      };
      fs.writeFileSync(this.path, JSON.stringify(this.products), "utf8");
      console.log("Producto actualizado:", this.products[productIndex]);
    } else {
      console.log("Producto no encontrado");
    }
  }

  deleteProduct(id) {
    const data = fs.readFileSync(this.path, "utf8");
    this.products = JSON.parse(data);
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );
    if (productIndex !== -1) {
      const deletedProduct = this.products.splice(productIndex, 1)[0];
      fs.writeFileSync(this.path, JSON.stringify(this.products), "utf8");
      console.log("Producto eliminado:", deletedProduct);
    } else {
      console.log("Producto no encontrado");
    }
  }
}

/*



productManager.addProduct({
  title: "Producto 1",
  description: "Descripcion de producto 1",
  price: 20,
  thumbnail: "img1.jpg",
  code: "P1",
  stock: 8,
});

productManager.addProduct({
  title: "Producto 2",
  description: "Descripcion de producto 2",
  price: 150,
  thumbnail: "img2.jpg",
  code: "P2",
  stock: 10,
});

productManager.addProduct({
  description: "Descripcion de producto 3",
  price: 75,
  thumbnail: "img3.jpg",
  code: "P3",
  stock: 15,
});

console.log("Lista de productos:", productManager.getProduct());

let productById = "";
productById = productManager.getProductById(3);
if (productById) {
  console.log("Producto encontrado", productById);
}

productById = productManager.getProductById(2);
if (productById) {
  console.log("Producto encontrado", productById);
}

productManager.updateProduct(1, {
  title: "Producto 1 Actualizado",
  price: 30,
});

productManager.deleteProduct(2);

console.log("Lista de productos finales:", productManager.getProduct());
*/
