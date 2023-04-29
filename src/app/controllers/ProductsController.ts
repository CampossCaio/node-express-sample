import { Request, Response } from "express";

import { produtos } from "../../database/products";

function getTheLastId() {
  return produtos.reduce((prev, current) =>
    prev.id > current.id ? prev : current
  ).id;
}

class ProductsController {
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const product = produtos.find((product) => product.id === Number(id));

    if (!product) {
      response.json({ message: "Product not found" });
    }

    return response.json(product);
  }

  list(request: Request, response: Response) {
    return response.json(produtos);
  }

  async create(request: Request, response: Response) {
    const { descricao, valor, marca } = request.body;

    const product = {
      id: getTheLastId() + 1,
      descricao,
      valor,
      marca,
    };

    produtos.push(product);

    return response.json(product);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { descricao, valor, marca } = request.body;

    let productIndex = produtos.findIndex(
      (product) => product.id === Number(id)
    );

    if (productIndex < 0) {
      return response.json({ message: "Product not found" });
    }

    produtos[productIndex] = {
      ...produtos[productIndex],
      descricao,
      valor,
      marca,
    };

    return response.json(produtos[productIndex]);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const productIndex = produtos.findIndex(
      (product) => product.id === Number(id)
    );

    if (productIndex < 0) {
      return response.json({ message: "Product not found" });
    }

    produtos.splice(productIndex, 1);

    return response.status(200).send();
  }
}
export default new ProductsController();
