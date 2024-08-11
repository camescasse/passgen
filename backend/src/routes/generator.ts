import Router, { Request, Response } from 'express';
import { PasswordOptions, validatePasswordOptions } from '../models/passwordOptions';
import generatePassword from '../services/generatePassword';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { error } = validatePasswordOptions(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const options: PasswordOptions = {
    length: req.body.length,
    lowercase: req.body.lowercase,
    uppercase: req.body.uppercase,
    numbers: req.body.numbers,
    symbols: req.body.symbols,
  };

  const password = generatePassword(options);

  if (password === '')
    return res
      .status(400)
      .send('At least one option must be true. Options are: lowercase, uppercase, numbers, symbols');

  res.send(password);
});

export default router;
