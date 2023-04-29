import { Router, Request, Response } from "express";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  console.log("Cheguei");
  res.json({ message: "Hello World" });
});

export default routes;
