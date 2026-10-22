import { Request, Response, Router } from "express";
import { validatePasswordOptions } from "../models/passwordOptions";
import generatePassword from "../services/generatePassword";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { error, value } = validatePasswordOptions(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // value has only the options that the client sends. The defaults apply to the other options.
  const password = generatePassword(value);

  if (password === "")
    return res
      .status(400)
      .send(
        "At least one option must be true. Options are: lowercase, uppercase, numbers, symbols",
      );

  res.send(password);
});

export default router;
