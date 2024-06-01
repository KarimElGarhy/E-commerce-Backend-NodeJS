import { Router } from "express";
import { signUp,login } from "../controllers/customers.js";

const customersRouter = Router();

customersRouter.post("/signup",signUp)
customersRouter.post("/login",login)

export default customersRouter;