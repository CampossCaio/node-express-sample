import { Router, Request, Response } from "express";

const routes = Router();

import ProductsController from "./app/controllers/ProductsController";

routes.get("/v1/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

routes.get("/v1/products", ProductsController.list);
routes.get("/v1/products/:id", ProductsController.show);
routes.post("/v1/products", ProductsController.create);
routes.put("/v1/products/:id", ProductsController.update);
routes.delete("/v1/products/:id", ProductsController.delete);

export default routes;
