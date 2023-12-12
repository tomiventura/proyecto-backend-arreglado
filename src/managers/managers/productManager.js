import fs from "fs";
import { v4 as uuidv4 } from 'uuid'

export default class ProductManager {

    constructor(){
        this.path = 'products.json'
        //this.products = [];
    }

   async addProduct(product) {
        let products = await this.getProducts();
        try {
            const id = uuidv4()
          products.push({ id, status: true, ...product });
          await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
          return { success: `The product was successfully added.` };
        } catch (error) {
          return { error: `${error.message}` };
        }
      }

    async getProducts(limit = false) {
        if (fs.existsSync(this.path)) {
          let products = await fs.promises.readFile(this.path, "utf-8");
          return limit === false
            ? JSON.parse(products)
            : JSON.parse(products).splice(0, limit);
        } else {
          return [];
        }
      }
    
    async getProductById(id) {
        let products = await this.getProducts();
        let product = products.find((product) => product.id === parseInt(id));
        try {
          if (!product) throw new Error(`Product not found`);
          return product;
        } catch (error) {
          return { error: `${error.message}` };
        }
      }

    async updateProduct(id, newParams) {
        try {
          if (Object.keys(newParams).includes("id")) delete newParams.id;
          let products = await this.getProducts();
          products = products.map((product) => {
            if (product.id === id) product = { ...product, ...newParams };
            return product;
          });
          await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
          return products.find((product) => product.id === id);
        } catch (error) {
          return { error: error.message };
        }
      }

    async deleteProduct(id) {
        let products = await this.getProducts();
        try {
          let productExist = products.find((product) => product.id === id);
          if (!productExist) throw new Error(`Product doesn't exist.`);
          products.splice(products.indexOf(productExist), 1);
          await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
          return { success: `The product was successfully removed` };
        } catch (error) {
          return { error: `${error.message}` };
        }
      }

}